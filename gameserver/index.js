const http = require('http');
const httpServer = http.createServer();
// WebSocketのサーバの生成
const websocketServer = require('websocket').server;

httpServer.listen(8080);

const wsServer = new websocketServer({
    "httpServer": httpServer
});

let uuid = require('node-uuid')
let clients = [];
let games = [];

//WebSocketの接続要求を受け取る
wsServer.on('request', function(request) {
    //接続許可
    var connection = request.accept(null, request.origin);

    console.log('connected');

    //connect
    connection.on("open", () => console.log("connected"));
    connection.on("close", () => console.log("closed"));
    connection.on("message", (message) => {

        //メッセージを受け取った。
    
        //メッセージをJSONからオブジェクトに変換
        let result = JSON.parse(message.utf8Data);

        //methotが"SetName"の場合
        if (result.method == "setName") {
            //名前を設定
            const clientId = result.clientId
            const name = result.name
            clients[clientId].name = name

            const payLoad = {
                method: "setName",
                clientId: clientId,
                name: name
            }

            clients[clientId].connection.send(JSON.stringify(payLoad));

        }

        //methotが"getPlayerInfo"の場合
        if (result.method == "getPlayerInfo") {
            
            const clientId = result.clientId

            const payLoad = {
                method: "getPlayerInfo",
                clientId: clientId,
                name: clients[clientId].name
            }

            clients[clientId].connection.send(JSON.stringify(payLoad));

        }

        //methotが"createGame"の場合
        if (result.method == "createGame") {
            const clientId = result.clientId
            const quiz = result.quiz

            const gameId = generateUUID()

            games[gameId] = {
                gameId: gameId,
                players: [],
                setting: {
                    owner: clientId,
                    quiz: quiz
                },
                answer: []
            }

            const payLoad = {
                method: "createGame",
                owner: clientId,
                gameId: gameId
            }

            clients[clientId].connection.send(JSON.stringify(payLoad));

        }

        //methotが"joinGame"の場合
        if (result.method == "joinGame") {
            const clientId = result.clientId
            const gameId = result.gameId

            games[gameId].players.push({
                clientId: clientId,
                score: 0
            })

            const payLoad = {
                method: "joinGame",
                gameId: gameId,
                players: games[gameId].players
            }

            games[gameId].players.forEach((player) => {
                clients[player.clientId].connection.send(JSON.stringify(payLoad));
            })
        }

        //methotが"startGame"の場合
        if (result.method == "startGame") {
            const gameId = result.gameId

            //開始処理
            const payLoad = {
                method: "startGame",
                gameId: gameId,
                players: games[gameId].players
            }

            games[gameId].players.forEach((player) => {
                clients[player.clientId].connection.send(JSON.stringify(payLoad));
            })
            
            games[gameId].round = 1

            console.log(games[gameId])

            console.log(games[gameId].setting.quiz)

            //クイズを取得
            const quiz = getQuiz(gameId, 0)

            const payLoad_quiz = {
                method: "question",
                gameId: gameId,
                question: quiz.question,
                selections: quiz.selections
            }

            games[gameId].players.forEach((player) => {
                clients[player.clientId].connection.send(JSON.stringify(payLoad_quiz));
            })
        }

        //methotが"answer"の場合
        if (result.method == "answer") {
            const clientId = result.clientId
            const gameId = result.gameId
            const answer = result.answer
            const players = games[gameId].players
            const round = games[gameId].round

            games[gameId].answer.push({
                clientId: clientId,
                answer: answer
            })

            //全員分の回答を受け取ったら
            if (games[gameId].answer.length == players.length) {
                const payLoad_answer = {
                    method: "answer",
                    gameId: gameId,
                    answers: games[gameId].answer
                }

                games[gameId].players.forEach((player) => {
                    clients[player.clientId].connection.send(JSON.stringify(payLoad_answer));
                })

                //答え合わせ
                games[gameId].answer.forEach((answer) => {
                    const quiz = getQuiz(gameId, round)
                    if (answer.answer == quiz.answer) {
                        //点数を加算
                        players.forEach((player) => {
                            if (player.clientId == answer.clientId) {
                                player.score += 1
                            }
                        })
                    }
                })

                //プレイヤー情報を更新
                const payLoad_players = {
                    method: "updatePlayers",
                    gameId: gameId,
                    players: games[gameId].players
                }

                games[gameId].players.forEach((player) => {
                    clients[player.clientId].connection.send(JSON.stringify(payLoad_players));
                })
                        
                //全ラウンド終わっていたら
                if (games[gameId].round == games[gameId].setting.quiz.question.length) {
                    const payLoad = {
                        method: "endGame",
                        gameId: gameId,
                        players: games[gameId].players
                    }

                    games[gameId].players.forEach((player) => {
                        clients[player.clientId].connection.send(JSON.stringify(payLoad));
                    })
                }

                games[gameId].answer = []
            }
        }
    });


    const clientId = generateUUID();
    clients[clientId] = {
        "connection": connection,
    }

    const payLoad = {
        "method": "connect",
        "clientId": clientId,
    }

    connection.send(JSON.stringify(payLoad));
});

//getQuiz
function getQuiz(gameId, quizNum) {
    const quiz = games[gameId].setting.quiz

    //quizをパース
    const quiz_json = JSON.parse(quiz)
    const question = quiz_json.question[quizNum].question
    const selections = quiz_json.question[quizNum].selections
    const answer = quiz_json.question[quizNum].answer
    return {
        question: question,
        selections: selections,
        answer: answer
    }
}

//uuidを生成
function generateUUID() {
    return uuid.v4();
}

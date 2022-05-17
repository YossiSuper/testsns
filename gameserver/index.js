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
    });

    const clientsId = generateUUID();
    clients[clientsId] = {
        "connection": connection,
    }

    const payLoad = {
        "method": "connect",
        "clientId": clientsId,
    }

    connection.send(JSON.stringify(payLoad));
});

//uuidを生成
function generateUUID() {
    return uuid.v4();
}

// WebSocketのクライアントの生成
let ws = new WebSocket('wss://192.168.2.100:8080');

//変数
clientId = '';
gameId = '';
playerName = '';
players = [];
 
// 接続時に呼ばれる
ws.addEventListener('open', e => {
    console.log('接続しました。')
})

//エラー時に呼ばれる
ws.addEventListener('error', e => {
    console.log('エラーが発生しました。')
})

// Listen for messages
ws.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);

    // メッセージをJSONからオブジェクトに変換
    let result = JSON.parse(event.data);

    //methotが"connect"の場合
    if (result.method == "connect") {
        //クライアントIDを設定
        clientId = result.clientId
        //clientIdを表示
        const p = document.getElementById('clientId');

        p.innerHTML = "Your clientId:" + clientId
    }

    //methotが"setName"の場合
    if (result.method == "setName") {
        //名前を設定
        playerName = result.name
        //nameを表示
        const p = document.getElementById('name');

        p.innerHTML = "Your name:" + playerName
    }

    //methotが"createGame"の場合
    if (result.method == "createGame") {
        //ゲームを追加
        gameId = result.gameId
        //gamesを表示
        const p = document.getElementById('gameId');

        p.innerHTML = "gameId:" + gameId

        joinGame();
    }

    //methotが"joinGame"の場合
    if (result.method == "joinGame") {
        //ゲームを追加
        gameId = result.gameId
        //gamesを表示
        const p = document.getElementById('gameId');

        p.innerHTML = "gameId:" + gameId

        //プレイヤー取得
        players = result.players;

        //プレイヤーを表示
        const p_p = document.getElementById('players');
        p_p.innerHTML = "players:" + JSON.stringify(players);

    }
});

function onClick_reload() {
    const p_clientId = document.getElementById('clientId');
    p_clientId.innerHTML = "Your clientId:" + clientId

    const p_name = document.getElementById('name');
    p_name.innerHTML = "Your name:" + playerName

    const p_games = document.getElementById('gameId');
    p_games.innerHTML = "gameId:" + gameId

    const p_players = document.getElementById('players');
    p_players.innerHTML = "players:" + JSON.stringify(players);

    switchScreen();
}


switchScreen();

function switchScreen(){
    const query = new URLSearchParams(location.search);
    const isOwner = query.get('isOwner');
    if(isOwner == "true") {
        console.log("owner");
        owner();
    } else {
        console.log("participant");
        participant();
    }
}

//owner用に設計
function owner(){
    //participantOnlyを持っている要素を全部削除
    const participantOnly = document.getElementsByClassName('participantOnly');
    for(let i = 0; i < participantOnly.length; i++) {
        participantOnly[i].remove();
    }
}

//participant用に設計
function participant(){
    //ownerOnlyを持っている要素を全部削除
    const ownerOnly = document.getElementsByClassName('ownerOnly');
    for(let i = 0; i < ownerOnly.length; i++) {
        ownerOnly[i].remove();
    }
}

//ニックネーム登録処理
function setName() {
    //ニックネームを取得
    const nickname = document.getElementById('textbox_nickname').value;
    
    const payLoad = {
        method: "setName",
        clientId: clientId,
        name: nickname
    }

    ws.send(JSON.stringify(payLoad));
}

//ゲーム作成処理(OnClick)
function onClick_createGame() {
    setName();

    const payLoad = {
        method: "createGame",
        clientId: clientId,
        quiz: document.getElementById('quiz_data').value
    }

    ws.send(JSON.stringify(payLoad));

    
}

//ゲーム参加処理
function joinGame() {
    console.log(gameId)
    console.log(clientId)
    const payLoad = {
        method: "joinGame",
        clientId: clientId,
        gameId: gameId
    }

    ws.send(JSON.stringify(payLoad));
}

//ゲーム参加処理(OnClick)
function onClick_joinGame() {
    setName();

    //ゲームIDを取得
    gameId = document.getElementById('textbox_gameId').value;

    joinGame();
}
    
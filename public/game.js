// WebSocketのクライアントの生成
let ws = new WebSocket('ws://192.168.2.100:8080');

//変数
let clientId = '';
let playerName = '';
 
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
});

function onClick_reload() {
    const p_clientId = document.getElementById('clientId');
    p_clientId.innerHTML = "Your clientId:" + clientId

    const p_name = document.getElementById('name');
    p_name.innerHTML = "Your name:" + playerName

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

//ゲーム作成処理
function onClick_createGame() {
    setName();

    const payLoad = {
        method: "createGame",
        clientId: clientId,
        quizData: document.getElementById('quiz_data').value
    }

    //ws.send(JSON.stringify(payLoad));
}
    
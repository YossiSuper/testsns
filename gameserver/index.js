// WebSocketのサーバの生成
let ws = require('ws')
var server = new ws.Server({port:5001});


// 接続時に呼ばれる
server.on('connection', ws => {

    //クライアンの数をカウントする
    console.log(server.clients.size + ' clients connected');

    //全クライアントに送信
    server.clients.forEach(client => {
        //入室メッセージを送信
        client.send('一人入室しました。');
        //何人オンラインかを送信
        client.send(server.clients.size + '人がオンラインです。');
    });

    // クライアントからのデータ受信時に呼ばれる
    ws.on('message', message => {

        //メッセージの内容を表示
        console.log(message.toString());

        //message.tostring()がからの場合は何もしない
        if(message.toString() == ''){
            //コンソールに表示
            console.log('メッセージが空です');
            return;
        }else{
            //メッセージを全クライアントに送信
            server.clients.forEach(client => {
                client.send(message.toString());
        });
    }
    });

    // 切断時に呼ばれる
    ws.on('close', () => {
        console.log('close');

        //クライアントの数をカウントする
        console.log(server.clients.size + ' clients connected');

        //全クライアントに送信
        server.clients.forEach(client => {
            //退室メッセージを送信
            client.send('一人退室しました。');
            //何人オンラインかを送信
            client.send(server.clients.size + '人がオンラインです。');
        });
    });

    // エラー時に呼ばれる
    ws.on('error', err => {
        console.log('error: %s', err);
    });
});
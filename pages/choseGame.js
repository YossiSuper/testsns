import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Layout from '../components/Layout'
import Link from 'next/link'

function Home(){
    return (
        <div className={styles.container}>
            <Head>
                <title>早押しクイズ/ゲームモード選択</title>
                <meta name="description" content="ブラウザから簡単プレイ！" />
                <link rel="icon" href="favicon.ico" />
            </Head>
            <main className={styles.main}>
                <a className={styles.card} href="play?isOwner=true">
                    <h2>ゲームを作成</h2>
                    <p>ホストとしてゲームを作成します。</p>
                </a>       
                <a className={styles.card} href="play">
                    <h2>ゲームに参加 &rarr;</h2>
                    <p>ログイン・登録無しでブラウザから誰でも無料でプレイできます。</p>
                </a>
            </main>    
        </div>        
    )
}

export default Home;

Home.getLayout = function getLayout(page) {
    return (
      <Layout>{page}</Layout>
    )
  }
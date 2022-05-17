import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Theme from '../components/Theme'
import Layout from '../components/Layout'

function Home(){
    return (
        <div className={styles.container}>
            <Head>
                <title>早押しクイズ/ルール</title>
                <meta name="description" content="ブラウザから簡単プレイ！" />
                <link rel="icon" href="favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Theme></Theme>

                <div className="container px-4 py-5" id="featured-3">
                    <h2 className="pb-2 border-bottom">ルール</h2>
                    <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
                        <div className="feature col">
                            <h2>要約</h2>
                            <p>1.ゲームのホストがクイズを作成します。</p>
                            <p>2.ホストがゲームを作成します。</p>
                            <p>3.参加者はホストからもらったリンクまたはPINを用いてゲームに参加します。</p>
                            <p>4.参加者が揃ったらゲームを開始します。</p>
                            <p>5.ホストがゲームを作成します。</p>
                        </div>
                    </div>
                </div>
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
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Theme from '../components/Theme'
import Layout from '../components/Layout'
import Script from 'next/script'

import { useRouter } from 'next/router';

export default function Home() {
    const font_red = {
        color: 'red'
    }

    const router = useRouter();

    return (
        <div className={styles.container}>
            <Head>
                <title>早押しクイズ/PLAY</title>
                <meta name="description" content="ブラウザからか簡単プレイ！" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Script src='/game.js' strategy="lazyOnload"></Script>

            <div>
                <h2 className="pb-2 border-bottom" id="featured-3">プレイ</h2>
                <p style={font_red}>UIはまだ開発途中です。</p>
                <div id='infoBox'>
                    <button className='btn btn-outline-primary' onClick={() => onClick_reload()}>reload</button>
                    <p id='clientId'></p>
                    <p id='name'></p>
                </div>
            </div>

            <div className='Settings'>
                <h2 className="pb-2 border-bottom" id="featured-3">設定</h2>
                <div>
                    <div className="mb-3 participantOnly">
                        <label htmlFor="textbox_nickname" className="form-label">ニックネーム</label>
                        <input type="text" className="form-control" id="textbox_nickname" />
                        <button className='btn btn-outline-primary' onClick={() => onClick_join()}>Join</button>
                    </div>
                    <div className="mb-3 ownerOnly">
                        <label htmlFor="textbox_nickname" className="form-label">ニックネーム</label>
                        <input type="text" className="form-control" id="textbox_nickname" />
                        <label htmlFor="quiz_data" className="form-label" id='textbox_quizData'>クイズデータ(json形式)</label>
                        <textarea className="form-control" id="quiz_data" rows="3"></textarea>
                        <button className='btn btn-outline-primary' onClick={() => onClick_createGame()}>Create</button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

Home.getLayout = function getLayout(page) {
    return (
      <Layout>{page}</Layout>
    )
  }
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Theme from '../components/Theme'
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

            <div>
                <h2 className="pb-2 border-bottom" id="featured-3">プレイ</h2>
                <p style={font_red}>UIはまだ開発途中です。</p>
            </div>

            <div className='Settings'>
                <h2 className="pb-2 border-bottom" id="featured-3">設定</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">ニックネーム</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quiz_data" className="form-label">クイズデータ(json形式)</label>
                        <textarea className="form-control" id="quiz_data" rows="3"></textarea>
                    </div>
                </form>
            </div>
        </div>
    )
}
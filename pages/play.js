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
                <h2 class="pb-2 border-bottom" id="featured-3">プレイ</h2>
                <p style={font_red}>UIはまだ開発途中です。</p>
            </div>

            <div>
                <h2 class="pb-2 border-bottom" id="featured-3">設定</h2>
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}
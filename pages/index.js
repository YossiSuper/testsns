import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Theme from '../components/Theme'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>早押しクイズ</title>
        <meta name="description" content="ブラウザからか簡単プレイ！" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Theme></Theme>

        <div className={styles.grid}>
          <Link href="test"><a className={styles.card}>
            <h2>プレイ &rarr;</h2>
            <p>ログイン・登録無しでブラウザから誰でも無料でプレイできます。</p>
          </a></Link>

          <Link href="about">
            <a className={styles.card}>
              <h2>ルール &rarr;</h2>
              <p>ゲームの遊び方やルールを確認しましょう。</p>
            </a>
          </Link>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>
    </div>
  )
}

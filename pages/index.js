import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Theme from '../components/Theme'
import Layout from '../components/Layout'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>早押しクイズ</title>
        <meta name="description" content="ブラウザからか簡単プレイ！" />
        <link rel="icon" href="favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Theme></Theme>

        <div className={styles.grid}>
          <Link href="play/"><a className={styles.card}>
            <h2>プレイ &rarr;</h2>
            <p>ログイン・登録無しでブラウザから誰でも無料でプレイできます。</p>
          </a></Link>

          <Link href="rule/">
            <a className={styles.card}>
              <h2>ルール &rarr;</h2>
              <p>ゲームの遊び方やルールを確認しましょう。</p>
            </a>
          </Link>

          <a href="https://github.com/YossiSuper/testsns" className={styles.card}>
            <h2>Github &rarr;</h2>
            <p>このプロジェクトはオープンソースで、ソースコードはGithubにて公開されています！</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>QuizEditor &rarr;</h2>
            <p>
              クイズデータのJSONデータを簡単かつ、直感的に作成できます。
            </p>
          </a>
        </div>
      </main>
    </div>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <Layout>{page}</Layout>
  )
}

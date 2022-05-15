import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Theme from '../components/Theme'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The next SNS</title>
        <meta name="description" content="ここにあるのは争いではなく、多様性と調和。" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Theme></Theme>

        <div className={styles.grid}>
          <Link href="test"><a className={styles.card}>
            <h2>始めよう！ &rarr;</h2>
            <p>Discordなどのアカウントを用いですぐに始められます。</p>
          </a></Link>

          <Link href="about">
            <a className={styles.card}>
              <h2>特徴 &rarr;</h2>
              <p>このサービスの何が新しいのかを発見しにいきましょう。</p>
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

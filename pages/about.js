import styles from '../styles/Home.module.css'
import Head from 'next/head'
import Theme from '../components/Theme'


function Home(){
    return (
        <div className={styles.container}>
            <Head>
                <title>The next SNS</title>
                <meta name="description" content="ここにあるのは争いではなく、多様性と調和。" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Theme></Theme>

                <div class="container px-4 py-5" id="featured-3">
                    <h2 class="pb-2 border-bottom">特徴</h2>
                    <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
                        <div class="feature col">
                            <h2>政治なし</h2>
                            <p>政治的な話題の会話は認められていません。</p>
                            <a href="#" class="icon-link">
                            Call to action
                            </a>
                        </div>
                        <div class="feature col">
                            <h2>Featured title</h2>
                            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                            <a href="#" class="icon-link">
                            Call to action
                            </a>
                        </div>
                        <div class="feature col">
                            <h2>Featured title</h2>
                            <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                            <a href="#" class="icon-link">
                            Call to action
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>        
    )
}

export default Home;
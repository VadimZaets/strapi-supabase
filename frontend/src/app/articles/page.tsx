import Image from "next/image";
import styles from "../page.module.css";
import { getArticlePage, getPosts, Post } from "@/lib/api";
import BannerComponent from "../components/Banner";

export default async function ArticlesPage() {
  const [articlePage, posts] = await Promise.all([
    getArticlePage(),
    getPosts(),
  ]);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        <h1>Сторінка статей</h1>

        {/* Рендеримо банери з article-page */}
        {articlePage && articlePage.banner && (
          <BannerComponent banners={articlePage.banner} />
        )}

        {posts.length > 0 ? (
          <div className={styles.postsContainer}>
            <h2>Всі статті</h2>
            {posts.map((post: Post) => (
              <article key={post.id} className={styles.postCard}>
                <h3>{post.Title}</h3>
                <p>{post.Desription}</p>
                <small>
                  Опубліковано:{" "}
                  {new Date(post.publishedAt).toLocaleDateString("uk-UA")}
                </small>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.noPosts}>
            <p>
              Статей поки що немає. Додайте статті в Strapi адміністративній
              панелі.
            </p>
          </div>
        )}

        <div className={styles.ctas}>
          <a
            className={styles.primary}
            href={process.env.NEXT_PUBLIC_STRAPI_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Адмін панель Strapi
          </a>
          <a href="/" className={styles.secondary}>
            ← Назад на головну
          </a>
        </div>
      </main>
    </div>
  );
}

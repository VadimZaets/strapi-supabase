import Image from "next/image";
import styles from "./page.module.css";
import { getPosts, getHomePage, Post } from "@/lib/api";
import BannerComponent from "./components/Banner";

export default async function Home() {
  const [posts, homePage] = await Promise.all([getPosts(), getHomePage()]);

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

        <h1>Пости з Strapi</h1>

        {/* Рендеримо банери з home-page */}
        {homePage && homePage.banner && (
          <BannerComponent banners={homePage.banner} />
        )}

        {posts.length > 0 ? (
          <div className={styles.postsContainer}>
            {posts.map((post: Post) => (
              <article key={post.id} className={styles.postCard}>
                <h2>{post.Title}</h2>
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
              Постів поки що немає. Додайте пости в Strapi адміністративній
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
          <a href="/articles" className={styles.secondary}>
            Переглянути всі статті →
          </a>
        </div>
      </main>
      <footer className={styles.footer}>
        {/* <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Навчання
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Приклади
        </a>
        <a
          href="https://strapi.io/documentation"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Документація Strapi →
        </a> */}
      </footer>
    </div>
  );
}

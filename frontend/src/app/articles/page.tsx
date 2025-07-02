import Image from "next/image";
import styles from "../page.module.css";
import { getArticlePage, getPosts, Post } from "@/lib/api";
import BannerComponent from "../components/Banner";
import EnvCheck from "../components/EnvCheck";

export default async function ArticlesPage() {
  const [articlePage, posts] = await Promise.all([
    getArticlePage(),
    getPosts(),
  ]);

  // Debugging інформація
  console.log("=== ARTICLES PAGE DEBUG ===");
  console.log("STRAPI_URL:", process.env.NEXT_PUBLIC_STRAPI_URL);
  console.log("STRAPI_TOKEN exists:", !!process.env.NEXT_PUBLIC_STRAPI_TOKEN);
  console.log("Article Page Data:", JSON.stringify(articlePage, null, 2));
  console.log("Posts Data:", JSON.stringify(posts, null, 2));
  console.log("=== END DEBUG ===");

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

        {/* Перевірка змінних оточення */}
        <EnvCheck />

        {/* Debugging панель */}
        <div
          style={{
            background: "#f5f5f5",
            padding: "16px",
            borderRadius: "8px",
            marginBottom: "20px",
            fontSize: "12px",
            fontFamily: "monospace",
          }}
        >
          <h3>🔍 Debug Info:</h3>
          <p>
            <strong>Strapi URL:</strong>{" "}
            {process.env.NEXT_PUBLIC_STRAPI_URL || "НЕ ВСТАНОВЛЕНО"}
          </p>
          <p>
            <strong>Token:</strong>{" "}
            {process.env.NEXT_PUBLIC_STRAPI_TOKEN
              ? "ВСТАНОВЛЕНО ✅"
              : "НЕ ВСТАНОВЛЕНО ❌"}
          </p>
          <p>
            <strong>Article Page:</strong>{" "}
            {articlePage ? `✅ ID: ${articlePage.id}` : "❌ НЕ ЗАВАНТАЖЕНО"}
          </p>
          <p>
            <strong>Банери:</strong>{" "}
            {articlePage?.banner?.length
              ? `✅ Кількість: ${articlePage.banner.length}`
              : "❌ ВІДСУТНІ"}
          </p>
          <p>
            <strong>Posts:</strong>{" "}
            {posts?.length ? `✅ Кількість: ${posts.length}` : "❌ ВІДСУТНІ"}
          </p>
        </div>

        {/* Рендеримо банери з article-page */}
        {articlePage && articlePage.banner && articlePage.banner.length > 0 ? (
          <BannerComponent banners={articlePage.banner} />
        ) : (
          <div
            style={{
              background: "#fff3cd",
              padding: "16px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #ffeaa7",
            }}
          >
            <h3>⚠️ Банери не завантажені</h3>
            <p>Можливі причини:</p>
            <ul>
              <li>Article Page не створена в Strapi CMS</li>
              <li>Банери не додані до Article Page</li>
              <li>Проблема з підключенням до API</li>
              <li>Неправильні змінні оточення</li>
            </ul>
            {articlePage ? (
              <p>
                Article Page знайдена, але банерів немає:{" "}
                {JSON.stringify(articlePage, null, 2)}
              </p>
            ) : (
              <p>Article Page не знайдена в CMS</p>
            )}
          </div>
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

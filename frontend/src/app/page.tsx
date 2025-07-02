import Image from "next/image";
import styles from "./page.module.css";
import { getPosts, getHomePage, Post } from "@/lib/api";
import BannerComponent from "./components/Banner";
import EnvCheck from "./components/EnvCheck";

export default async function Home() {
  const [posts, homePage] = await Promise.all([getPosts(), getHomePage()]);

  // Debugging інформація
  console.log("=== HOME PAGE DEBUG ===");
  console.log("STRAPI_URL:", process.env.NEXT_PUBLIC_STRAPI_URL);
  console.log("STRAPI_TOKEN exists:", !!process.env.NEXT_PUBLIC_STRAPI_TOKEN);
  console.log("Home Page Data:", JSON.stringify(homePage, null, 2));
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

        <h1>Пости з Strapi</h1>

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
            <strong>Home Page:</strong>{" "}
            {homePage ? `✅ ID: ${homePage.id}` : "❌ НЕ ЗАВАНТАЖЕНО"}
          </p>
          <p>
            <strong>Банери:</strong>{" "}
            {homePage?.banner?.length
              ? `✅ Кількість: ${homePage.banner.length}`
              : "❌ ВІДСУТНІ"}
          </p>
          <p>
            <strong>Posts:</strong>{" "}
            {posts?.length ? `✅ Кількість: ${posts.length}` : "❌ ВІДСУТНІ"}
          </p>
        </div>

        {/* Рендеримо банери з home-page */}
        {homePage && homePage.banner && homePage.banner.length > 0 ? (
          <BannerComponent banners={homePage.banner} />
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
              <li>Home Page не створена в Strapi CMS</li>
              <li>Банери не додані до Home Page</li>
              <li>Проблема з підключенням до API</li>
              <li>Неправильні змінні оточення</li>
            </ul>
            {homePage ? (
              <p>
                Home Page знайдена, але банерів немає:{" "}
                {JSON.stringify(homePage, null, 2)}
              </p>
            ) : (
              <p>Home Page не знайдена в CMS</p>
            )}
          </div>
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

"use client";

export default function EnvCheck() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;
  const strapiToken = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

  const hasValidUrl = strapiUrl && strapiUrl.length > 0;
  const hasValidToken = strapiToken && strapiToken.length > 0;

  if (hasValidUrl && hasValidToken) {
    return null; // Все гаразд, нічого не показуємо
  }

  return (
    <div
      style={{
        background: "#f8d7da",
        border: "1px solid #f5c6cb",
        borderRadius: "8px",
        padding: "16px",
        margin: "20px 0",
        color: "#721c24",
      }}
    >
      <h3>🚨 Проблема з налаштуваннями</h3>

      {!hasValidUrl && (
        <div style={{ marginBottom: "12px" }}>
          <strong>❌ NEXT_PUBLIC_STRAPI_URL не налаштована</strong>
          <p>Поточне значення: {strapiUrl || "undefined"}</p>
        </div>
      )}

      {!hasValidToken && (
        <div style={{ marginBottom: "12px" }}>
          <strong>❌ NEXT_PUBLIC_STRAPI_TOKEN не налаштована</strong>
          <p>Поточне значення: {strapiToken || "undefined"}</p>
        </div>
      )}

      <div
        style={{
          background: "#d1ecf1",
          border: "1px solid #bee5eb",
          borderRadius: "4px",
          padding: "12px",
          marginTop: "16px",
          color: "#0c5460",
        }}
      >
        <h4>📝 Як виправити:</h4>
        <ol>
          <li>
            Створіть файл <code>.env.local</code> в папці frontend/
          </li>
          <li>Додайте туди:</li>
          <pre
            style={{
              background: "#f8f9fa",
              padding: "8px",
              borderRadius: "4px",
              fontSize: "12px",
              border: "1px solid #dee2e6",
              color: "#333",
            }}
          >
            {`NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_TOKEN=your_api_token_here`}
          </pre>
          <li>
            Перезапустіть сервер розробки: <code>npm run dev</code>
          </li>
          <li>
            Отримайте API токен в Strapi адмін панелі: Settings → API Tokens
          </li>
        </ol>
      </div>
    </div>
  );
}

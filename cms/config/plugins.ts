export default () => ({
  upload: {
    config: {
      provider: "supabase",
      providerOptions: {
        url: process.env.SUPABASE_URL,
        apiKey: process.env.SUPABASE_ANON_KEY,
        bucket: process.env.SUPABASE_BUCKET || "uploads",
        directory: process.env.SUPABASE_DIRECTORY || "strapi-uploads",
      },
      sizeLimit: 10 * 1024 * 1024, // 10MB limit
      formats: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
      },
      responsive: {
        // Автоматичне створення responsive версій
        quality: 80,
        progressive: true,
        withoutEnlargement: true,
        withoutReduction: false,
      },
    },
  },
});

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: require.resolve("../../../src/providers/supabase-storage.js"),
      providerOptions: {
        url: env("SUPABASE_URL"),
        apiKey: env("SUPABASE_ANON_KEY"),
        bucket: env("SUPABASE_BUCKET", "uploads"),
        directory: env("SUPABASE_DIRECTORY", "strapi-uploads"),
      },
      sizeLimit: 10 * 1024 * 1024, // 10MB
      formats: ["jpeg", "jpg", "png", "gif", "svg", "webp"],
      breakpoints: {
        xlarge: 1920,
        large: 1000,
        medium: 750,
        small: 500,
      },
      responsive: {
        quality: 80,
        progressive: true,
        withoutEnlargement: true,
        withoutReduction: false,
      },
    },
  },
});

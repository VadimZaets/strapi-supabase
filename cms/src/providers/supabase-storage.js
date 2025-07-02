const { createClient } = require("@supabase/supabase-js");

module.exports = {
  init(config) {
    // Логування для дебагу в продакшені
    console.log("🔧 Ініціалізація Supabase Storage провайдера");
    console.log("📍 URL:", config.url ? "встановлено" : "НЕ ВСТАНОВЛЕНО");
    console.log(
      "🔑 API Key:",
      config.apiKey ? "встановлено" : "НЕ ВСТАНОВЛЕНО"
    );
    console.log("🪣 Bucket:", config.bucket);
    console.log("📁 Directory:", config.directory);

    if (!config.url || !config.apiKey) {
      throw new Error("❌ SUPABASE_URL або SUPABASE_ANON_KEY не налаштовані!");
    }

    const supabase = createClient(config.url, config.apiKey);

    return {
      async upload(file) {
        const fileName = `${config.directory || "strapi-uploads"}/${file.hash}${file.ext}`;

        console.log(`📤 Завантаження файлу: ${file.name} → ${fileName}`);

        try {
          // Обробка файлових даних
          let fileData;
          if (file.buffer) {
            fileData = file.buffer;
          } else if (file.stream) {
            const chunks = [];
            for await (const chunk of file.stream) {
              chunks.push(chunk);
            }
            fileData = Buffer.concat(chunks);
          } else {
            throw new Error("Немає даних файлу для завантаження");
          }

          console.log(`📊 Розмір файлу: ${fileData.length} байт`);

          // Завантажуємо файл в Supabase Storage
          const { data, error } = await supabase.storage
            .from(config.bucket)
            .upload(fileName, fileData, {
              contentType: file.mime,
              upsert: true,
            });

          if (error) {
            console.error("❌ Помилка Supabase Storage:", error);
            throw new Error(
              `Помилка завантаження в Supabase: ${error.message}`
            );
          }

          // Отримуємо публічний URL
          const { data: publicUrlData } = supabase.storage
            .from(config.bucket)
            .getPublicUrl(fileName);

          // Встановлюємо URL файлу
          file.url = publicUrlData.publicUrl;
          file.provider_metadata = {
            bucket: config.bucket,
            key: fileName,
            public_url: publicUrlData.publicUrl,
          };

          console.log(`✅ Файл успішно завантажено: ${file.url}`);
        } catch (error) {
          console.error(`❌ Помилка завантаження файлу ${file.name}:`, error);
          throw error;
        }
      },

      async uploadStream(file) {
        return this.upload(file);
      },

      async delete(file) {
        const fileName = file.provider_metadata?.key;

        if (!fileName) {
          console.warn(`⚠️ Не знайдено ключ для видалення файлу ${file.name}`);
          return;
        }

        try {
          const { error } = await supabase.storage
            .from(config.bucket)
            .remove([fileName]);

          if (error) {
            throw new Error(`Помилка видалення з Supabase: ${error.message}`);
          }

          console.log(
            `🗑️ Файл ${file.name} успішно видалено з Supabase Storage`
          );
        } catch (error) {
          console.error(`❌ Помилка видалення файлу ${file.name}:`, error);
          throw error;
        }
      },
    };
  },
};

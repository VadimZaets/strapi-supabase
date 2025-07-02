const { createClient } = require("@supabase/supabase-js");

module.exports = {
  init(config) {
    const supabase = createClient(config.url, config.apiKey);

    return {
      async upload(file) {
        const fileName = `${config.directory || "uploads"}/${file.hash}${file.ext}`;

        try {
          // Завантажуємо файл в Supabase Storage
          const { data, error } = await supabase.storage
            .from(config.bucket)
            .upload(fileName, file.buffer || file.stream, {
              contentType: file.mime,
              upsert: true,
            });

          if (error) {
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

          console.log(
            `✅ Файл ${file.name} успішно завантажено в Supabase Storage: ${file.url}`
          );
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

      async checkFileSize(file, { sizeLimit }) {
        if (sizeLimit && file.size > sizeLimit) {
          throw new Error(
            `Файл ${file.name} перевищує максимальний розмір ${sizeLimit} байт`
          );
        }
      },

      async getSignedUrl(file, expiresIn = 3600) {
        const fileName = file.provider_metadata?.key;

        if (!fileName) {
          throw new Error(
            "Не знайдено ключ файлу для створення підписаного URL"
          );
        }

        try {
          const { data, error } = await supabase.storage
            .from(config.bucket)
            .createSignedUrl(fileName, expiresIn);

          if (error) {
            throw new Error(
              `Помилка створення підписаного URL: ${error.message}`
            );
          }

          return data.signedUrl;
        } catch (error) {
          console.error(
            `❌ Помилка створення підписаного URL для ${file.name}:`,
            error
          );
          throw error;
        }
      },
    };
  },
};

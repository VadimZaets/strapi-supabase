import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "plugin::upload.file",
  ({ strapi }) => ({
    // Отримання всіх медіа файлів з URL
    async find(ctx) {
      const { data, meta } = await super.find(ctx);

      // Додаємо додаткову інформацію про URL
      const enhancedData = data.map((file) => ({
        ...file,
        attributes: {
          ...file.attributes,
          fullUrl: file.attributes.url,
          isSupabaseHosted: file.attributes.provider === "supabase",
          metadata: file.attributes.provider_metadata || {},
        },
      }));

      return { data: enhancedData, meta };
    },

    // Отримання конкретного файлу з URL
    async findOne(ctx) {
      const { data } = await super.findOne(ctx);

      if (data) {
        data.attributes = {
          ...data.attributes,
          fullUrl: data.attributes.url,
          isSupabaseHosted: data.attributes.provider === "supabase",
          metadata: data.attributes.provider_metadata || {},
        };
      }

      return { data };
    },

    // Створення підписаного URL для приватних файлів
    async createSignedUrl(ctx) {
      const { id } = ctx.params;
      const { expiresIn = 3600 } = ctx.request.body;

      try {
        const file = await strapi.plugins.upload.services.upload.findOne(id);

        if (!file) {
          return ctx.notFound("Файл не знайдено");
        }

        if (file.provider !== "supabase") {
          return ctx.badRequest(
            "Підписані URL доступні тільки для файлів з Supabase Storage"
          );
        }

        // Отримуємо провайдер
        const provider = strapi.plugins.upload.provider;

        if (typeof provider.getSignedUrl === "function") {
          const signedUrl = await provider.getSignedUrl(file, expiresIn);

          return ctx.send({
            signedUrl,
            expiresAt: new Date(Date.now() + expiresIn * 1000).toISOString(),
            file: {
              id: file.id,
              name: file.name,
              url: file.url,
            },
          });
        } else {
          return ctx.badRequest(
            "Провайдер не підтримує створення підписаних URL"
          );
        }
      } catch (error) {
        console.error("❌ Помилка створення підписаного URL:", error);
        return ctx.internalServerError("Помилка створення підписаного URL");
      }
    },

    // Отримання статистики завантажених файлів
    async getStorageStats(ctx) {
      try {
        const files = await strapi.plugins.upload.services.upload.find({
          pagination: { page: 1, pageSize: -1 },
        });

        const stats = files.results.reduce(
          (acc, file) => {
            const provider = file.provider || "local";
            const size = file.size || 0;
            const format = file.ext?.toLowerCase() || "unknown";

            if (!acc.byProvider[provider]) {
              acc.byProvider[provider] = { count: 0, totalSize: 0 };
            }
            if (!acc.byFormat[format]) {
              acc.byFormat[format] = { count: 0, totalSize: 0 };
            }

            acc.byProvider[provider].count++;
            acc.byProvider[provider].totalSize += size;
            acc.byFormat[format].count++;
            acc.byFormat[format].totalSize += size;
            acc.total.count++;
            acc.total.totalSize += size;

            return acc;
          },
          {
            total: { count: 0, totalSize: 0 },
            byProvider: {},
            byFormat: {},
          }
        );

        return ctx.send(stats);
      } catch (error) {
        console.error("❌ Помилка отримання статистики:", error);
        return ctx.internalServerError("Помилка отримання статистики");
      }
    },
  })
);

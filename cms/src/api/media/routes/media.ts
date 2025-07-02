export default {
  routes: [
    {
      method: "GET",
      path: "/media",
      handler: "media.find",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/media/:id",
      handler: "media.findOne",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "POST",
      path: "/media/:id/signed-url",
      handler: "media.createSignedUrl",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/media/stats/storage",
      handler: "media.getStorageStats",
      config: {
        auth: false,
        policies: [],
        middlewares: [],
      },
    },
  ],
};

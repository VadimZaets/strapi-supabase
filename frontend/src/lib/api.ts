import axios from "axios";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

// Налаштування axios
const apiClient = axios.create({
  baseURL: `${STRAPI_URL}/api`,
  headers: {
    Authorization: `Bearer ${STRAPI_TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Додаємо interceptor для логування запитів
apiClient.interceptors.request.use(
  (config) => {
    console.log(
      `🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${
        config.url
      }`
    );
    console.log("Headers:", config.headers);
    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

// Додаємо interceptor для логування відповідей
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    console.log("Data:", response.data);
    return response;
  },
  (error) => {
    console.error("❌ Response Error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      url: error.config?.url,
      message: error.message,
    });
    return Promise.reject(error);
  }
);

export interface Post {
  id: number;
  documentId: string;
  Title: string;
  Desription: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: number;
  Title: string;
  Desription: string;
  Icon: boolean;
  backgroundImage: {
    id: number;
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface HomePage {
  id: number;
  documentId: string;
  banner: Banner[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ArticlePage {
  id: number;
  documentId: string;
  banner: Banner[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}

export async function getPosts(): Promise<Post[]> {
  try {
    console.log("📝 Fetching posts...");
    const response = await apiClient.get<StrapiResponse<Post[]>>(
      "/posts?populate=*"
    );
    console.log("✅ Posts fetched successfully:", response.data.data.length);
    return response.data.data;
  } catch (error: any) {
    console.error("❌ Error fetching posts:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
      },
    });
    return [];
  }
}

export async function getHomePage(): Promise<HomePage | null> {
  try {
    console.log("🏠 Fetching home page...");
    const response = await apiClient.get<StrapiSingleResponse<HomePage>>(
      "/home-page?populate=banner.backgroundImage"
    );
    console.log("✅ Home page fetched successfully:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.error("❌ Error fetching home page:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
      },
    });
    return null;
  }
}

export async function getArticlePage(): Promise<ArticlePage | null> {
  try {
    console.log("📄 Fetching article page...");
    const response = await apiClient.get<StrapiSingleResponse<ArticlePage>>(
      "/article-page?populate=banner.backgroundImage"
    );
    console.log("✅ Article page fetched successfully:", response.data.data);
    return response.data.data;
  } catch (error: any) {
    console.error("❌ Error fetching article page:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
      },
    });
    return null;
  }
}

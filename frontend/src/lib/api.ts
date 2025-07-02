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
    const response = await apiClient.get<StrapiResponse<Post[]>>(
      "/posts?populate=*"
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function getHomePage(): Promise<HomePage | null> {
  try {
    const response = await apiClient.get<StrapiSingleResponse<HomePage>>(
      "/home-page?populate=banner.backgroundImage"
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching home page:", error);
    return null;
  }
}

export async function getArticlePage(): Promise<ArticlePage | null> {
  try {
    const response = await apiClient.get<StrapiSingleResponse<ArticlePage>>(
      "/article-page?populate=banner.backgroundImage"
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching article page:", error);
    return null;
  }
}

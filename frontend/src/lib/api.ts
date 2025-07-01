const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_TOKEN;

export interface Post {
  id: number;
  documentId: string;
  Title: string;
  Desription: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
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

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/posts?populate=*`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: StrapiResponse<Post[]> = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

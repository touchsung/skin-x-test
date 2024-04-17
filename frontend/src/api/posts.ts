import { Post, queryGetAllPosts } from "../types/posts";
import { getUserToken } from "../utils/helper";
import api from "./base";

export const getAllPosts = async (
  query?: queryGetAllPosts
): Promise<Post[]> => {
  try {
    let url = `${import.meta.env.VITE_API_URL}/posts`;
    if (query) {
      const queryParams = new URLSearchParams(
        query as Record<string, string>
      ).toString();
      url += `?${queryParams.toLowerCase()}`;
    }

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    });
    if (response.status === 200) {
      return response.data as Post[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("[getAllPosts] - An error occurred:", error);
    throw error;
  }
};

export const getPost = async (id: string): Promise<Post | null> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/posts/${id}`;

    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    });
    if (response.status === 200) {
      return response.data as Post;
    } else {
      return null;
    }
  } catch (error) {
    console.error("[getPost] - An error occurred:", error);
    throw error;
  }
};

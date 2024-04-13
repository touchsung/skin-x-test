import axios from "axios";
import { Post, queryGetAllPosts } from "../types/posts";
import { getUserToken } from "../utils/helper";

export const getAllPosts = async (
  query?: queryGetAllPosts
): Promise<Post[]> => {
  try {
    let url = "http://localhost:8080/posts";
    if (query) {
      const queryParams = new URLSearchParams(
        query as Record<string, string>
      ).toString();
      url += `?${queryParams}`;
    }

    const response = await axios.get(url, {
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

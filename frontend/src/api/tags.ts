import { AxiosResponse } from "axios";
import { Tags } from "../types/tags";
import { getUserToken } from "../utils/helper";
import api from "./base";

export const getAllTags = async (): Promise<Tags[]> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/tags`;

    const response: AxiosResponse<Tags[]> = await api.get(url, {
      headers: {
        Authorization: `Bearer ${getUserToken()}`,
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch tags");
    }
  } catch (error) {
    console.error("[getAllTags] - An error occurred:", error);
    throw error;
  }
};

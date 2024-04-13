import axios, { AxiosResponse } from "axios";
import { Tags } from "../types/tags";
import { getUserToken } from "../utils/helper";

export const getAllTags = async (): Promise<Tags[]> => {
  try {
    const url = "http://localhost:8080/tags";

    const response: AxiosResponse<Tags[]> = await axios.get(url, {
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

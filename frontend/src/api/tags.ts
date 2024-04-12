import axios from "axios";
import { Tags } from "../types/tags";

export const getAllTags = async (): Promise<Tags[]> => {
  try {
    const url = "http://localhost:8080/tags";

    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data as Tags[];
    } else {
      return [];
    }
  } catch (error) {
    console.error("[getAllTagss] - An error occurred:", error);
    throw error;
  }
};

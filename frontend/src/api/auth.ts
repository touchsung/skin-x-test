import { AxiosResponse } from "axios";
import { userData, userDataInput } from "../types/auth";
import api from "./base";

export const postRegister = async (
  user: userDataInput
): Promise<AxiosResponse<userData>> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/auth/register`;

    const response: AxiosResponse<userData> = await api.post(url, user);
    return response;
  } catch (error) {
    console.error("[postRegister] - An error occurred:", error);
    throw error;
  }
};

export const postLogIn = async (
  user: userDataInput
): Promise<AxiosResponse<userData>> => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/auth/login`;
    const response: AxiosResponse<userData> = await api.post(url, user);
    return response;
  } catch (error) {
    console.error("[postLogin] - An error occurred:", error);
    throw error;
  }
};

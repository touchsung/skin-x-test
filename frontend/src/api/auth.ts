import axios, { AxiosResponse } from "axios";
import { userData, userDataInput } from "../types/auth";

export const postRegister = async (
  user: userDataInput
): Promise<AxiosResponse<userData>> => {
  try {
    const url = "http://localhost:8080/auth/register";
    const response: AxiosResponse<userData> = await axios.post(url, user);
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
    const url = "http://localhost:8080/auth/login";
    const response: AxiosResponse<userData> = await axios.post(url, user);
    return response;
  } catch (error) {
    console.error("[postLogin] - An error occurred:", error);
    throw error;
  }
};

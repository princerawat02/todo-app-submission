import { api } from "./axiosClient";

export const loginApi = async (data: { email: string; password: string }) => {
  return (await api.post("/auth/login", data)).data;
};

export const signupApi = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  return (await api.post("/auth/signup", data)).data;
};

export const logoutApi = async () => {
  return (await api.post("/auth/logout")).data;
}
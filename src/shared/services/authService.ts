import * as z from "zod";
import type { LoginSchema } from "../schemas/LoginSchema";
import type { RegisterSchema } from "../schemas/RegisterSchema";
import { apiFetch } from "./apiService";
import type { IApiResponse } from "../interfaces/api/IApiResponse";

export const authApi = {
  login: async (body: z.infer<typeof LoginSchema>): Promise<IApiResponse<{ accessToken: string }>> => {
    return apiFetch("/auth/login", false, { method: "POST", body: JSON.stringify(body) });
  },

  register: async (body: z.infer<typeof RegisterSchema>): Promise<IApiResponse<{ accessToken: string }>> => {
    return apiFetch("/auth/register", false, { method: "POST", body: JSON.stringify(body) });
  },

  checkAuth: async (): Promise<IApiResponse<void>> => {
    return apiFetch("/auth/check-auth", false, { method: "GET" });
  },

  refreshToken: async (): Promise<IApiResponse<{ accessToken: string }>> => {
    return apiFetch("/auth/refresh-token", false, { method: "POST" });
  },

  logout: async (): Promise<IApiResponse<void>> => {
    return apiFetch("/auth/logout", false, { method: "POST" });
  },

  forgotPassword: async (body: { email: string }): Promise<IApiResponse<void>> => {
    return apiFetch("/auth/forgot-password", false, { method: "POST", body: JSON.stringify(body) });
  },

  resetPassword: async (body: { token: string; password: string }): Promise<IApiResponse<void>> => {
    return apiFetch("/auth/reset-password", false, { method: "PATCH", body: JSON.stringify(body) });
  },
};

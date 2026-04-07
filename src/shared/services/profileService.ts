import type { IApiResponse } from "../interfaces/api/IApiResponse";
import type { IUser } from "../interfaces/IUser";
import { apiFetch } from "./apiService";

export const profileApi = {
  getProfile: async (): Promise<IApiResponse<IUser>> => {
    return apiFetch("/profile", true, { method: "GET" });
  },
};

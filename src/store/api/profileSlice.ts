import type { IUser } from "@src/shared/interfaces/IUser";
import { apiSlice } from "./apiSlice";
import type { IApiResponse } from "@src/shared/interfaces/api/IApiResponse";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<IApiResponse<IUser>, void>({
      query: (payload) => ({
        url: import.meta.env.VITE_API_PREFIX + "/profile",
        method: "GET",
        body: payload,
      }),
    }),
  }),
});

export const { useGetProfileQuery } = authApi;

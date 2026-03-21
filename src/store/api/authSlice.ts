import { apiSlice } from "./apiSlice";
import router from "@src/router";
import * as z from "zod";
import type { LoginSchema } from "@src/shared/schemas/LoginSchema";
import type { RegisterSchema } from "@src/shared/schemas/RegisterSchema";
import type { IApiResponse } from "@src/shared/interfaces/api/IApiResponse";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ accessToken: string }, z.infer<typeof LoginSchema>>({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        localStorage.setItem("accessToken", data.accessToken);
        router.navigate("/dashboard");
      },
    }),

    register: builder.mutation<{ accessToken: string }, z.infer<typeof RegisterSchema>>({
      query: (payload) => ({
        url: "/auth/register",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;
        localStorage.setItem("accessToken", data.accessToken);
        router.navigate("/dashboard");
      },
    }),

    checkAuth: builder.mutation<IApiResponse<void>, void>({
      query: (payload) => ({
        url: "/auth/check-auth",
        method: "GET",
        body: payload,
      }),
    }),

    refreshToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.accessToken);
        } catch {
          localStorage.removeItem("accessToken");
        }
      },
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
        localStorage.removeItem("accessToken");
        router.navigate("/auth/login");
      },
    }),

    forgotPassword: builder.mutation<IApiResponse<void>, { email: string }>({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    resetPassword: builder.mutation<IApiResponse<void>, { token: string; password: string }>({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useCheckAuthMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;

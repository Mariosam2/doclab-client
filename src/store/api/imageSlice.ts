import { apiSlice } from "./apiSlice";
import type { IApiResponse } from "@src/shared/interfaces/api/IApiResponse";

export const imageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation<IApiResponse<{ url: string }>, FormData>({
      query: (body) => ({
        url: import.meta.env.VITE_API_PREFIX + "/image/upload/document-image",
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = imageApi;

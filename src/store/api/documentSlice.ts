import type { IDocument } from "@src/shared/interfaces/document/IDocument";
import { apiSlice } from "./apiSlice";
import type { IApiResponse } from "@src/shared/interfaces/api/IApiResponse";
import * as z from "zod";
import type { AddDocumentSchema } from "@src/shared/schemas/AddDocumentSchema";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query<IApiResponse<IDocument[]>, void>({
      query: (payload) => ({
        url: import.meta.env.VITE_API_PREFIX + "/documents",
        method: "GET",
        body: payload,
      }),
      providesTags: ["Documents"],
    }),
    createDocument: builder.mutation<IApiResponse<void>, z.infer<typeof AddDocumentSchema>>({
      query: (payload) => ({
        url: import.meta.env.VITE_API_PREFIX + "/documents/add-document",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Documents"],
    }),
  }),
});

export const { useGetDocumentsQuery, useCreateDocumentMutation } = authApi;

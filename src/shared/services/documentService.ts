import * as z from "zod";
import type { IApiResponse } from "../interfaces/api/IApiResponse";
import type { IDocument } from "../interfaces/document/IDocument";
import { apiFetch } from "./apiService";
import type { AddDocumentSchema } from "../schemas/AddDocumentSchema";

export const documentApi = {
  getDocuments: async (): Promise<IApiResponse<IDocument[]>> => {
    return apiFetch(`/documents`, true, { method: "GET" });
  },

  getDocument: async (documentId: string): Promise<IApiResponse<IDocument[]>> => {
    return apiFetch(`/documents/${documentId}`, true, { method: "GET" });
  },

  createDocument: async (body: z.infer<typeof AddDocumentSchema>): Promise<IApiResponse<void>> => {
    return apiFetch("/documents/add-document", true, { method: "POST", body: JSON.stringify(body) });
  },
};

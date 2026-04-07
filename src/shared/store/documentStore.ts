import { create } from "zustand";
import type { IDocument } from "../interfaces/document/IDocument";
import { getErrorMessage, showToast } from "../helpers";
import { ToastType } from "../enums/ToastType.enum";
import { documentApi } from "@shared/services/documentService";
import * as z from "zod";
import type { AddDocumentSchema } from "../schemas/AddDocumentSchema";

interface DocumentStore {
  documents: IDocument[];
  loading: boolean;
  error: string | null;
  idOut: string | string[] | null;
  getDocuments: () => Promise<void>;
  getDocument: (documentId: string) => Promise<void>;
  createDocument: (payload: z.infer<typeof AddDocumentSchema>) => Promise<void>;
}

export const useDocumentStore = create<DocumentStore>((set) => ({
  documents: [],
  loading: false,
  error: null,
  idOut: null,
  getDocuments: async () => {
    set({ loading: true });
    try {
      const { data } = await documentApi.getDocuments();
      set({ documents: data, loading: false });
    } catch (err) {
      showToast("Something went wrong", getErrorMessage(err), ToastType.DANGER);
      set({ error: getErrorMessage(err), loading: false });
    }
  },
  getDocument: async (documentId: string) => {
    set({ loading: true });
    try {
      const { data } = await documentApi.getDocument(documentId);
      set({ documents: data, loading: false });
    } catch (err) {
      showToast("Something went wrong", getErrorMessage(err), ToastType.DANGER);
      set({ error: getErrorMessage(err), loading: false });
    }
  },

  createDocument: async (payload: z.infer<typeof AddDocumentSchema>) => {
    set({ loading: true });
    try {
      const { idOut } = await documentApi.createDocument(payload);
      set({ loading: false, idOut });
    } catch (err) {
      showToast("Something went wrong", getErrorMessage(err), ToastType.DANGER);
      set({ error: getErrorMessage(err), loading: false });
    }
  },
}));

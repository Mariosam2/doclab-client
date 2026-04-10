import { useMutation, useQuery } from '@tanstack/react-query';
import * as z from 'zod';
import type { AddDocumentSchema } from '../schemas/AddDocumentSchema';
import { apiFetch } from '../services/apiService';
import { queryClient } from '@src/lib/queryClient';
import type { IApiResponse } from '../interfaces/api/IApiResponse';
import type { IDocument } from '../interfaces/document/IDocument';

// hooks/useDocuments.ts
export const useDocuments = () =>
  useQuery({
    queryKey: ['documents'],
    queryFn: (): Promise<IApiResponse<{ userDocuments: IDocument[]; editorDocuments: IDocument[] }>> =>
      apiFetch('/documents', true),
  });

export const useDocument = (documentId: string) =>
  useQuery({
    queryKey: ['document'],
    queryFn: (): Promise<IApiResponse<IDocument>> => apiFetch(`/documents/${documentId}`, true),
  });

export const useSaveInviteLink = () =>
  useMutation({
    mutationFn: (paylaod: {
      uuid: string;
      documentId: string;
      permission: string;
    }): Promise<IApiResponse<{ inviteLink: string }>> =>
      apiFetch('/documents/invite-link/', true, { method: 'POST', body: JSON.stringify(paylaod) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

export const useCreateDocumentPermission = () =>
  useMutation({
    mutationFn: (paylaod: {
      uuid: string;
      documentId: string;
      permission: string;
    }): Promise<IApiResponse<{ inviteLink: string }>> =>
      apiFetch('/documents/create-permission/', true, { method: 'POST', body: JSON.stringify(paylaod) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

export const useCreateDocument = () =>
  useMutation({
    mutationFn: (body: z.infer<typeof AddDocumentSchema>): Promise<IApiResponse<void>> =>
      apiFetch('/documents/add-document', true, { method: 'POST', body: JSON.stringify(body) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

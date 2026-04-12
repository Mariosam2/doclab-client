import { useMutation, useQuery } from '@tanstack/react-query';
import * as z from 'zod';
import type { AddDocumentSchema } from '../schemas/AddDocumentSchema';
import { apiFetch } from '../services/apiService';
import { queryClient } from '@src/lib/queryClient';
import type { IApiResponse } from '../interfaces/api/IApiResponse';
import type { IDocument } from '../interfaces/document/IDocument';
import type { ISaveInviteLink } from '../interfaces/document/ISaveInviteLink';
import type { IDocumentsResponse } from '../interfaces/document/IDocumentsResponse';
import type { IPermission } from '../interfaces/document/IPermission';

// hooks/useDocuments.ts
export const useGetDocuments = () =>
  useQuery({
    queryKey: ['documents'],
    queryFn: (): Promise<IApiResponse<IDocumentsResponse>> => apiFetch('/documents', true),
  });

export const useGetDocument = (documentId: string) =>
  useQuery({
    queryKey: ['document'],
    queryFn: (): Promise<IApiResponse<IDocument>> => apiFetch(`/documents/${documentId}`, true),
  });

export const useSaveInviteLink = () =>
  useMutation({
    mutationFn: (paylaod: ISaveInviteLink): Promise<IApiResponse<{ inviteLink: string }>> =>
      apiFetch(`/documents/invite-link/${paylaod.documentId}`, true, { method: 'POST', body: JSON.stringify(paylaod) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

export const useGetDocumentsPermissions = () =>
  useQuery({
    queryKey: ['documents-permissions'],
    queryFn: (): Promise<IApiResponse<IPermission[]>> => apiFetch('/documents/permissions', true),
  });

export const useUpsertPermission = () =>
  useMutation({
    mutationFn: (paylaod: { linkId: string }): Promise<IApiResponse<{ inviteLink: string }>> =>
      apiFetch('/documents/upsert-permission/', true, { method: 'POST', body: JSON.stringify(paylaod) }),
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

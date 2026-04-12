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
    enabled: !!documentId,
  });

export const useSaveInviteLink = () =>
  useMutation({
    mutationFn: (body: ISaveInviteLink): Promise<IApiResponse<{ inviteLink: string }>> =>
      apiFetch('/documents/invite-link/', true, { method: 'POST', body: JSON.stringify(body) }),
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
    mutationFn: (body: { linkId: string }): Promise<IApiResponse<{ inviteLink: string }>> =>
      apiFetch('/documents/upsert-permission/', true, { method: 'POST', body: JSON.stringify(body) }),
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

export const useUpdateDocument = () =>
  useMutation({
    mutationFn: (body: { documentId: string; title: string }): Promise<IApiResponse<void>> =>
      apiFetch(`/documents/edit-document/${body.documentId}`, true, {
        method: 'PUT',
        body: JSON.stringify({ title: body.title }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

export const useDeleteDocument = () =>
  useMutation({
    mutationFn: (documentId: string): Promise<IApiResponse<void>> =>
      apiFetch(`/documents/delete-document/${documentId}`, true, { method: 'DELETE' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });

export const useGenerateSummary = () =>
  useMutation({
    mutationFn: (body: { documentId: string }): Promise<IApiResponse<string>> =>
      apiFetch('/documents/generate-summary', true, { method: 'POST', body: JSON.stringify(body) }),
  });

export const useExportPdf = () =>
  useMutation({
    mutationFn: async (body: { htmlContent: string; filename: string }) => {
      const blob = (await apiFetch(
        '/documents/export-pdf',
        true,
        {
          method: 'POST',
          body: JSON.stringify(body),
        },
        'blob',
      )) as Blob;

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${body.filename}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    },
  });

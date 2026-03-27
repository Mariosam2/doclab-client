import { apiSlice } from './apiSlice';
import type { IApiResponse } from '@src/shared/interfaces/api/IApiResponse';
import * as z from 'zod';
import type { AddDocumentSchema } from '@src/shared/schemas/AddDocumentSchema';
import type { IDocumentsResponse } from '@src/shared/interfaces/api/IDocumentsResponse';
import type { GenerateInviteSchema } from '@src/shared/schemas/GenerateInviteLinkSchema';

export const documentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query<IApiResponse<IDocumentsResponse>, void>({
      query: (payload) => ({
        url: import.meta.env.VITE_API_PREFIX + '/documents',
        method: 'GET',
        body: payload,
      }),
      providesTags: ['Documents'],
    }),

    generateInviteLink: builder.mutation<IApiResponse<{ inviteLink: string }>, z.infer<typeof GenerateInviteSchema>>({
      query: ({ documentId, ...body }) => ({
        url: import.meta.env.VITE_API_PREFIX + `/documents/invite-link/${documentId}`,
        method: 'POST',
        body,
      }),
    }),

    acceptInvite: builder.mutation<IApiResponse<void>, { inviteToken: string }>({
      query: ({ inviteToken }) => ({
        url: import.meta.env.VITE_API_PREFIX + `/documents/accept-invite/${inviteToken}`,
        method: 'POST',
      }),
    }),

    createDocument: builder.mutation<IApiResponse<void>, z.infer<typeof AddDocumentSchema>>({
      query: (payload) => ({
        url: import.meta.env.VITE_API_PREFIX + '/documents/add-document',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Documents'],
    }),
  }),
});

export const { useGetDocumentsQuery, useCreateDocumentMutation, useGenerateInviteLinkMutation, useAcceptInviteMutation } = documentApi;

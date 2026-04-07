import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../services/apiService';
import { queryClient } from '@src/lib/queryClient';
import type { IApiResponse } from '../interfaces/api/IApiResponse';

export const useUploadImage = () =>
  useMutation({
    mutationFn: (body: FormData): Promise<IApiResponse<{ url: string }>> =>
      apiFetch('/image/upload/document-image', true, { method: 'POST', body }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
  });

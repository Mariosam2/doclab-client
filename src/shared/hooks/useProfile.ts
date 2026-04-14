import { useMutation, useQuery } from '@tanstack/react-query';
import { apiFetch } from '../services/apiService';
import type { IApiResponse } from '../interfaces/api/IApiResponse';
import type { IUser } from '../interfaces/user/IUser';

export type UpdateProfileBody = Partial<
  Pick<IUser, 'firstname' | 'lastname' | 'username' | 'email' | 'avatarUrl'>
> & { documentId?: string };

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: () => apiFetch('/profile', true),
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: (body: UpdateProfileBody): Promise<IApiResponse<string>> =>
      apiFetch('/profile/edit-profile', true, { method: 'PUT', body: JSON.stringify(body) }),
  });

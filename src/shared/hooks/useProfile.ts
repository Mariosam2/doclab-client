import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../services/apiService';

export const useProfile = () =>
  useQuery({
    queryKey: ['profile'],
    queryFn: () => apiFetch('/profile', true),
  });

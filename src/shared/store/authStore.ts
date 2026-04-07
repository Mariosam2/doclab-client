import { authApi } from '@shared/services/authService';
import { create } from 'zustand';
import * as z from 'zod';
import type { LoginSchema } from '../schemas/LoginSchema';
import { getErrorMessage, showToast } from '../helpers';
import { ToastType } from '../enums/ToastType.enum';
import type { RegisterSchema } from '../schemas/RegisterSchema';

interface AuthStore {
  accessToken: string | null;
  loggedIn: boolean;
  loading: boolean;
  error: string | null;
  login: (credentials: z.infer<typeof LoginSchema>) => Promise<void>;
  signup: (payload: z.infer<typeof RegisterSchema>) => Promise<void>;
  refreshToken: () => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  forgotPassword: (body: { email: string }) => Promise<void>;
  resetPassword: (body: { token: string; password: string }) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  loggedIn: false,
  loading: false,
  error: null,

  login: async (credentials: z.infer<typeof LoginSchema>) => {
    set({ loading: true });
    try {
      const { data } = await authApi.login(credentials);
      set({ accessToken: data.accessToken, loggedIn: true, loading: false });
    } catch (err) {
      showToast('Something went wrong', getErrorMessage(err), ToastType.DANGER);
      set({ error: getErrorMessage(err), loading: false });
    }
  },

  signup: async (payload: z.infer<typeof RegisterSchema>) => {
    set({ loading: true });
    try {
      const { data } = await authApi.register(payload);
      set({ accessToken: data.accessToken, loggedIn: true, loading: false });
    } catch (err) {
      showToast('Something went wrong', getErrorMessage(err), ToastType.DANGER);
      set({ error: getErrorMessage(err), loading: false });
    }
  },
  refreshToken: async () => {
    set({ loading: true });
    try {
      const { data } = await authApi.refreshToken();
      set({ accessToken: data.accessToken, loggedIn: true, loading: false });
    } catch (err) {
      showToast('Something went wrong', getErrorMessage(err), ToastType.DANGER);
      set({ error: getErrorMessage(err), loading: false });
    }
  },

  checkAuth: async () => {
    set({ loading: true });
    try {
      const { success } = await authApi.checkAuth();
      set({ loggedIn: success, loading: false });
    } catch (err) {
      showToast('Something went wrong', getErrorMessage(err), ToastType.DANGER);
      set({ error: getErrorMessage(err), loading: false });
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await authApi.logout();
      set({ accessToken: null, loggedIn: false, loading: false });
    } catch (err) {
      showToast('Something went wrong', getErrorMessage(err), ToastType.DANGER);
      set({ error: getErrorMessage(err), loading: false });
    }
  },

  forgotPassword: async (payload: { email: string }) => {
    set({ loading: true });
    try {
      await authApi.forgotPassword(payload);
    } catch (err) {
      showToast('Something went wrong', getErrorMessage(err), ToastType.DANGER);
      set({ error: getErrorMessage(err), loading: false });
    }
  },
  resetPassword: async (payload: { token: string; password: string }) => {
    set({ loading: true });
    try {
      await authApi.resetPassword(payload);
    } catch (err) {
      showToast('Something went wrong', getErrorMessage(err), ToastType.DANGER);
      set({ error: getErrorMessage(err), loading: false });
    }
  },
}));

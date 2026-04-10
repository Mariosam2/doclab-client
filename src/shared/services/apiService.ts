import { useAuthStore } from '../store/authStore';

let refreshPromise: Promise<void> | null = null;
export const apiFetch = async (path: string, withPrefix: boolean = true, options?: RequestInit) => {
  const getToken = () => useAuthStore.getState().accessToken;

  const doFetch = (token: string | null) =>
    fetch(`${import.meta.env.VITE_API_BASE_URL + (withPrefix ? import.meta.env.VITE_API_PREFIX : '')}${path}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',

        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    });

  let res = await doFetch(getToken());

  if (res.status === 401 && !res.url.includes('/auth/refresh-token')) {
    if (!refreshPromise) {
      refreshPromise = useAuthStore
        .getState()
        .refreshToken()
        .finally(() => {
          refreshPromise = null;
        });
    }
    try {
      await refreshPromise;
    } catch (err) {
      console.log(err);
      throw new Error('Session Exprired');
    }

    res = await doFetch(getToken());
  }
  if (!res.ok) throw new Error(`Errore ${res.status}: ${res.statusText}`);
  return res.json();
};

import { create } from "zustand";
import type { IUser } from "../interfaces/IUser";
import { profileApi } from "../services/profileService";
import { getErrorMessage } from "../helpers";

interface IProfileStore {
  profile: IUser | null;
  loading: boolean;
  error: string | null;
  getProfile: () => Promise<void>;
}

export const useProfileStore = create<IProfileStore>((set) => ({
  profile: null,
  loading: false,
  error: null,
  getProfile: async () => {
    set({ loading: true });
    try {
      const { data } = await profileApi.getProfile();
      set({ profile: data, loading: false });
    } catch (err) {
      set({ error: getErrorMessage(err), loading: false });
    }
  },
}));

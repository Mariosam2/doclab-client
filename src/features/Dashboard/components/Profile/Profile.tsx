import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { useProfile, useUpdateProfile } from '@src/shared/hooks/useProfile';
import { useUploadImage } from '@src/shared/hooks/useImage';
import { ProfileSchema, type ProfileFormPayload } from '@src/shared/schemas/ProfileSchema';
import { queryClient } from '@src/lib/queryClient';
import { getErrorMessage, showToast } from '@src/shared/helpers';
import { ToastType } from '@src/shared/enums/ToastType.enum';

const Profile = () => {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();
  const { mutateAsync: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormPayload>({
    defaultValues: { firstname: '', lastname: '', username: '', email: '' },
    resolver: zodResolver(ProfileSchema),
  });

  useEffect(() => {
    if (profile?.data) {
      reset({
        firstname: profile.data.firstname ?? '',
        lastname: profile.data.lastname ?? '',
        username: profile.data.username ?? '',
        email: profile.data.email ?? '',
      });
    }
  }, [profile, reset]);
  const preview = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const fullName =
    profile?.data?.firstname && profile?.data?.lastname ? `${profile.data.firstname}+${profile.data.lastname}` : 'A';
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${fullName}&background=1a0a2e&color=ccccff`;
  const currentAvatar = preview ?? profile?.data?.avatarUrl ?? fallbackAvatar;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    if (!selected.type.startsWith('image/')) {
      showToast('Invalid file', 'Please select an image file', ToastType.WARNING);
      return;
    }
    setFile(selected);
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      await updateProfile(values);

      if (file) {
        const fd = new FormData();
        fd.append('image', file);
        fd.append('userId', profile?.data?.userId ?? '');
        const res = await uploadImage(fd);
        const avatarUrl = res.data.url;
        await updateProfile({ avatarUrl });
        setFile(null);
      }

      await queryClient.invalidateQueries({ queryKey: ['profile'] });
      showToast('Profile updated', 'Your profile has been saved', ToastType.SUCCESS);
    } catch (err) {
      showToast('Error', getErrorMessage(err), ToastType.DANGER);
    }
  });

  const isBusy = isUpdating || isUploading || isSubmitting;

  return (
    <section className="profile relative flex flex-col flex-1 overflow-auto">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(60rem 40rem at 85% -10%, rgba(153, 102, 255, 0.12), transparent 60%), radial-gradient(50rem 35rem at -10% 110%, rgba(204, 204, 255, 0.18), transparent 55%)',
        }}
      />

      <div className="relative flex flex-col flex-1 px-12 py-10">
        <header className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-c-periwinkle/30 text-c-electric-violet text-xs font-semibold uppercase tracking-wider mb-3">
            Account
          </div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">
            Edit your profile
            <br />
            <span className="font-lora italic font-normal text-c-medium-purple">make it yours.</span>
          </h1>
          <p className="text-gray-500 mt-3 text-[15px]">
            Update your personal details and avatar. Changes are saved once you click Save.
          </p>
        </header>

        <form
          onSubmit={onSubmit}
          className="w-full max-w-2xl bg-white/70 backdrop-blur rounded-2xl border border-gray-200/80 shadow-sm p-8"
        >
          {/* Avatar */}
          <div className="flex items-center gap-5 mb-8">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="group relative size-24 rounded-full overflow-hidden border border-c-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-c-electric-violet cursor-pointer"
              aria-label="Change avatar"
            >
              {isLoading ? (
                <div className="size-full bg-gray-100 animate-pulse" />
              ) : (
                <img src={currentAvatar} alt="Your avatar" className="size-full object-cover" />
              )}
              <span className="absolute inset-0 bg-black/50 text-white text-xs font-medium flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                Change photo
              </span>
            </button>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-gray-800">Profile photo</p>
              <p className="text-xs text-gray-500">PNG, JPG or WEBP.</p>
              {file && (
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-xs text-c-electric-violet hover:underline self-start mt-1 cursor-pointer"
                >
                  Remove selected
                </button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Firstname</label>
              <div className="bg-sky-50 rounded-2xl flex items-center">
                <input
                  className="p-2.5 focus-within:outline-none placeholder:text-c-muted focus-within:ring-0 grow rounded-2xl"
                  placeholder="John"
                  type="text"
                  {...register('firstname')}
                />
              </div>
              <span
                className={`h-4 inline-block text-red-500 text-xs ${errors.firstname ? 'opacity-100' : 'opacity-0'}`}
              >
                {errors.firstname?.message}
              </span>
            </div>

            <div className="form-group">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Lastname</label>
              <div className="bg-sky-50 rounded-2xl flex items-center">
                <input
                  className="p-2.5 focus-within:outline-none placeholder:text-c-muted focus-within:ring-0 grow rounded-2xl"
                  placeholder="Doe"
                  type="text"
                  {...register('lastname')}
                />
              </div>
              <span
                className={`h-4 inline-block text-red-500 text-xs ${errors.lastname ? 'opacity-100' : 'opacity-0'}`}
              >
                {errors.lastname?.message}
              </span>
            </div>

            <div className="form-group md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Username</label>
              <div className="bg-sky-50 rounded-2xl flex items-center">
                <input
                  className="p-2.5 focus-within:outline-none placeholder:text-c-muted focus-within:ring-0 grow rounded-2xl"
                  placeholder="johndoe1234"
                  type="text"
                  {...register('username')}
                />
              </div>
              <span
                className={`h-4 inline-block text-red-500 text-xs ${errors.username ? 'opacity-100' : 'opacity-0'}`}
              >
                {errors.username?.message}
              </span>
            </div>

            <div className="form-group md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
              <div className="bg-sky-50 rounded-2xl flex items-center">
                <input
                  className="p-2.5 focus-within:outline-none placeholder:text-c-muted focus-within:ring-0 grow rounded-2xl"
                  placeholder="john.doe@example.mail"
                  type="text"
                  {...register('email')}
                />
              </div>
              <span className={`h-4 inline-block text-red-500 text-xs ${errors.email ? 'opacity-100' : 'opacity-0'}`}>
                {errors.email?.message}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isBusy}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-c-electric-violet text-sky-50 font-semibold text-sm shadow-lg shadow-c-electric-violet/25 hover:bg-c-medium-purple hover:shadow-xl hover:shadow-c-medium-purple/30 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-wait"
            >
              {isBusy ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Profile;

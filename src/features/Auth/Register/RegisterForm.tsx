import { useForm } from 'react-hook-form';
import Envelope from '../../../shared/ui/Icons/Envelope';
import { NavLink, useNavigate } from 'react-router';
import type { RegisterFormPayload } from '@src/shared/types/schemas';
import { RegisterSchema } from '@src/shared/schemas/RegisterSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputPassword from '@src/shared/ui/InputPassword/InputPassword';
import { useAuthStore } from '@src/shared/store/authStore';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { signup, loading: isLoading } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormPayload>({
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RegisterSchema),
  });

  const isLoadingButton = isLoading || isSubmitting;

  const handleRegister = handleSubmit(async (data) => {
    await signup(data);
    const redirect = sessionStorage.getItem('redirectAfterLogin');
    navigate(redirect || '/dashboard');
    sessionStorage.removeItem('redirectAfterLogin');
  });

  return (
    <form className="w-full min-h-125 max-w-lg p-6 relative" id="registerForm" onSubmit={handleRegister}>
      <div className="heading flex flex-col gap-y-2.5 mb-8">
        <div className="logo"></div>
        <h2 className="text-3xl font-bold text-c-dark">Sign Up</h2>
      </div>

      <div className="flex gap-3">
        <div className="form-group flex-1">
          <div className="bg-sky-50 rounded-2xl flex items-center">
            <input
              className="p-2.5 focus-within:outline-none placeholder:text-c-muted focus-within:ring-0 grow"
              placeholder="John"
              {...register('firstname')}
              type="text"
            />
          </div>
          <span className={`h-4 inline-block text-red-500 ${errors.firstname ? 'opacity-100' : 'opacity-0'}`}>
            {errors.firstname?.message}
          </span>
        </div>

        <div className="form-group flex-1">
          <div className="bg-sky-50 rounded-2xl flex items-center">
            <input
              className="p-2.5 focus-within:outline-none placeholder:text-c-muted focus-within:ring-0 grow"
              placeholder="Doe"
              {...register('lastname')}
              type="text"
            />
          </div>
          <span className={`h-4 inline-block text-red-500 ${errors.lastname ? 'opacity-100' : 'opacity-0'}`}>
            {errors.lastname?.message}
          </span>
        </div>
      </div>

      <div className="form-group">
        <div className="bg-sky-50 rounded-2xl flex items-center">
          <input
            className="p-2.5 focus-within:outline-none placeholder:text-c-muted focus-within:ring-0 grow"
            placeholder="johndoe1234"
            {...register('username')}
            type="text"
          />
        </div>
        <span className={`h-4 inline-block text-red-500 ${errors.username ? 'opacity-100' : 'opacity-0'}`}>
          {errors.username?.message}
        </span>
      </div>

      <div className="form-group">
        <div className="bg-sky-50 rounded-2xl flex items-center">
          <Envelope className="size-6 py-1 ms-1" />
          <input
            className="p-2.5 focus-within:outline-none placeholder:text-c-muted focus-within:ring-0 grow"
            placeholder="john.doe@example.mail"
            {...register('email')}
            type="text"
          />
        </div>
        <span className={`h-4 inline-block text-red-500 ${errors.email ? 'opacity-100' : 'opacity-0'}`}>
          {errors.email?.message}
        </span>
      </div>

      <InputPassword register={register('password')} error={errors.password} />
      <InputPassword
        register={register('confirmPassword')}
        error={errors.confirmPassword}
        placeholder="Confirm password"
      />

      <div className="actions mb-2.5">
        <button
          type="submit"
          disabled={isLoadingButton}
          className={`btn-primary w-full mt-4 p-2.5 text-white text-shadow-white cursor-pointer ${isLoadingButton ? 'loading' : ''}`}
        >
          Sign Up
        </button>
      </div>
      <div className="text-c-dark">
        Already have an account?
        <NavLink to="/auth/login" className="text-c-electric-violet font-medium ms-1.5">
          Sign in
        </NavLink>
      </div>
    </form>
  );
};

export default RegisterForm;

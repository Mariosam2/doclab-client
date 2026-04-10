import { useForm } from 'react-hook-form';
import Envelope from '@src/shared/ui/Icons/Envelope';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '../../../shared/schemas/LoginSchema';
import './LoginForm.css';
import type { LoginFormPayload } from '@src/shared/types/schemas';
import { NavLink, useNavigate } from 'react-router';
import InputPassword from '@src/shared/ui/InputPassword/InputPassword';
import { useAuthStore } from '@src/shared/store/authStore';

const LoginForm = () => {
  const navigate = useNavigate();
  const { login, loading: isLoading } = useAuthStore();
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<LoginFormPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(LoginSchema),
  });

  const isLoadingButton = isLoading || isSubmitting;

  const handleLogin = handleSubmit(async (data) => {
    await login(data);
    navigate('/dashboard');
  });

  return (
    <form className="w-full min-h-125 max-w-md p-6 relative " id="loginForm" onSubmit={handleLogin}>
      <div className="heading flex flex-col gap-y-2.5 mb-8">
        <div className="logo"></div>
        <h2 className="text-3xl font-bold text-c-dark">Sign In</h2>
      </div>
      <div className="form-group">
        <div className="bg-sky-50 rounded-2xl flex items-center">
          <Envelope className="size-6 py-1 ms-1" />
          <input
            className="p-2.5 focus-within:outline-none placeholder:text-c-muted focus-within:ring-0 grow"
            placeholder="john.doe@example.mail"
            {...register('email')}
            type="text"
            name="email"
            id="email"
          />
        </div>

        <span className={`h-4 inline-block text-red-500 ${errors.email ? 'opacity-100' : 'opacity-0'}`}>
          {errors.email?.message}
        </span>
      </div>
      <InputPassword register={register('password')} error={errors.password} placeholder="••••••••" />
      <div className="actions mb-2.5">
        <button
          type="submit"
          disabled={isLoadingButton}
          className={`btn-primary w-full mt-4 p-2.5 text-white text-shadow-white cursor-pointer ${isLoadingButton ? 'loading' : ''}`}
        >
          Sign In
        </button>
      </div>
      <div className="text-c-dark">
        Don't have an account?
        <NavLink to="/auth/register" className="text-c-electric-violet font-medium ms-1.5">
          Sign up
        </NavLink>
      </div>
    </form>
  );
};

export default LoginForm;

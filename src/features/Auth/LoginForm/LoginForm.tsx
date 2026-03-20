import { useForm } from "react-hook-form";
import { Envelope } from "../../../shared/ui/Icons/Envelope";
import { Lock } from "../../../shared/ui/Icons/Lock";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../../shared/schemas/LoginSchema";
import { showToast } from "../../../shared/helpers";
import { ToastType } from "../../../shared/enums/ToastType.enum";

const LoginForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<LoginForm>({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const handleLogin = handleSubmit(async (data) => {
    try {
      const isEmail = data.identifier.includes("@");
      const payload = isEmail
        ? { email: data.identifier, password: data.password }
        : { username: data.identifier, password: data.password };

      //await login(payload).unwrap();
    } catch (error) {
      showToast("Error", (error as Error).message, ToastType.DANGER);
    }
  });

  return (
    <form
      className="w-full min-h-125 max-w-md p-6 relative "
      id="loginForm"
      onSubmit={handleLogin}>
      <div className="heading flex flex-col gap-y-2.5 mb-8">
        <div className="logo"></div>
        <h2 className="text-3xl font-bold text-c-dark">Sign In</h2>
      </div>
      <div className="form-group">
        <div className="bg-sky-50 rounded-2xl flex items-center">
          <Envelope className="size-6 py-1 ms-1" />
          <input
            className="p-2.5   focus-within:outline-none focus-within:ring-0"
            {...register("identifier")}
            type="text"
            name="identifier"
            id="identifier"
          />
        </div>

        <span
          className={`h-4 inline-block text-red-500 ${errors.identifier ? "opacity-100" : "opacity-0"}`}>
          {errors.identifier?.message}
        </span>
      </div>
      <div className="form-group">
        <div className="bg-sky-50 rounded-2xl flex items-center">
          <Lock className="size-6 py-1 ms-1" />
          <input
            className="p-2.5   focus-within:outline-none focus-within:ring-0"
            {...register("password")}
            type="text"
            name="password"
            id="password"
          />
        </div>

        <span
          className={`h-4 inline-block text-red-500 ${errors.password ? "opacity-100" : "opacity-0"}`}>
          {errors.password?.message}
        </span>
      </div>
      <div className="actions">
        <button
          type="submit"
          className="btn-primary w-full mt-4 p-2.5 text-white text-shadow-white cursor-pointer ">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

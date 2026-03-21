import { useState } from "react";
import Lock from "@src/shared/ui/Icons/Lock";
import { type UseFormRegisterReturn, type FieldError } from "react-hook-form";
import "./InputPassword.css";
import EyeOpen from "../Icons/EyeOpen";
import EyeClosed from "../Icons/EyeClosed";

interface InputPasswordProps {
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
}

const InputPassword = ({ register, error, placeholder = "••••••••" }: InputPasswordProps) => {
  const [show, setShow] = useState(false);

  return (
    <div className="form-group">
      <div className="bg-sky-50 rounded-2xl flex items-center">
        <Lock className="size-6 py-1 ms-1" />
        <input
          className="p-2.5 focus-within:outline-none placeholder:text-c-muted focus-within:ring-0 grow"
          placeholder={placeholder}
          {...register}
          type={show ? "text" : "password"}
        />

        <button type="button" className="px-2.5 text-c-muted cursor-pointer" onClick={() => setShow(!show)}>
          {show ? <EyeOpen className="size-5" /> : <EyeClosed className="size-5" />}
        </button>
      </div>
      <span className={`h-4 inline-block text-red-500 ${error ? "opacity-100" : "opacity-0"}`}>{error?.message}</span>
    </div>
  );
};

export default InputPassword;

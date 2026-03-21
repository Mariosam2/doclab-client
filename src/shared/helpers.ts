import { toast } from "@heroui/react";
import { ToastType } from "./enums/ToastType.enum";

export const getErrorMessage = (error: unknown): string => {
  let message = "Unknown Error";

  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === "object" && error != null) {
    if ("error" in error) {
      const inner = (error as { error: { data?: { message?: string } } }).error;
      message = inner?.data?.message ?? "Something went wrong";
    } else if ("data" in error) {
      message = (error as { data: { message?: string } }).data?.message ?? "Something went wrong";
    }
  }

  return message;
};

export const showToast = (title: string, description: string, type: ToastType, timeout: number = 2000) => {
  const options = { description: description ?? "Something went wrong", timeout };

  switch (type) {
    case ToastType.SUCCESS:
      toast.success(title, options);
      break;
    case ToastType.DANGER:
      toast.danger(title, options);
      break;
    case ToastType.WARNING:
      toast.warning(title, options);
      break;
    case ToastType.PRIMARY:
      toast.info(title, options);
      break;
    default:
      toast(title, options);
      break;
  }
};

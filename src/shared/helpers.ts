import { addToast } from "@heroui/react";
import type { ToastType } from "./enums/ToastType.enum";

export const showToast = (
  title: string,
  description: string,
  type: ToastType,
  timeout: number = 2000,
) => {
  addToast({
    title,
    description,
    color: type,
    timeout,
    variant: "flat",
  });
};

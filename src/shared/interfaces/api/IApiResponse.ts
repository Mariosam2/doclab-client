import type { IValidationError } from "./IValidationError";

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  validationErrors?: IValidationError[];
}

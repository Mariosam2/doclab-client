import type { IValidationError } from "./IValidationError";

export interface IApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  idOut?: string | string[];
  validationErrors?: IValidationError[];
}

import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

export function getValidationErrors(err: any) {
  const validationErrors: Errors = {};

  err.inner.forEach((error: { path: any; message: string; }) => {
    validationErrors[error.path!] = error.message;
  });
  return validationErrors;
}

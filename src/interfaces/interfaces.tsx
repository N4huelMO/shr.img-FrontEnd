import { FieldError, Path, UseFormRegister } from "react-hook-form";

export interface FileProps {
  name: string;
  original_name: string;
  downloads: number;
  password: string | null;
  author: string | null;
}

export interface AlertProps {
  msg: string;
  error: boolean;
}

export interface UserProps {
  id: "";
  name: "";
  email: "";
}

export interface IFormValues {
  name: string;
  email: string;
  password: string;
}

export type InputProps = {
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required: boolean;
  errors: FieldError | undefined;
  minLength?: number;
  message?: string;
  type: string;
};

export interface ServerSideParams {
  params: {
    link: string;
  };
}

export interface FilePageProps {
  dataFetched: {
    link: string;
    file: string;
    password: boolean;
    isError: boolean;
    msg: string;
  };
}

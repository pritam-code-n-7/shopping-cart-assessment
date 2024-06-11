import { ChangeEvent } from "react";

export interface InputTypes {
  type: string;
  value: string | number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  id?: string;
  min?: string;
  max?: string;
  htmlFor?:string;
  label?:string;
}

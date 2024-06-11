import { ChangeEvent } from "react";

export interface InputTypes {
  type: string;
  value: string;
  onChange: (event:ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

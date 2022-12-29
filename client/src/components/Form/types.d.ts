import { FormikConfig } from "formik";
import React from "react";
export interface InputProps {
  name: string;
  label?: string;
  type?: string;
  value: string | number | undefined;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode | JSX.Element;
  onToggle?: () => void;
  pattern?: string;
  countryCode?: string;
  fomikProps?: FormikConfig<T>;
}

export interface SearchProps {
  type?: HTMLInputTypeAttribute;
  value?: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface DropdownProps {
  id: string;
  label?: string;
  data: {
    id: number | string;
    name: string;
  }[];
  errorMessage?: string;
  handleItemClick: (id: string | number | string) => void;
  selectedItem: string | null;
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>;
}
export interface SearchableDropdownProps {
  id: string;
  label?: string;
  data: {
    id: number | string;
    name: string;
  }[];
  children?: React.ReactNode | JSX.Element;
  errorMessage?: string;
  handleItemClick: (id: string | number) => void;
  selectedItem?: string | null;
}

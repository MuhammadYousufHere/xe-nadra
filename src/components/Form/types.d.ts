import React from "react";

export interface InputProps {
  name: string;
  label?: string;
  type?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode | JSX.Element;
  onToggle?: () => void;
  pattern?: string;
}

export interface SearchProps {
  type?: HTMLInputTypeAttribute;
  value?: string;
  name?: string;
  onChange?: (e: React.InputHTMLAttributes<HTMLInputElement>) => void;
}

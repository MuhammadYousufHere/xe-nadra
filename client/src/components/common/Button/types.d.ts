export type BVariantProps = {
  variant: keyof typeof BVariant;
};
export interface ButtonProps {
  title: string;
  variant?: BVariantProps["variant"];
  withIcon?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
}

export const BVariant = {
  primary: "primary",
  secondary: "secondary",
  outlined: "outlined",
  text: "text",
  danger: "danger",
  link: "link",
  pill: "pill",
};

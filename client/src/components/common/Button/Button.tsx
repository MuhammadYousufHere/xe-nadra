import { FC } from 'react';
import { ButtonProps } from './types.d';
import './ButtonStyles.scss';
const Button: FC<ButtonProps> = ({
  variant,
  title,
  onClick,
  disabled,
  type = 'button',
  icon,
}) => {
  return (
    <button
      className={`btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <span>{title}</span>
      {icon && icon}
    </button>
  );
};

export default Button;

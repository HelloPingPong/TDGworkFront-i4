import React, { ButtonHTMLAttributes } from 'react';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  ...rest
}) => {
  const buttonClasses = [
    'jpm-button',
    `jpm-button-${variant}`,
    `jpm-button-${size}`,
    fullWidth ? 'jpm-button-full-width' : '',
    isLoading ? 'jpm-button-loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <span className="jpm-button-spinner" />}
      <span className="jpm-button-content">
        {leftIcon && <span className="jpm-button-left-icon">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="jpm-button-right-icon">{rightIcon}</span>}
      </span>
    </button>
  );
};

export default Button;

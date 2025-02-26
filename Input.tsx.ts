import React, { InputHTMLAttributes, forwardRef } from 'react';
import './Input.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  id,
  fullWidth = true,
  ...rest
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
  
  const inputClasses = [
    'jpm-input',
    error ? 'jpm-input-error' : '',
    leftIcon ? 'jpm-input-with-left-icon' : '',
    rightIcon ? 'jpm-input-with-right-icon' : '',
    fullWidth ? 'jpm-input-full-width' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={`jpm-input-container ${fullWidth ? 'jpm-input-container-full-width' : ''}`}>
      {label && (
        <label className="jpm-input-label" htmlFor={inputId}>
          {label}
        </label>
      )}
      
      <div className="jpm-input-wrapper">
        {leftIcon && (
          <div className="jpm-input-left-icon">
            {leftIcon}
          </div>
        )}
        
        <input
          className={inputClasses}
          id={inputId}
          ref={ref}
          {...rest}
        />
        
        {rightIcon && (
          <div className="jpm-input-right-icon">
            {rightIcon}
          </div>
        )}
      </div>
      
      {helperText && !error && (
        <div className="jpm-input-helper-text">
          {helperText}
        </div>
      )}
      
      {error && (
        <div className="jpm-input-error-text">
          {error}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;

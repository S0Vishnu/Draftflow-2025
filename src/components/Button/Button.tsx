import React from 'react';
import { useTheme } from '../../providers';
import './Button.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const { theme } = useTheme();

  const buttonStyle: React.CSSProperties = {
    backgroundColor:
      variant === 'primary'
        ? theme.colors.primary
        : variant === 'secondary'
        ? theme.colors.secondary
        : 'transparent',
    color:
      variant === 'outline' ? theme.colors.primary : '#ffffff',
    border: `1px solid ${
      variant === 'outline' ? theme.colors.primary : 'transparent'
    }`,
    padding:
      size === 'sm'
        ? `${theme.spacing.sm} ${theme.spacing.md}`
        : size === 'lg'
        ? `${theme.spacing.md} ${theme.spacing.xl}`
        : `${theme.spacing.sm} ${theme.spacing.lg}`,
    fontSize:
      size === 'sm'
        ? theme.typography.fontSize.sm
        : size === 'lg'
        ? theme.typography.fontSize.lg
        : theme.typography.fontSize.md,
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
    fontFamily: theme.typography.fontFamily,
    transition: 'all 0.2s ease',
  };

  return (
    <button
      className={`button button-${variant} button-${size} ${className}`}
      style={buttonStyle}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;


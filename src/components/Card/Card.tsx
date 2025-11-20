import React from 'react';
import { useTheme } from '../../providers';
import './Card.scss';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  const { theme } = useTheme();

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div className={`card ${className}`} style={cardStyle}>
      {title && (
        <h3
          style={{
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.text,
            marginBottom: theme.spacing.md,
          }}
        >
          {title}
        </h3>
      )}
      <div style={{ color: theme.colors.textSecondary }}>
        {children}
      </div>
    </div>
  );
};

export default Card;


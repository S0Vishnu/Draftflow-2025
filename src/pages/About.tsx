import React from 'react';
import { useTheme } from '../providers';

const About: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        minHeight: '100vh',
      }}
    >
      <h1 style={{ fontSize: theme.typography.fontSize.xl }}>About</h1>
      <p style={{ fontSize: theme.typography.fontSize.md, marginTop: theme.spacing.md }}>
        This is the about page.
      </p>
    </div>
  );
};

export default About;



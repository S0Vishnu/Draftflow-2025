import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../providers';
import { useAuth } from '../providers';
import { Button, Card } from '../components';

const Home: React.FC = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { userEmail, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      style={{
        padding: theme.spacing.xl,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <div style={{ marginBottom: theme.spacing.lg, display: 'flex', gap: theme.spacing.sm, justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: theme.spacing.sm }}>
          <Button onClick={toggleTheme} variant="outline">
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </Button>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
        {userEmail && (
          <p style={{ fontSize: theme.typography.fontSize.sm, color: theme.colors.textSecondary }}>
            Logged in as: {userEmail}
          </p>
        )}
      </div>
      
      <h1 style={{ fontSize: theme.typography.fontSize.xl, marginBottom: theme.spacing.md }}>
        Welcome to Draftflow 2025
      </h1>
      
      <p style={{ fontSize: theme.typography.fontSize.md, marginBottom: theme.spacing.lg }}>
        This is the home page with theme support.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: theme.spacing.md }}>
        <Card title="Components">
          <p>Reusable components are in the components folder.</p>
        </Card>
        <Card title="Pages">
          <p>Page components are in the pages folder.</p>
        </Card>
        <Card title="Services">
          <p>API services are in the services folder.</p>
        </Card>
        <Card title="Theme">
          <p>Theme configuration is in the theme folder.</p>
        </Card>
      </div>
    </div>
  );
};

export default Home;


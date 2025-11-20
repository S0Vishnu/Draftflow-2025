import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../providers';
import './Login.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    setIsLoading(true);
    try {
      await login(email);
      navigate('/otp', { state: { email } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    setError('');
    try {
      await googleLogin();
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google authentication failed. Please try again.');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <img src="/logo.svg" alt="DRAFTFLOW" className="login-logo" />
          <p className="login-subtitle">Log In or Register with your email.</p>
        </div>

        <div className="login-content">
          {import.meta.env.VITE_GOOGLE_CLIENT_ID && (
            <>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="filled_blue"
                size="large"
                text="continue_with"
                shape="rectangular"
              />
              <div className="divider">
                <span>or</span>
              </div>
            </>
          )}

          <form onSubmit={handleEmailSubmit} className="email-form">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="continue-button"
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Continue'}
            </button>
          </form>

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default Login;


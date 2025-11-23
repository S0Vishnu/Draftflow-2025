import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers';
import './OtpVerification.scss';

const OtpVerification: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [email, setEmail] = useState('');
  const { verifyOtp, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Get email from location state or sessionStorage
    const stateEmail = location.state?.email;
    const storedEmail = sessionStorage.getItem('pendingEmail');
    setEmail(stateEmail || storedEmail || 'useremail@gmail.com');
  }, [location]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // Only allow digits

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last character
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 5);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < 5; i++) {
        newOtp[i] = pastedData[i] || '';
      }
      setOtp(newOtp);
      // Focus the last filled input or the last input
      const lastIndex = Math.min(pastedData.length - 1, 4);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 5) {
      setError('Please enter the complete 5-digit code');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      await verifyOtp(otpString);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid code. Please try again.');
      // Clear OTP on error
      setOtp(['', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    
    setIsResending(true);
    setError('');
    try {
      await login(email);
      setOtp(['', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-container">
        <div className="otp-header">
          <img src="/logo.svg" alt="DRAFTFLOW" className="otp-logo" />
          <h1 className="otp-title">Check your email</h1>
          <p className="otp-message">
            We sent you a sign-in code to: <strong>{email}</strong>
            <br />
            Paste (or type) it below to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="otp-input"
                disabled={isLoading}
                autoFocus={index === 0}
              />
            ))}
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="verify-button"
            disabled={isLoading || otp.join('').length !== 5}
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>

          <button
            type="button"
            onClick={handleResend}
            className="resend-button"
            disabled={isResending || isLoading}
          >
            {isResending ? 'Resending...' : 'Resend Code'}
          </button>
        </form>

        {isResending && (
          <div className="sending-indicator">
            <div className="spinner"></div>
            <span>Sending Code</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpVerification;




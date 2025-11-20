// Authentication service with static password for local usage

export interface AuthResponse {
  success: boolean;
  message?: string;
  email?: string;
  requiresOtp?: boolean;
}

export interface OtpResponse {
  success: boolean;
  message?: string;
  token?: string;
}

// Static password for local development
export const STATIC_PASSWORD = 'draftflow2025';
export const STATIC_OTP = '12345';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authService = {
  // Send OTP to email
  sendOtp: async (email: string): Promise<AuthResponse> => {
    await delay(1000); // Simulate network delay
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: 'Please enter a valid email address',
      };
    }

    // Store email in sessionStorage for OTP verification
    sessionStorage.setItem('pendingEmail', email);
    sessionStorage.setItem('otpSent', 'true');

    return {
      success: true,
      message: 'OTP sent successfully',
      email,
      requiresOtp: true,
    };
  },

  // Verify OTP
  verifyOtp: async (otp: string): Promise<OtpResponse> => {
    await delay(1000); // Simulate network delay
    
    const email = sessionStorage.getItem('pendingEmail');
    
    if (!email) {
      return {
        success: false,
        message: 'No pending verification found',
      };
    }

    // For local usage, accept static OTP or any 5-digit code
    if (otp === STATIC_OTP || /^\d{5}$/.test(otp)) {
      // Generate a mock token
      const token = `mock_token_${Date.now()}`;
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('userEmail', email);
      sessionStorage.removeItem('pendingEmail');
      sessionStorage.removeItem('otpSent');

      return {
        success: true,
        message: 'Verification successful',
        token,
      };
    }

    return {
      success: false,
      message: 'Invalid OTP code',
    };
  },

  // Google OAuth (mock for now - will need actual implementation)
  googleAuth: async (): Promise<AuthResponse> => {
    await delay(1500); // Simulate network delay
    
    // Mock Google auth success
    const mockEmail = 'user@gmail.com';
    const token = `google_token_${Date.now()}`;
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('userEmail', mockEmail);
    sessionStorage.setItem('authMethod', 'google');

    return {
      success: true,
      message: 'Google authentication successful',
      email: mockEmail,
    };
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!sessionStorage.getItem('authToken');
  },

  // Get current user email
  getCurrentUser: (): string | null => {
    return sessionStorage.getItem('userEmail');
  },

  // Logout
  logout: (): void => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('authMethod');
    sessionStorage.removeItem('pendingEmail');
    sessionStorage.removeItem('otpSent');
  },
};



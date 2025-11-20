# DRAFTFLOW 2025

A modern React + TypeScript application with authentication, theme support, and SCSS styling.

## Features

- 🔐 **Authentication System**
  - Email-based login with OTP verification
  - Google OAuth integration
  - Protected routes
  - Static password for local development

- 🎨 **Theme System**
  - Light/Dark mode support
  - Customizable theme variables
  - Smooth transitions

- 📦 **Modern Stack**
  - React 19 with TypeScript
  - Vite for fast development
  - React Router for navigation
  - TanStack Query for data handling
  - SCSS for styling

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GOOGLE_CLIENT_ID=your-google-client-id-here
```

To get a Google OAuth Client ID:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized domains

**Note:** For local development without Google OAuth, you can leave this empty. The app will work with email/OTP authentication only.

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Authentication

### Email/OTP Authentication

1. Enter your email address on the login page
2. You'll receive an OTP code (for local development, use any 5-digit code or `12345`)
3. Enter the code on the OTP verification page
4. You'll be redirected to the home page

### Google OAuth

1. Click "Continue with Google" button
2. Complete Google authentication
3. You'll be automatically logged in

### Static Password for Local Usage

For local development and testing:
- **OTP Code:** Any 5-digit number (e.g., `12345`, `00000`, `99999`)
- The system accepts any valid 5-digit code for local testing

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/           # Page components (Login, OTP, Home, etc.)
├── providers/       # React context providers (Theme, Auth)
├── services/       # API services and utilities
├── styles/         # SCSS styles
│   ├── abstracts/  # Variables, mixins, functions
│   ├── base/       # Reset and base styles
│   └── components/ # Component-specific styles
└── theme/         # Theme configuration
```

## Technologies Used

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **TanStack Query** - Data fetching and state management
- **@react-oauth/google** - Google OAuth integration
- **SCSS** - Styling with variables and mixins

## License

MIT

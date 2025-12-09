import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { ModernLandingPage } from "./components/landing/ModernLandingPage";
import { ModernLoginPage } from "./components/auth/ModernLoginPage";
import { ModernSignupPage } from "./components/auth/ModernSignupPage";
import { ForgotPasswordPage } from "./components/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/auth/ResetPasswordPage";
import { ModernPricingPage } from "./components/pricing/ModernPricingPage";
import { ModernDashboard } from "./components/dashboard/ModernDashboard";
import { CredentialsPage } from "./components/credentials/CredentialsPage";
import { CalendarPage } from "./components/calendar/CalendarPage";
import { RemindersPage } from "./components/reminders/RemindersPage";
import { SettingsPage } from "./components/settings/SettingsPage";
import { HelpPage } from "./components/help/HelpPage";
import { PrivacyPolicyPage } from "./components/legal/PrivacyPolicyPage";
import { TermsOfServicePage } from "./components/legal/TermsOfServicePage";
import { ContactPage } from "./components/legal/ContactPage";
import { Loader2 } from "lucide-react";

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<ModernLandingPage />} />
      <Route path="/pricing" element={<ModernPricingPage />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <ModernLoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <ModernSignupPage />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        }
      />
      <Route
        path="/reset-password"
        element={<ResetPasswordPage />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <ModernDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/credentials"
        element={
          <ProtectedRoute>
            <CredentialsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <ProtectedRoute>
            <CalendarPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reminders"
        element={
          <ProtectedRoute>
            <RemindersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help"
        element={
          <ProtectedRoute>
            <HelpPage />
          </ProtectedRoute>
        }
      />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <AppRoutes />
        <Toaster />
      </Suspense>
    </AuthProvider>
  );
}

export default App;

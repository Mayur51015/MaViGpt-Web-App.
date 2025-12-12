import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ChatPage } from './pages/ChatPage';
import { ProfilePage } from './pages/ProfilePage';

const AppRoutes: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
            }}>
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <Routes>
            <Route
                path="/"
                element={user ? <Navigate to="/chat" replace /> : <LandingPage />}
            />
            <Route
                path="/login"
                element={user ? <Navigate to="/chat" replace /> : <LoginPage />}
            />
            <Route
                path="/signup"
                element={user ? <Navigate to="/chat" replace /> : <SignupPage />}
            />
            <Route
                path="/chat"
                element={
                    <ProtectedRoute>
                        <ChatPage />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, Chrome } from 'lucide-react';
import './AuthPages.css';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signIn, signInWithGoogle } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await signIn(email, password);
            navigate('/chat');
        } catch (err: any) {
            setError(err.message || 'Failed to sign in');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError('');
        setLoading(true);

        try {
            await signInWithGoogle();
            navigate('/chat');
        } catch (err: any) {
            setError(err.message || 'Failed to sign in with Google');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-background"></div>
            <div className="auth-card">
                <div className="auth-header">
                    <h1 className="auth-logo">MaViGpt</h1>
                    <p className="auth-subtitle">Welcome back</p>
                </div>

                {error && <div className="auth-error">{error}</div>}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="auth-input"
                        />
                    </div>

                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="auth-input"
                        />
                    </div>

                    <button type="submit" disabled={loading} className="auth-button primary">
                        {loading ? 'Signing in...' : 'Continue'}
                    </button>
                </form>

                <div className="auth-divider">
                    <span>OR</span>
                </div>

                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="auth-button google"
                >
                    <Chrome size={20} />
                    Continue with Google
                </button>

                <p className="auth-footer">
                    Don't have an account?{' '}
                    <Link to="/signup" className="auth-link">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

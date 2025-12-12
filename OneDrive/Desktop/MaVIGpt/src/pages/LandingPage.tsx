import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Zap, Shield, Sparkles, ArrowRight } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import './LandingPage.css';

export const LandingPage: React.FC = () => {
    return (
        <div className="landing-page">
            {/* Header */}
            <header className="landing-header">
                <div className="logo">
                    <Sparkles size={28} />
                    <span>MaViGPT</span>
                </div>
                <div className="header-actions">
                    <ThemeToggle />
                    <Link to="/login" className="btn-secondary">
                        Login
                    </Link>
                    <Link to="/signup" className="btn-primary">
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">
                        <Zap size={16} />
                        <span>Powered by Google Gemini AI</span>
                    </div>
                    <h1 className="hero-title">
                        Your Intelligent
                        <span className="gradient-text"> AI Assistant</span>
                    </h1>
                    <p className="hero-description">
                        Experience the future of conversational AI with MaViGPT.
                        Get instant answers, creative ideas, and intelligent assistance
                        powered by cutting-edge technology.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/signup" className="btn-hero-primary">
                            Start Chatting
                            <ArrowRight size={20} />
                        </Link>
                        <Link to="/login" className="btn-hero-secondary">
                            Sign In
                        </Link>
                    </div>
                </div>
                <div className="hero-visual">
                    <div className="floating-card card-1">
                        <MessageSquare size={24} />
                        <p>Natural conversations</p>
                    </div>
                    <div className="floating-card card-2">
                        <Zap size={24} />
                        <p>Lightning fast responses</p>
                    </div>
                    <div className="floating-card card-3">
                        <Shield size={24} />
                        <p>Secure & private</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2 className="section-title">Why Choose MaViGPT?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <MessageSquare size={32} />
                        </div>
                        <h3>Natural Conversations</h3>
                        <p>
                            Engage in human-like conversations with advanced AI that
                            understands context and provides meaningful responses.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <Zap size={32} />
                        </div>
                        <h3>Instant Responses</h3>
                        <p>
                            Get lightning-fast answers to your questions with real-time
                            streaming responses powered by Google Gemini.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <Shield size={32} />
                        </div>
                        <h3>Secure & Private</h3>
                        <p>
                            Your conversations are protected with enterprise-grade security
                            and stored safely in the cloud.
                        </p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">
                            <Sparkles size={32} />
                        </div>
                        <h3>Smart & Adaptive</h3>
                        <p>
                            Experience AI that learns from context, maintains conversation
                            history, and adapts to your needs.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <h2>Ready to Get Started?</h2>
                <p>Join thousands of users experiencing the future of AI conversation</p>
                <Link to="/signup" className="btn-cta">
                    Create Free Account
                    <ArrowRight size={20} />
                </Link>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <p>&copy; 2024 MaViGPT. All rights reserved.</p>
            </footer>
        </div>
    );
};

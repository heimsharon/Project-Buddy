import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/homepage.css';
import projectBuddyLogo from '../assets/project-buddy-logo.png';

export default function HomePage() {
    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <img
                    src={projectBuddyLogo}
                    alt="Project Buddy Logo"
                    className="hero-logo"
                />

                <div className="hero-content">
                    <h1>Plan DIY Projects Like a Pro</h1>
                    <p>
                        All-in-one workspace to plan, track, and budget your DIY projects
                    </p>
                    <div className="hero-buttons">
                        <Link to="/signup" className="cta-btn primary">
                            Sign Up Free
                        </Link>
                        <Link to="/projects" className="cta-btn secondary">
                            View Demo Projects
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <h2 style={{ textAlign: 'center' }}>Features</h2>
            <div className="features">
                {/* Project Dashboard */}
                <Link to="/projects" className="feature-card">
                    <span role="img" aria-label="projects" className="feature-icon">
                        🛠️
                    </span>
                    <h3>Project Dashboard</h3>
                    <p>Manage tasks, materials, and budgets for all your projects.</p>
                </Link>

                {/* Material Calculator */}
                <Link to="/calculatorpage" className="feature-card">
                    <span role="img" aria-label="calculator" className="feature-icon">
                        🧮
                    </span>
                    <h3>Material Calculator</h3>
                    <p>Estimate paint, lumber, and more for your projects.</p>
                </Link>

                {/* Budget Tracking */}
                <Link to="/projects" className="feature-card">
                    <span role="img" aria-label="budget" className="feature-icon">
                        💰
                    </span>
                    <h3>Budget Tracking</h3>
                    <p>Monitor expenses with real-time calculations.</p>
                </Link>

                {/* AI Assistant */}
                <Link to="/chatbotpage" className="feature-card">
                    <span role="img" aria-label="chatbot" className="feature-icon">
                        🤖
                    </span>
                    <h3>AI Assistant</h3>
                    <p>Get personalized project guidance.</p>
                </Link>
            </div>
        </div>
    );
}
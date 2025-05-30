import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/homepage.css';
import projectBuddyLogo from '../assets/project-buddy-logo.png';

export default function HomePage() {
    return (
        <div className="home">
            {/* Hero Section: App logo, headline, and call-to-action */}
            <section className="hero">
                <img
                    src={projectBuddyLogo}
                    alt="Project Buddy Logo"
                    className="hero-logo"
                />

                <div className="hero-content">
                    <h1>Plan DIY Projects Like a Pro</h1>
                    <p>
                        A DIY Project Organizer - Plan, Estimate & Track your
                        Projects with optional AI Chatbot assistance.
                    </p>

                    {/* Signup button for new users */}
                    <Link to="/signup" className="cta-btn">
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Project Gallery Features: Quick links to main app features */}
            <h2 style={{ textAlign: 'center' }}>Features</h2>
            <div className="features">
                {/* Material Calculator Feature */}
                <Link to="/calculatorpage" className="feature-card">
                    <span
                        role="img"
                        aria-label="calculator"
                        className="feature-icon"
                    >
                        🧮
                    </span>
                    <h3>Material Calculator</h3>
                    <p>Estimate paint, lumber, and more for your projects.</p>
                </Link>

                {/* Create Project Feature */}
                <Link to="/createprojectpage" className="feature-card">
                    <span
                        role="img"
                        aria-label="tasks"
                        className="feature-icon"
                    >
                        ✅
                    </span>
                    <h3>Create a Project</h3>
                    <p>Break down your project into manageable steps.</p>
                </Link>

                {/* Budget Feature */}
                <Link to="/budgetpage" className="feature-card">
                    <span
                        role="img"
                        aria-label="budget"
                        className="feature-icon"
                    >
                        💰
                    </span>
                    <h3>Budget</h3>
                    <p>Track and manage your project expenses.</p>
                </Link>

                {/* Task List Feature */}
                <Link to="/listtaskspage" className="feature-card">
                    <span
                        role="img"
                        aria-label="task list"
                        className="feature-icon"
                    >
                        📝
                    </span>
                    <h3>Task List</h3>
                    <p>View and manage all your project tasks in one place.</p>
                </Link>

                {/* AI Chatbot Feature */}
                <Link to="/chatbotpage" className="feature-card">
                    <span
                        role="img"
                        aria-label="chatbot"
                        className="feature-icon"
                    >
                        🤖
                    </span>
                    <h3>AI Chatbot Assistant</h3>
                    <p>Get instant DIY advice and project guidance.</p>
                </Link>
            </div>
        </div>
    );
}

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/homepage.css';

// Dummy authentication check function (replace with your real auth logic)
function isUserSignedIn() {
    return !!localStorage.getItem('token'); // Example: check for auth token
}

export default function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isUserSignedIn()) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="home">
            <div className="hero-content">
                <h1>Plan DIY Projects Like a Pro</h1>
                <p>
                    A DIY Project Organizer - Plan, Estimate & Track your
                    Projects with AI Assistance.
                </p>

                {/* Call-to-action button */}
                <Link to="/createprojectpage" className="cta-btn">
                    Get Started
                </Link>
            </div>

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
                <Link to="/listprojectspage" className="feature-card">
                    <span
                        role="img"
                        aria-label="project list"
                        className="feature-icon"
                    >
                        📝
                    </span>
                    <h3>Projects List</h3>
                    <p>View all your projects in one place.</p>
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

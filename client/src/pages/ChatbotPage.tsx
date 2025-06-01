import React from 'react';
import ProjectBuddyBot from '../components/chatbot/ProjectBuddyBot';
import '../assets/styles/chatbot.css';

export default function ChatbotPage() {
    return (
        <div className="background">
            <div className="bot-container">
                <header className="bot-header">
                    <span className="bot-icon" role="img" aria-label="robot">
                        🤖
                    </span>
                    <h2>Project Buddy</h2>
                    <p className="bot-header-desc">
                        How can I help you with your DIY project today? Ask me
                        anything about planning, materials, or using Project
                        Buddy!
                    </p>
                </header>
                <ProjectBuddyBot />
            </div>
        </div>
    );
}

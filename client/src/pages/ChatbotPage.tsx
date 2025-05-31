import React from 'react';
import ProjectBuddyBot from '../components/chatbot/ProjectBuddyBot';
import '../assets/styles/chatbot.css';

export default function ChatbotPage() {
    return (
        <div className="background">
            <div className="bot-container">
                <h1>Project Buddy Chatbot</h1>
                <p>
                    Welcome to the Project Buddy Chatbot! Ask me anything about
                    your projects, tasks, or how to use this app.
                </p>
                <ProjectBuddyBot />
            </div>
        </div>
    );
}

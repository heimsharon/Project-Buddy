// ProjectBuddyBot.tsx - Chatbot UI and logic for Project Buddy

import React, { useState } from 'react';

// Message interface for chat messages
interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const ProjectBuddyBot = () => {
    // State for chat messages
    const [messages, setMessages] = useState<Message[]>([]);
    // State for user input
    const [input, setInput] = useState('');
    // State for loading indicator
    const [loading, setLoading] = useState(false);

    // Handles sending a message to the bot
    const sendMessage = async () => {
        if (!input.trim()) return; // Ignore empty input

        // Add user's message to chat
        const userMessage: Message = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            // Send prompt to backend API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            // Parse response from backend
            const data = await response.json();
            // Add bot's reply to chat
            const botMessage: Message = {
                sender: 'bot',
                text: data.reply || 'Sorry, something went wrong.',
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            // Handle fetch or server errors
            console.error('Chat error:', error);
            setMessages((prev) => [
                ...prev,
                {
                    sender: 'bot',
                    text: 'There was an error contacting Project Buddy.',
                },
            ]);
        } finally {
            // Reset input and loading state
            setInput('');
            setLoading(false);
        }
    };

    return (
        <div className="bot-container">
            <h3>Ask Project Buddy</h3>
            {/* Chat message history */}
            <div className="chat-box">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender}`}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            {/* Input area for user to type messages */}
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me something about your project..."
                    disabled={loading}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !loading) sendMessage();
                    }}
                />
                <button onClick={sendMessage} disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default ProjectBuddyBot;

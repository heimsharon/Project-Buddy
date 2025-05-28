// ProjectBuddyBot.tsx - Chatbot UI and logic for Project Buddy

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Message interface for chat messages
interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const ProjectBuddyBot = () => {
    // State for chat messages
    const [messages, setMessages] = useState<Message[]>([]);
    // State for user input field
    const [input, setInput] = useState('');
    // State for loading indicator while waiting for bot response
    const [loading, setLoading] = useState(false);

    // Sends the user's message to the backend and handles the response
    const sendMessage = async () => {
        if (!input.trim()) return; // Ignore empty input

        // Add user's message to the chat history
        const userMessage: Message = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            // Send the user's message to the backend API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            // Parse the response from the backend
            const data = await response.json();
            // Add the bot's reply to the chat history
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
            // Reset input field and loading state
            setInput('');
            setLoading(false);
        }
    };

    return (
        <div className="bot-container">
            <h3>Ask Project Buddy</h3>
            {/* Chat message history display */}
            <div className="chat-box">
                {messages.map((msg, idx) => (
                    <div key={idx} className={msg.sender}>
                        {/* Render message text as Markdown for formatting */}
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                ))}
            </div>
            {/* Input area for user to type and send messages */}
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

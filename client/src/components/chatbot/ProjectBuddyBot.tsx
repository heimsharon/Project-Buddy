// ProjectBuddyBot.tsx - Chatbot UI and logic for Project Buddy

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

// Message interface for chat messages
interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    timestamp: Date;
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
        if (!input.trim()) return; // Ignores empty input

        // Add user's message to the chat history
        const userMessage: Message = {
            id: Date.now().toString(), // Unique ID based on timestamp
            sender: 'user',
            text: input,
            timestamp: new Date(),
        };

        // Update messages state with user's message
        setMessages((prev) => [...prev, userMessage]);
        // Clear the input field and set loading state
        setLoading(true);

        try {
            // Send the user's message to the backend API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });

            // Parse the response from the backend
            const data = await response.json();

            // Add the bot's reply to the chat history
            const botMessage: Message = {
                id: (Date.now() + 1).toString(), // Unique ID based on timestamp
                sender: 'bot',
                text: data.reply || 'Sorry, something went wrong.', // Fallback message if no reply
                timestamp: new Date(),
            };
            // Update messages state with bot's message
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            // Handle fetch or server errors
            console.error('Chat error:', error);
            // Create an error message to display in the chat
            const errorMessage: Message = {
                id: (Date.now() + 2).toString(), // Unique ID based on timestamp
                sender: 'bot',
                text: 'Error contacting Project Buddy. Please try again later.',
                timestamp: new Date(),
            };
            // Add error message to chat history
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            // Reset input field and loading state
            setInput('');
            // Set loading to false after response is received or error occurs, denoting that the bot is no longer processing
            setLoading(false);
        }
    };

    return (
        <div className="background">
            <div className="bot-container">
                <h3>Ask Project Buddy</h3>

                {/* Chat message history display */}
                <div className="chat-box">
                    {/* Map through messages and display each one */}
                    {messages.map((msg, idx) => (
                        <div key={idx} className="message-row">
                            <div className={`message ${msg.sender}`}>
                                <span
                                    className="avatar"
                                    role="img"
                                    aria-label={
                                        msg.sender === 'bot'
                                            ? ' robot'
                                            : ' user'
                                    }
                                >
                                    {msg.sender === 'bot' ? '🤖' : '👤'}
                                </span>

                                {/* Display user or bot message text with Markdown support */}
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                {/* Move timestamp inside the bubble, after the text */}
                                <div className="timestamp">
                                    {msg.timestamp.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: false,
                                    })}
                                    {/* The use of hour12: false, will result in 24 hour format */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input area for user to type and send messages */}
                <form
                    className="chat-input"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!loading) sendMessage();
                    }}
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me something about your project..."
                        disabled={loading}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProjectBuddyBot;

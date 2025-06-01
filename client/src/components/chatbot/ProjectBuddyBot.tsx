// ProjectBuddyBot.tsx - Chatbot UI and logic for Project Buddy

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

// Message interface for chat messages
interface Message {
    id: string;
    sender: 'user' | 'bot';
    text: string;
    timestamp: Date;
}

function MessageRow({ msg }: { msg: Message }) {
    return (
        <div className="chat-message-row">
            <div className={`chat-message ${msg.sender}`}>
                <span
                    className="chat-avatar"
                    role="img"
                    aria-label={msg.sender === 'bot' ? 'robot' : 'user'}
                >
                    {msg.sender === 'bot' ? '🤖' : '👤'}
                </span>
                <div className="chat-message-content">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
                <div className="chat-timestamp">
                    {msg.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    })}
                </div>
            </div>
        </div>
    );
}

const ProjectBuddyBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const chatBoxRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        setError('');
        const userMessage: Message = {
            id: Date.now().toString(),
            sender: 'user',
            text: input,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            });

            if (!response.ok) throw new Error('Network error');

            const data = await response.json();

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'bot',
                text: data.reply || 'Sorry, something went wrong.',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
        } catch (err) {
            setError('Error contacting Project Buddy. Please try again later.');
        } finally {
            setInput('');
            setLoading(false);
        }
    };

    // Handle Enter key
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !loading) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <section className="chat-bot-root">
            <div className="chat-body">
                <div className="chat-conversation-outer">
                    <div className="chat-conversation-box">
                        <div
                            className="chat-box"
                            ref={chatBoxRef}
                            aria-live="polite"
                            aria-label="Chat messages"
                        >
                            {messages.map((msg, idx) => (
                                <MessageRow key={msg.id + idx} msg={msg} />
                            ))}
                            {loading && (
                                <div className="chat-message-row">
                                    <div className="chat-message bot">
                                        <span
                                            className="chat-avatar"
                                            role="img"
                                            aria-label="robot"
                                        >
                                            🤖
                                        </span>
                                        <span className="typing-indicator">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <form
                    className="chat-footer"
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!loading) sendMessage();
                    }}
                    aria-label="Send a message to Project Buddy"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me something about your project..."
                        aria-label="Type your message"
                        disabled={loading}
                        onKeyDown={handleKeyDown}
                        autoComplete="off"
                    />
                    <button type="submit" disabled={loading || !input.trim()}>
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </form>
                {error && (
                    <div className="chatbot-toast" role="alert">
                        {error}
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectBuddyBot;

// src/components/ProjectBuddyBot.tsx
import { useState } from 'react';

interface Message {
    sender: 'user' | 'bot';
    text: string;
}

const ProjectBuddyBot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const response = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: input }),
            });

            const data = await response.json();
            const botMessage: Message = {
                sender: 'bot',
                text: data.reply || 'Sorry, something went wrong.',
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages((prev) => [
                ...prev,
                { sender: 'bot', text: 'There was an error contacting Project Buddy.' },
            ]);
        } finally {
            setInput('');
            setLoading(false);
        }
    };

    return (
        <div className="bot-container">
            <h3>Ask Project Buddy</h3>
            <div className="chat-box">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender}`}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me something about your project..."
                    disabled={loading}
                />
                <button onClick={sendMessage} disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                </button>
            </div>
        </div>
    );
};

export default ProjectBuddyBot;

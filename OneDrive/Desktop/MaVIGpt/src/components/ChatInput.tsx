import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import './ChatInput.css';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    }, [message]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSendMessage(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="chat-input-container">
            <form onSubmit={handleSubmit} className="chat-input-form">
                <div className="input-wrapper">
                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Send a message..."
                        disabled={disabled}
                        className="chat-textarea"
                        rows={1}
                    />
                    <button
                        type="submit"
                        disabled={!message.trim() || disabled}
                        className="send-button"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </form>
            <p className="input-footer">
                MaViGpt can make mistakes. Check important info.
            </p>
        </div>
    );
};

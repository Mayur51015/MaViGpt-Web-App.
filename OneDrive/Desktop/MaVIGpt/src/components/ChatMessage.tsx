import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, User, Bot } from 'lucide-react';
import { Message } from '../types/types';
import './ChatMessage.css';

interface ChatMessageProps {
    message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const [copied, setCopied] = React.useState(false);

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={`message-wrapper ${message.role}`}>
            <div className="message-container">
                <div className="message-avatar">
                    {message.role === 'user' ? (
                        <User size={20} />
                    ) : (
                        <Bot size={20} />
                    )}
                </div>
                <div className="message-content">
                    <ReactMarkdown
                        components={{
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                const codeString = String(children).replace(/\n$/, '');

                                return !inline && match ? (
                                    <div className="code-block">
                                        <div className="code-header">
                                            <span className="code-language">{match[1]}</span>
                                            <button
                                                className="copy-button"
                                                onClick={() => copyCode(codeString)}
                                            >
                                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                                {copied ? 'Copied!' : 'Copy code'}
                                            </button>
                                        </div>
                                        <SyntaxHighlighter
                                            style={vscDarkPlus}
                                            language={match[1]}
                                            PreTag="div"
                                            {...props}
                                        >
                                            {codeString}
                                        </SyntaxHighlighter>
                                    </div>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

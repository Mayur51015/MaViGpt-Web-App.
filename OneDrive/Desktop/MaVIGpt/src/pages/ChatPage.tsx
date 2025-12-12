import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Sidebar } from '../components/Sidebar';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import { ShareModal } from '../components/ShareModal';
import { firestoreService } from '../services/firestore.service';
import { geminiService } from '../services/gemini.service';
import { Message, Conversation } from '../types/types';
import { Sparkles, Share2, UserPlus } from 'lucide-react';
import './ChatPage.css';

export const ChatPage: React.FC = () => {
    const { user } = useAuth();
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(280);
    const [showShareModal, setShowShareModal] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (user) {
            loadConversations();
        }
    }, [user]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Update CSS variable when sidebar width changes
    useEffect(() => {
        document.documentElement.style.setProperty('--sidebar-width', `${sidebarWidth}px`);
    }, [sidebarWidth]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const loadConversations = async () => {
        if (!user) return;
        const convos = await firestoreService.getConversations(user.uid);
        setConversations(convos);
    };

    const handleNewChat = () => {
        setCurrentConversationId(null);
        setMessages([]);
        setIsSidebarOpen(false);
    };

    const handleSelectConversation = async (conversationId: string) => {
        if (!user) return;
        const conversation = await firestoreService.getConversation(user.uid, conversationId);
        if (conversation) {
            setCurrentConversationId(conversation.id);
            setMessages(conversation.messages);
            setIsSidebarOpen(false);
        }
    };

    const handleDeleteConversation = async (conversationId: string) => {
        if (!user) return;
        await firestoreService.deleteConversation(user.uid, conversationId);
        if (conversationId === currentConversationId) {
            handleNewChat();
        }
        loadConversations();
    };

    const handleSendMessage = async (content: string) => {
        if (!user || isLoading) return;

        const userMessage: Message = {
            role: 'user',
            content,
            timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);

        try {
            // Convert messages to Gemini format
            const geminiMessages = messages.map((msg) => ({
                role: (msg.role === 'user' ? 'user' : 'model') as 'user' | 'model',
                parts: msg.content,
            }));

            let aiResponse = '';
            const aiMessage: Message = {
                role: 'assistant',
                content: '',
                timestamp: Date.now(),
            };

            // Add placeholder for AI message
            setMessages((prev) => [...prev, aiMessage]);

            // Stream the response
            await geminiService.sendMessageStream(
                geminiMessages,
                content,
                (chunk) => {
                    aiResponse += chunk;
                    setMessages((prev) => {
                        const newMessages = [...prev];
                        newMessages[newMessages.length - 1] = {
                            ...aiMessage,
                            content: aiResponse,
                        };
                        return newMessages;
                    });
                }
            );

            // Save conversation
            const updatedMessages = [
                ...messages,
                userMessage,
                { ...aiMessage, content: aiResponse },
            ];

            let conversationId = currentConversationId;

            if (!conversationId) {
                // Create new conversation
                const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
                conversationId = await firestoreService.createConversation(user.uid, title);
                setCurrentConversationId(conversationId);
            }

            await firestoreService.saveMessages(user.uid, conversationId, updatedMessages);
            loadConversations();
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prev) => [
                ...prev.slice(0, -1),
                {
                    role: 'assistant',
                    content: 'Sorry, I encountered an error. Please try again.',
                    timestamp: Date.now(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleShare = () => {
        if (!currentConversationId) {
            alert('Please start a conversation first');
            return;
        }
        setShowShareModal(true);
    };

    const getCurrentTitle = () => {
        if (!currentConversationId) return 'New Chat';
        const currentConvo = conversations.find(c => c.id === currentConversationId);
        return currentConvo?.title || 'Chat';
    };

    return (
        <div className="chat-page">
            <Sidebar
                conversations={conversations}
                currentConversationId={currentConversationId}
                onNewChat={handleNewChat}
                onSelectConversation={handleSelectConversation}
                onDeleteConversation={handleDeleteConversation}
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                onWidthChange={setSidebarWidth}
            />

            <div className="chat-main">
                {/* Header */}
                <div className="chat-header">
                    <h1 className="chat-title">{getCurrentTitle()}</h1>
                    <div className="chat-actions">
                        <button className="action-button" title="Share" onClick={handleShare}>
                            <Share2 size={18} />
                            <span>Share</span>
                        </button>
                        <button className="action-button" title="Add people">
                            <UserPlus size={18} />
                            <span>Add people</span>
                        </button>
                    </div>
                </div>

                <div className="messages-container">
                    {messages.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <Sparkles size={48} />
                            </div>
                            <h2>How can I help you today?</h2>
                            <p>Start a conversation with MaViGpt</p>
                        </div>
                    ) : (
                        <>
                            {messages.map((message, index) => (
                                <ChatMessage key={index} message={message} />
                            ))}
                            <div ref={messagesEndRef} />
                        </>
                    )}
                </div>

                <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
            </div>

            {/* Share Modal */}
            {user && currentConversationId && (
                <ShareModal
                    conversationId={currentConversationId}
                    ownerId={user.uid}
                    isOpen={showShareModal}
                    onClose={() => setShowShareModal(false)}
                />
            )}
        </div>
    );
};

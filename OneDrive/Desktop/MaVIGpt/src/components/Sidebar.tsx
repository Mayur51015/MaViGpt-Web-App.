import React from 'react';
import { PlusCircle, MessageSquare, Trash2, LogOut, Menu, X, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import { Conversation } from '../types/types';
import './Sidebar.css';

interface SidebarProps {
    conversations: Conversation[];
    currentConversationId: string | null;
    onNewChat: () => void;
    onSelectConversation: (id: string) => void;
    onDeleteConversation: (id: string) => void;
    isOpen: boolean;
    onToggle: () => void;
    onWidthChange?: (width: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    conversations,
    currentConversationId,
    onNewChat,
    onSelectConversation,
    onDeleteConversation,
    isOpen,
    onToggle,
    onWidthChange,
}) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [sidebarWidth, setSidebarWidth] = React.useState(280);
    const [isResizing, setIsResizing] = React.useState(false);

    // Notify parent when width changes
    React.useEffect(() => {
        onWidthChange?.(sidebarWidth);
    }, [sidebarWidth, onWidthChange]);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const startResizing = React.useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = React.useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = React.useCallback(
        (mouseMoveEvent: MouseEvent) => {
            if (isResizing) {
                const newWidth = mouseMoveEvent.clientX;
                if (newWidth >= 200 && newWidth <= 400) {
                    setSidebarWidth(newWidth);
                }
            }
        },
        [isResizing]
    );

    React.useEffect(() => {
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResizing);
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [resize, stopResizing]);

    return (
        <>
            <button className="sidebar-toggle" onClick={onToggle}>
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div
                className={`sidebar ${isOpen ? 'open' : ''}`}
                style={{ width: `${sidebarWidth}px` }}
            >
                <div className="sidebar-header">
                    <button className="new-chat-button" onClick={onNewChat}>
                        <PlusCircle size={20} />
                        New chat
                    </button>
                </div>

                <div className="conversations-list">
                    {conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            className={`conversation-item ${conversation.id === currentConversationId ? 'active' : ''
                                }`}
                            onClick={() => onSelectConversation(conversation.id)}
                        >
                            <MessageSquare size={18} />
                            <span className="conversation-title">{conversation.title}</span>
                            <button
                                className="delete-button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteConversation(conversation.id);
                                }}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="sidebar-footer">
                    <div className="sidebar-actions">
                        <ThemeToggle />
                        <button className="profile-button" onClick={handleProfileClick} title="Edit Profile">
                            <UserCircle size={20} />
                        </button>
                    </div>
                    <div className="user-info">
                        <div className="user-avatar">
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="Profile" />
                            ) : (
                                user?.email?.[0].toUpperCase() || 'U'
                            )}
                        </div>
                        <div className="user-details">
                            <div className="user-name">{user?.displayName || 'User'}</div>
                            <div className="user-email">{user?.email}</div>
                        </div>
                    </div>
                    <button className="logout-button" onClick={handleLogout}>
                        <LogOut size={18} />
                        Sign out
                    </button>
                </div>

                <div
                    className="sidebar-resize-handle"
                    onMouseDown={startResizing}
                />
            </div>

            {isOpen && <div className="sidebar-overlay" onClick={onToggle} />}
        </>
    );
};

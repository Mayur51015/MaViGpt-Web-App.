import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Link as LinkIcon } from 'lucide-react';
import { shareService } from '../services/share.service';
import './ShareModal.css';

interface ShareModalProps {
    conversationId: string;
    ownerId: string;
    isOpen: boolean;
    onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
    conversationId,
    ownerId,
    isOpen,
    onClose,
}) => {
    const [shareUrl, setShareUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            generateShareLink();
        }
    }, [isOpen, conversationId]);

    const generateShareLink = async () => {
        setIsLoading(true);
        setError('');

        try {
            const shareId = await shareService.createShareLink(conversationId, ownerId);
            const url = shareService.getShareUrl(shareId);
            setShareUrl(url);
        } catch (err: any) {
            console.error('Error creating share link:', err);
            setError('Failed to create share link. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="modal-title">
                        <LinkIcon size={20} />
                        <h2>Share Conversation</h2>
                    </div>
                    <button className="modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    {isLoading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Generating share link...</p>
                        </div>
                    ) : error ? (
                        <div className="error-state">
                            <p>{error}</p>
                            <button onClick={generateShareLink} className="retry-button">
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <>
                            <p className="share-description">
                                Anyone with this link can view this conversation (read-only).
                            </p>

                            <div className="share-link-container">
                                <input
                                    type="text"
                                    value={shareUrl}
                                    readOnly
                                    className="share-link-input"
                                />
                                <button
                                    onClick={copyToClipboard}
                                    className="copy-button"
                                >
                                    {copied ? (
                                        <>
                                            <Check size={18} />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy size={18} />
                                            Copy
                                        </>
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

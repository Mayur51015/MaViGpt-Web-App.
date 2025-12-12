import { db } from '../config/firebase.config';
import { collection, doc, setDoc, getDoc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { ShareLink } from '../types/types';

class ShareService {
    /**
     * Create a shareable link for a conversation
     */
    async createShareLink(conversationId: string, ownerId: string, expiresInDays?: number): Promise<string> {
        const shareId = this.generateShareId();
        const now = Date.now();
        const expiresAt = expiresInDays ? now + (expiresInDays * 24 * 60 * 60 * 1000) : null;

        const shareData: ShareLink = {
            id: shareId,
            conversationId,
            ownerId,
            createdAt: now,
            expiresAt,
            viewCount: 0,
        };

        await setDoc(doc(db, 'shares', shareId), shareData);
        return shareId;
    }

    /**
     * Get shared conversation data
     */
    async getSharedConversation(shareId: string): Promise<ShareLink | null> {
        const shareDoc = await getDoc(doc(db, 'shares', shareId));

        if (!shareDoc.exists()) {
            return null;
        }

        const shareData = shareDoc.data() as ShareLink;

        // Check if link has expired
        if (shareData.expiresAt && shareData.expiresAt < Date.now()) {
            return null;
        }

        // Increment view count
        await updateDoc(doc(db, 'shares', shareId), {
            viewCount: increment(1),
        });

        return shareData;
    }

    /**
     * Delete a share link
     */
    async deleteShareLink(shareId: string): Promise<void> {
        await deleteDoc(doc(db, 'shares', shareId));
    }

    /**
     * Get all share links for a conversation
     */
    async getShareLinksForConversation(conversationId: string): Promise<ShareLink[]> {
        // This would require a query - implement if needed
        return [];
    }

    /**
     * Generate a unique share ID
     */
    private generateShareId(): string {
        return `share_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Generate full shareable URL
     */
    getShareUrl(shareId: string): string {
        const baseUrl = window.location.origin;
        return `${baseUrl}/shared/${shareId}`;
    }
}

export const shareService = new ShareService();

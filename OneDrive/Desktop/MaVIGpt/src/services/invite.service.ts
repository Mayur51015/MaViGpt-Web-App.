import { db } from '../config/firebase.config';
import { collection, doc, setDoc, getDoc, query, where, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { Invite } from '../types/types';

class InviteService {
    /**
     * Send an invitation to collaborate on a conversation
     */
    async sendInvite(
        conversationId: string,
        conversationTitle: string,
        email: string,
        invitedBy: string,
        invitedByName: string,
        permission: 'editor' | 'viewer'
    ): Promise<string> {
        const inviteId = this.generateInviteId();

        const inviteData: Invite = {
            id: inviteId,
            conversationId,
            conversationTitle,
            email: email.toLowerCase(),
            invitedBy,
            invitedByName,
            invitedAt: Date.now(),
            status: 'pending',
            permission,
        };

        await setDoc(doc(db, 'invites', inviteId), inviteData);
        return inviteId;
    }

    /**
     * Get pending invites for a user's email
     */
    async getPendingInvites(email: string): Promise<Invite[]> {
        const q = query(
            collection(db, 'invites'),
            where('email', '==', email.toLowerCase()),
            where('status', '==', 'pending')
        );

        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => doc.data() as Invite);
    }

    /**
     * Accept an invitation
     */
    async acceptInvite(inviteId: string, userId: string): Promise<void> {
        const inviteDoc = await getDoc(doc(db, 'invites', inviteId));

        if (!inviteDoc.exists()) {
            throw new Error('Invite not found');
        }

        const invite = inviteDoc.data() as Invite;

        // Update invite status
        await updateDoc(doc(db, 'invites', inviteId), {
            status: 'accepted',
        });

        // Add user to conversation participants
        // This will be handled by the conversation service
        return;
    }

    /**
     * Decline an invitation
     */
    async declineInvite(inviteId: string): Promise<void> {
        await updateDoc(doc(db, 'invites', inviteId), {
            status: 'declined',
        });
    }

    /**
     * Delete an invitation
     */
    async deleteInvite(inviteId: string): Promise<void> {
        await deleteDoc(doc(db, 'invites', inviteId));
    }

    /**
     * Generate a unique invite ID
     */
    private generateInviteId(): string {
        return `invite_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
}

export const inviteService = new InviteService();

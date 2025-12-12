import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    getDoc,
    query,
    orderBy,
    serverTimestamp,
    Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { Conversation, Message } from '../types/types';

export const firestoreService = {
    // Create a new conversation
    async createConversation(userId: string, title: string): Promise<string> {
        try {
            const conversationRef = await addDoc(
                collection(db, 'users', userId, 'conversations'),
                {
                    title,
                    messages: [],
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                }
            );
            return conversationRef.id;
        } catch (error) {
            console.error('Error creating conversation:', error);
            throw new Error('Failed to create conversation');
        }
    },

    // Save messages to a conversation
    async saveMessages(
        userId: string,
        conversationId: string,
        messages: Message[]
    ): Promise<void> {
        try {
            const conversationRef = doc(
                db,
                'users',
                userId,
                'conversations',
                conversationId
            );
            await updateDoc(conversationRef, {
                messages,
                updatedAt: serverTimestamp(),
            });
        } catch (error) {
            console.error('Error saving messages:', error);
            throw new Error('Failed to save messages');
        }
    },

    // Get all conversations for a user
    async getConversations(userId: string): Promise<Conversation[]> {
        try {
            const conversationsRef = collection(db, 'users', userId, 'conversations');
            const q = query(conversationsRef, orderBy('updatedAt', 'desc'));
            const querySnapshot = await getDocs(q);

            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    title: data.title,
                    messages: data.messages || [],
                    createdAt: (data.createdAt as Timestamp)?.toMillis() || Date.now(),
                    updatedAt: (data.updatedAt as Timestamp)?.toMillis() || Date.now(),
                };
            });
        } catch (error) {
            console.error('Error getting conversations:', error);
            return [];
        }
    },

    // Get a single conversation
    async getConversation(
        userId: string,
        conversationId: string
    ): Promise<Conversation | null> {
        try {
            const conversationRef = doc(
                db,
                'users',
                userId,
                'conversations',
                conversationId
            );
            const conversationSnap = await getDoc(conversationRef);

            if (conversationSnap.exists()) {
                const data = conversationSnap.data();
                return {
                    id: conversationSnap.id,
                    title: data.title,
                    messages: data.messages || [],
                    createdAt: (data.createdAt as Timestamp)?.toMillis() || Date.now(),
                    updatedAt: (data.updatedAt as Timestamp)?.toMillis() || Date.now(),
                };
            }
            return null;
        } catch (error) {
            console.error('Error getting conversation:', error);
            return null;
        }
    },

    // Delete a conversation
    async deleteConversation(
        userId: string,
        conversationId: string
    ): Promise<void> {
        try {
            const conversationRef = doc(
                db,
                'users',
                userId,
                'conversations',
                conversationId
            );
            await deleteDoc(conversationRef);
        } catch (error) {
            console.error('Error deleting conversation:', error);
            throw new Error('Failed to delete conversation');
        }
    },

    // Update conversation title
    async updateConversationTitle(
        userId: string,
        conversationId: string,
        title: string
    ): Promise<void> {
        try {
            const conversationRef = doc(
                db,
                'users',
                userId,
                'conversations',
                conversationId
            );
            await updateDoc(conversationRef, {
                title,
                updatedAt: serverTimestamp(),
            });
        } catch (error) {
            console.error('Error updating conversation title:', error);
            throw new Error('Failed to update conversation title');
        }
    },
};

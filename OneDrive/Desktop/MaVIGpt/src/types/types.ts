export interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

export interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    createdAt: number;
    updatedAt: number;
    owner: string;
    participants?: string[];
    permissions?: {
        [userId: string]: 'owner' | 'editor' | 'viewer';
    };
}

export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    bio?: string | null;
}

export interface ProfileData {
    displayName: string;
    photoURL: string | null;
    bio: string;
}

export interface ShareLink {
    id: string;
    conversationId: string;
    ownerId: string;
    createdAt: number;
    expiresAt: number | null;
    viewCount: number;
}

export interface Invite {
    id: string;
    conversationId: string;
    conversationTitle: string;
    email: string;
    invitedBy: string;
    invitedByName: string;
    invitedAt: number;
    status: 'pending' | 'accepted' | 'declined';
    permission: 'editor' | 'viewer';
}

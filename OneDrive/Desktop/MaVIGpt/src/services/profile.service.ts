import { updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../config/firebase.config';
import { ProfileData } from '../types/types';

export const profileService = {
    // Upload profile picture to Firebase Storage
    async uploadProfilePicture(userId: string, file: File): Promise<string> {
        try {
            console.log('Uploading profile picture for user:', userId);
            const timestamp = Date.now();
            const fileName = `${timestamp}_${file.name}`;
            const storageRef = ref(storage, `profile-pictures/${userId}/${fileName}`);

            console.log('Uploading to path:', `profile-pictures/${userId}/${fileName}`);
            await uploadBytes(storageRef, file);

            console.log('Getting download URL...');
            const downloadURL = await getDownloadURL(storageRef);
            console.log('Upload successful, URL:', downloadURL);

            return downloadURL;
        } catch (error: any) {
            console.error('Error uploading profile picture:', error);
            if (error.code === 'storage/unauthorized') {
                throw new Error('Storage permission denied. Please check Firebase Storage rules.');
            }
            throw new Error(error.message || 'Failed to upload profile picture');
        }
    },

    // Update user profile in Firebase Auth and Firestore
    async updateUserProfile(userId: string, profileData: ProfileData): Promise<void> {
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('No authenticated user');
            }

            console.log('Updating profile for user:', userId);
            console.log('Profile data:', profileData);

            // Update Firebase Auth profile
            console.log('Updating Firebase Auth profile...');
            await updateProfile(user, {
                displayName: profileData.displayName,
                photoURL: profileData.photoURL,
            });
            console.log('Firebase Auth profile updated');

            // Update Firestore profile data
            console.log('Updating Firestore profile...');
            const userDocRef = doc(db, 'users', userId);
            await setDoc(
                userDocRef,
                {
                    displayName: profileData.displayName,
                    photoURL: profileData.photoURL,
                    bio: profileData.bio,
                    updatedAt: new Date().toISOString(),
                },
                { merge: true }
            );
            console.log('Firestore profile updated');
        } catch (error: any) {
            console.error('Error updating profile:', error);
            if (error.code === 'permission-denied') {
                throw new Error('Firestore permission denied. Please check Firestore rules.');
            }
            throw new Error(error.message || 'Failed to update profile');
        }
    },

    // Get user profile data from Firestore
    async getUserProfile(userId: string): Promise<ProfileData | null> {
        try {
            const userDocRef = doc(db, 'users', userId);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const data = userDoc.data();
                return {
                    displayName: data.displayName || '',
                    photoURL: data.photoURL || null,
                    bio: data.bio || '',
                };
            }
            return null;
        } catch (error) {
            console.error('Error getting profile:', error);
            return null;
        }
    },
};

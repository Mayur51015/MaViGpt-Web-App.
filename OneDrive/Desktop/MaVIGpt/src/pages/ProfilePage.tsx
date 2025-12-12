import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Camera, Save, X, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { profileService } from '../services/profile.service';
import './ProfilePage.css';

export const ProfilePage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [profilePicPreview, setProfilePicPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        displayName: '',
        bio: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                displayName: user.displayName || '',
                bio: user.bio || '',
            });
            setProfilePicPreview(user.photoURL);
        }
    }, [user]);

    // Fetch profile data from Firestore on mount
    useEffect(() => {
        const loadProfileData = async () => {
            if (user) {
                console.log('Loading profile data for user:', user.uid);
                const profileData = await profileService.getUserProfile(user.uid);
                console.log('Profile data from Firestore:', profileData);
                if (profileData) {
                    setFormData({
                        displayName: profileData.displayName || user.displayName || '',
                        bio: profileData.bio || '',
                    });
                    console.log('Updated form data with bio:', profileData.bio);
                    if (profileData.photoURL) {
                        setProfilePicPreview(profileData.photoURL);
                    }
                }
            }
        };
        loadProfileData();
    }, [user]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError('Image size should be less than 5MB');
                return;
            }
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            let photoURL = user.photoURL;

            // Only upload new profile picture if a file was selected
            if (selectedFile) {
                try {
                    console.log('Uploading new profile picture...');
                    photoURL = await profileService.uploadProfilePicture(user.uid, selectedFile);
                    console.log('Profile picture uploaded successfully');
                } catch (uploadError: any) {
                    console.error('Image upload failed:', uploadError);
                    // Show error but continue to save other profile data
                    setError('Profile picture upload failed (Storage not configured). Saving other profile data...');
                    // Continue with existing photoURL - don't throw error
                }
            }

            // Update profile with or without new image
            console.log('Updating user profile...');
            await profileService.updateUserProfile(user.uid, {
                displayName: formData.displayName,
                photoURL,
                bio: formData.bio,
            });

            console.log('Profile updated successfully');
            setSuccess('Profile updated successfully! Redirecting to chat...');

            // Wait a bit before navigating to show success message
            setTimeout(() => {
                navigate('/chat');
            }, 1500);
        } catch (err: any) {
            console.error('Profile update error:', err);
            setError(err.message || 'Failed to update profile. Please check the console for details.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/chat');
    };

    if (!user) {
        return null;
    }

    return (
        <div className="profile-page">
            <div className="profile-container">
                <div className="profile-header">
                    <button className="back-button" onClick={handleCancel}>
                        <ArrowLeft size={20} />
                        Back to Chat
                    </button>
                    <h1>Edit Profile</h1>
                    <p>Update your personal information</p>
                </div>

                <form onSubmit={handleSubmit} className="profile-form">
                    {/* Profile Picture */}
                    <div className="profile-picture-section">
                        <div className="profile-picture-wrapper">
                            {profilePicPreview ? (
                                <img src={profilePicPreview} alt="Profile" className="profile-picture" />
                            ) : (
                                <div className="profile-picture-placeholder">
                                    <User size={48} />
                                </div>
                            )}
                            <label htmlFor="profile-pic-input" className="change-picture-btn">
                                <Camera size={20} />
                            </label>
                            <input
                                id="profile-pic-input"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <p className="profile-picture-hint">Click the camera icon to change your profile picture</p>
                    </div>

                    {/* Display Name */}
                    <div className="form-group">
                        <label htmlFor="displayName">Display Name</label>
                        <input
                            id="displayName"
                            type="text"
                            value={formData.displayName}
                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email (Read-only) */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={user.email || ''}
                            disabled
                            className="disabled-input"
                        />
                    </div>

                    {/* Bio */}
                    <div className="form-group">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            id="bio"
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            placeholder="Tell us about yourself..."
                            rows={4}
                        />
                    </div>

                    {/* Error/Success Messages */}
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}

                    {/* Action Buttons */}
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn-cancel"
                            disabled={loading}
                        >
                            <X size={20} />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-save"
                            disabled={loading}
                        >
                            <Save size={20} />
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

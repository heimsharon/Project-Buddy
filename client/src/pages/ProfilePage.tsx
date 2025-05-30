import React, { useEffect, useState } from 'react';
import '../assets/styles/profile.css';
import ProfileUpdates from '../components/profile/ProfileUpdates';
import { UserData } from '../types/user';

const ProfilePage: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [editMode, setEditMode] = useState(false);

    // Mock fetch user data on mount
    useEffect(() => {
        setUserData({
            id: '1',
            username: 'johndoe',
            email: 'johndoe@example.com',
            avatar: null,
        });
    }, []);

    // Handlers for updating fields
    const handleEmailChange = (email: string) => {
        setUserData((prev) => (prev ? { ...prev, email } : prev));
    };

    const handlePasswordChange = (password: string) => {
        // Implement password update logic here
        // For demo, just log
        console.log('Password updated:', password);
    };

    const handleAvatarChange = (avatar: string | null) => {
        setUserData((prev) => (prev ? { ...prev, avatar } : prev));
    };

    const handleCancel = () => {
        setEditMode(false);
        // Reset userData to original state if needed
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <main className="account-background">
            <h1>Profile Management</h1>
            <p>Update your name, avatar, email, or password here.</p>
            <div className="account-container">
                <h4 className="card-header">Profile</h4>
                <div className="profile">
                    {!editMode ? (
                        <div className="form-input">
                            <p>
                                <strong>Username:</strong> {userData.username}
                            </p>
                            <p>
                                <strong>Email:</strong> {userData.email}
                            </p>
                            <button
                                className="btn"
                                onClick={() => setEditMode(true)}
                            >
                                Edit
                            </button>
                        </div>
                    ) : (
                        <div>
                            <ProfileUpdates
                                email={userData.email || ''}
                                avatar={userData.avatar || null}
                                onEmailChange={handleEmailChange}
                                onPasswordChange={handlePasswordChange}
                                onAvatarChange={handleAvatarChange}
                            />
                            <div className="button-group">
                                <button
                                    className="btn"
                                    type="button"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;

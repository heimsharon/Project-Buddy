import React, { useEffect, useState } from 'react';
import { UserData } from '../types/user';

const AccountPage: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [editMode, setEditMode] = useState(false);
    const [updateUser, setUpdateUser] = useState<Partial<UserData>>({});

    useEffect(() => {
        // Fetch user data from the server or context
        setTimeout(() => {
            setUserData({
                id: '123',
                username: 'john_doe',
                email: 'john_doe@example.com',
                avatar: 'https://example.com/avatar.jpg',
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }, 1000);
    }, []);

    const handleEditClick = () => {
        setEditMode(true);
        if (userData) {
            setUpdateUser({
                username: userData.username,
                email: userData.email,
                avatar: userData.avatar,
            });
        }
    };

    const handleCancelClick = () => {
        setEditMode(false);
        setUpdateUser({});
    };

    const handleSaveClick = () => {
        if (userData) {
            setUserData({
                ...userData,
                ...updateUser,
                updatedAt: new Date(),
            });
            setEditMode(false);
            setUpdateUser({});
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdateUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUpdateUser((prev) => ({
                    ...prev,
                    avatar: reader.result as string,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    const { username, email, avatar } = userData;

    return (
        <div>
            <h1>Account Management</h1>
            <p>Update your name, avatar, or email here.</p>
            {!editMode ? (
                <div>
                    <img src={avatar || ''} alt="avatar" width={80} />
                    <p>
                        <strong>Username:</strong> {username}
                    </p>
                    <p>
                        <strong>Email:</strong> {email}
                    </p>
                    <button onClick={handleEditClick}>Edit</button>
                </div>
            ) : (
                <div>
                    <input
                        type="text"
                        name="username"
                        value={updateUser.username || ''}
                        onChange={handleInputChange}
                        placeholder="Username"
                    />
                    <input
                        type="email"
                        name="email"
                        value={updateUser.email || ''}
                        onChange={handleInputChange}
                        placeholder="Email"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                    />
                    {updateUser.avatar && (
                        <img
                            src={updateUser.avatar}
                            alt="avatar preview"
                            width={80}
                        />
                    )}
                    <div>
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={handleCancelClick}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountPage;

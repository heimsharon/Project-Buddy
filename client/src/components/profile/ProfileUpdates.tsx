import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ProfileUpdateProps {
    email: string;
    avatar: string | null;
    onEmailChange: (email: string) => void;
    onPasswordChange: (password: string) => void;
    onAvatarChange: (avatar: string | null) => void;
}

const ProfileUpdates: React.FC<ProfileUpdateProps> = ({
    email,
    avatar,
    onEmailChange,
    onPasswordChange,
    onAvatarChange,
}) => {
    const [newEmail, setNewEmail] = useState(email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailSubmit = (e: FormEvent) => {
        e.preventDefault();
        onEmailChange(newEmail);
    };

    const handlePasswordSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (password === confirmPassword) {
            onPasswordChange(password);
            setPassword('');
            setConfirmPassword('');
        } else {
            alert('Passwords do not match');
        }
    };

    const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                onAvatarChange(result); // This updates userData.avatar in ProfilePage
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAvatarSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (avatar) {
            onAvatarChange(avatar);
        } else {
            alert('Please select an avatar image');
        }
    };

    return (
        <div className="profile-updates">
            <h2>Update Profile</h2>
            <form onSubmit={handleEmailSubmit} className="form-input">
                <label htmlFor="email">Update Email</label>
                <input
                    type="email"
                    id="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                <button className="btn" type="submit">
                    Update Email
                </button>
            </form>
            <form onSubmit={handlePasswordSubmit} className="form-input">
                <label htmlFor="password">New Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button className="btn" type="submit">
                    Update Password
                </button>
            </form>
            <form onSubmit={handleAvatarSubmit} className="form-input">
                <label htmlFor="avatar">Update Avatar</label>
                <div className="avatar-upload">
                    <img
                        src={avatar || '/default-avatar.png'}
                        alt="User avatar"
                        className="avatar-preview"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="avatar-input"
                    />
                    <p className="avatar-instructions">
                        Upload a new avatar image (PNG, JPG, or GIF).
                    </p>
                </div>
                <button className="btn" type="submit">
                    Update Avatar
                </button>
            </form>
        </div>
    );
};

export default ProfileUpdates;

import React, { useState, ChangeEvent, FormEvent } from 'react';

interface ProfileUpdateProps {
  email: string;
  avatar: string | null;
  onEmailChange: (email: string, password: string) => void;
  onPasswordChange: (password: string) => void;
  onAvatarChange: (avatar: string | null, password: string) => void;
}

const ProfileUpdates: React.FC<ProfileUpdateProps> = ({
  email,
  avatar,
  onEmailChange,
  onPasswordChange,
  onAvatarChange,
}) => {
  const [newEmail, setNewEmail] = useState(email);
  const [emailPassword, setEmailPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarPassword, setAvatarPassword] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(avatar);

  const handleEmailSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!emailPassword) {
      alert('Please enter your password to update your email.');
      return;
    }
    onEmailChange(newEmail, emailPassword);
    setEmailPassword('');
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
        setSelectedAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedAvatar) {
      alert('Please select an avatar image.');
      return;
    }
    if (!avatarPassword) {
      alert('Please enter your password to update your avatar.');
      return;
    }
    onAvatarChange(selectedAvatar, avatarPassword);
    setAvatarPassword('');
  };

  return (
    <div className="profile-updates">
      <h2>Update Profile</h2>

      {/* Email Update Form */}
      <form onSubmit={handleEmailSubmit} className="form-input">
        <label htmlFor="email">Update Email</label>
        <input
          type="email"
          id="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <label htmlFor="emailPassword">Password (required to confirm)</label>
        <input
          type="password"
          id="emailPassword"
          value={emailPassword}
          onChange={(e) => setEmailPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit">
          Update Email
        </button>
      </form>

      {/* Password Update Form */}
      <form onSubmit={handlePasswordSubmit} className="form-input">
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit">
          Update Password
        </button>
      </form>

      {/* Avatar Update Form */}
      <form onSubmit={handleAvatarSubmit} className="form-input">
        <label htmlFor="avatar">Update Avatar</label>
        <div className="avatar-upload">
          <img
            src={selectedAvatar || '/default-avatar.png'}
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
        <label htmlFor="avatarPassword">Password (required to confirm)</label>
        <input
          type="password"
          id="avatarPassword"
          value={avatarPassword}
          onChange={(e) => setAvatarPassword(e.target.value)}
          required
        />
        <button className="btn" type="submit">
          Update Avatar
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdates;

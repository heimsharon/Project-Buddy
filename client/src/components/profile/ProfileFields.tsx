import React from 'react';

interface ProfileFieldsProps {
    username: string;
    email: string;
    skills?: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileFields: React.FC<ProfileFieldsProps> = ({
    username,
    email,
    skills = [],
    onChange,
}) => (
    <div className="profile-fields">
        <input
            type="text"
            name="username"
            value={username}
            onChange={onChange}
            placeholder="Username"
            autoComplete="username"
        />
        <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter new email"
            autoComplete="email"
        />
        <input
            type="text"
            name="skills"
            value={skills?.join(', ') || ''}
            onChange={onChange}
            placeholder="Skills (comma separated)"
        />
    </div>
);

export default ProfileFields;

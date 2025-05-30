import React from 'react';

interface AvatarProps {
    src?: string | null;
    alt?: string;
    className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
    src,
    alt = 'User avatar',
    className = 'avatar-img',
}) => (
    <img src={src || '/default-avatar.png'} alt={alt} className={className} />
);

export default Avatar;

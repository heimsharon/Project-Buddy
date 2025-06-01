import React from 'react';
interface ProjectCardProps {
    id: string;
    name: string;
    budget: number;
    status: 'planning' | 'in-progress' | 'completed' | 'not-started';
    onClick?: (id: string) => void;
}

export default function ProjectCard({
    id,
    name,
    budget,
    status,
    onClick,
}: ProjectCardProps) {
    return (
        <div className={`project-card ${status}`} onClick={() => onClick?.(id)}>
            <h3>{name}</h3>
            <p>Budget: ${budget.toFixed(2)}</p>
            <span className="status-badge">{status}</span>
        </div>
    );
}

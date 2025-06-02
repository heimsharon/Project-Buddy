import React from 'react';

interface ProjectCardProps {
    id: string;
    name: string;
    estimatedBudget: number;
    status: 'planning' | 'in-progress' | 'completed' | 'not-started';
    description?: string;
    type?: string;
    dueDate?: string;
    onClick?: (id: string) => void;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export default function ProjectCard({
    id,
    name,
    estimatedBudget,
    status,
    description,
    type,
    dueDate,
    onClick,
    onEdit,
    onDelete,
}: ProjectCardProps) {
    return (
        <div
            className="project-card"
            onClick={() => onClick?.(id)}
            tabIndex={0}
            role="button"
            title="View project details"
        >
            <button
                className="project-delete-btn"
                title="Delete Project"
                onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(id);
                }}
            >
                ×
            </button>
            <h3>{name}</h3>
            <div className="project-budget">
                <strong>Budget:</strong> ${estimatedBudget}
            </div>
            {description && (
                <div className="project-description">
                    <strong>Description:</strong> {description}
                </div>
            )}
            {type && (
                <div className="project-type">
                    <strong>Type:</strong> {type}
                </div>
            )}
            {dueDate && (
                <div className="project-due-date">
                    <strong>Due:</strong>{' '}
                    {new Date(dueDate).toLocaleDateString()}
                </div>
            )}
            <span className={`status-badge status-${status}`}>{status}</span>
            {status === 'planning' && (
                <button
                    className="project-edit-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit?.(id);
                    }}
                    title="Edit Project"
                >
                    ✏️ Edit
                </button>
            )}
        </div>
    );
}

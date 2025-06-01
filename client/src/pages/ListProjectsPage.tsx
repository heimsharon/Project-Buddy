import React, { useEffect, useState } from 'react';

interface Material {
    id: string;
    name: string;
    quantity: number;
    unit: 'sqft' | 'pieces' | 'gallons';
    cost: number;
}

interface ProjectData {
    name: string;
    description: string;
    budget: number;
    materials: Material[];
    tasks?: any[];
}

export default function ListProjectsPage() {
    const [projects, setProjects] = useState<ProjectData[]>([]);

    useEffect(() => {
        const savedProjects = JSON.parse(
            localStorage.getItem('projects') || '[]'
        );
        setProjects(savedProjects);
    }, []);

    const handleDelete = (indexToRemove: number) => {
        const updatedProjects = projects.filter(
            (_, index) => index !== indexToRemove
        );
        setProjects(updatedProjects);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
    };

    return (
        <div>
            <h2>Projects List</h2>
            {projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                <ul>
                    {projects.map((project, idx) => (
                        <li key={idx}>
                            <strong>{project.name}</strong>:{' '}
                            {project.description} (Budget: ${project.budget})
                            <button onClick={() => handleDelete(idx)}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

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

export default function ProjectListPage() {
    const [projects, setProjects] = useState<ProjectData[]>([]);

    useEffect(() => {
        const savedProjects = JSON.parse(localStorage.getItem('projects') || '[]');
        setProjects(savedProjects);
    }, []);

    const handleDelete = (indexToRemove: number) => {
        const updatedProjects = projects.filter((_, index) => index !== indexToRemove);
        setProjects(updatedProjects);
        localStorage.setItem('projects', JSON.stringify(updatedProjects));
    };

    return (
        <div className="project-list-page">
            <h1>Project List</h1>
            {projects.length === 0 ? (
                <p>No projects found.</p>
            ) : (
                <ul>
                    {projects.map((project, index) => (
                        <li key={index} style={{ marginBottom: '1.5rem' }}>
                            <h2>{project.name}</h2>
                            <p>{project.description}</p>
                            <p><strong>Budget:</strong> ${project.budget}</p>
                            <h4>Materials:</h4>
                            <ul>
                                {project.materials.map((mat) => (
                                    <li key={mat.id}>
                                        {mat.name} - {mat.quantity} {mat.unit} (${mat.cost})
                                    </li>
                                ))}
                            </ul>
                            <button
                                style={{ marginTop: '0.5rem', backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px' }}
                                onClick={() => handleDelete(index)}
                            >
                                Delete Project
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
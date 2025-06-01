import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import '../assets/styles/projectlist.css';

// Example user ID fetch (replace with your auth/user context as needed)
const getCurrentUserId = () => localStorage.getItem('userId') || 'demo-user';

interface Material {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    cost: number;
    [key: string]: any;
}

interface ProjectData {
    name: string;
    description: string;
    type?: string;
    plannedBudget: string;
    dueDate?: string;
    dimensions: string;
    materials: Material[];
    id?: string;
    userId?: string;
    status?: 'planning' | 'in-progress' | 'completed' | 'not-started';
    tasks?: any[];
}

const BLANK_EXAMPLE: ProjectData = {
    name: 'Example Project',
    description: 'This is a sample project. Create your own to get started!',
    plannedBudget: '1000',
    materials: [
        {
            id: 'mat-1',
            name: 'Plywood',
            quantity: 10,
            unit: 'pieces',
            cost: 25,
        },
    ],
    status: 'planning',
    tasks: [],
    dimensions: ''
};

export default function ListProjectsPage() {
    const [projects, setProjects] = useState<ProjectData[]>([]);
    const userId = getCurrentUserId();

    useEffect(() => {
        // Fetch projects from localStorage and filter by userId
        const savedProjects: ProjectData[] = JSON.parse(
            localStorage.getItem('projects') || '[]'
        );
        const userProjects = savedProjects.filter(
            (proj) => proj.userId === userId
        );
        setProjects(userProjects);
    }, [userId]);

    const handleDelete = (indexToRemove: number) => {
        const updatedProjects = projects.filter(
            (_, index) => index !== indexToRemove
        );
        setProjects(updatedProjects);

        // Also update localStorage (remove only for this user)
        const allProjects: ProjectData[] = JSON.parse(
            localStorage.getItem('projects') || '[]'
        );
        const filteredAll = allProjects.filter(
            (proj) =>
                !(
                    proj.userId === userId &&
                    projects.indexOf(proj) === indexToRemove
                )
        );
        localStorage.setItem('projects', JSON.stringify(filteredAll));
    };

    return (
        <div className="project-list-background">
            <h1 className="page-title">Your Projects</h1>
            <p className="page-description">
                Here you can view and manage your projects.
            </p>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Projects List
            </h2>
            {projects.length === 0 ? (
                <div
                    style={{
                        border: '2px dashed #bbb',
                        borderRadius: 12,
                        padding: '2rem',
                        textAlign: 'center',
                        color: '#888',
                        background: '#f9f9fb',
                    }}
                >
                    <h3>No projects found</h3>
                    <p>Here’s an example project to get you started:</p>
                    <div style={{ maxWidth: 320, margin: '1.5rem auto' }}>
                        <ProjectCard
                            id="example"
                            name={BLANK_EXAMPLE.name}
                            budget={Number(BLANK_EXAMPLE.plannedBudget)}
                            status={BLANK_EXAMPLE.status || 'planning'}
                        />
                    </div>
                    <p>Create a new project to see it listed here!</p>
                </div>
            ) : (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '1.5rem',
                    }}
                >
                    {projects.map((project, idx) => (
                        <div
                            key={project.id || idx}
                            style={{ position: 'relative' }}
                        >
                            <ProjectCard
                                id={project.id || idx.toString()}
                                name={project.name}
                                budget={Number(project.plannedBudget)}
                                status={project.status || 'planning'}
                            />
                            <button
                                onClick={() => handleDelete(idx)}
                                style={{
                                    position: 'absolute',
                                    top: 12,
                                    right: 12,
                                    background: '#e74c3c',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: 28,
                                    height: 28,
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                                }}
                                title="Delete Project"
                                aria-label="Delete Project"
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
}

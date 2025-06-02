import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // <-- Add this
import { QUERY_PROJECTS_BY_USER } from '../utils/queries';
import { DELETE_PROJECT } from '../utils/mutations';
import ProjectCard from '../components/projects/ProjectCard';
import '../assets/styles/projectlist.css';

const BLANK_EXAMPLE = {
    name: 'Example Project',
    plannedBudget: '1000',
    status: 'planning',
};

export default function ListProjectsPage() {
    const [userId, setUserId] = useState<string | null>(null);
    const navigate = useNavigate(); // <-- Add this

    // Fetch current user
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authentication token found');
                return;
            }
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    query: `
            query {
              currentUser {
                _id
                username
                email
              }
            }
          `,
                }),
            });
            const result = await response.json();

            if (result.data && result.data.currentUser) {
                setUserId(result.data.currentUser._id);
            } else {
                console.error('No user data found');
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    // Query projects
    const { loading, error, data } = useQuery(QUERY_PROJECTS_BY_USER, {
        variables: { userId },
        skip: !userId,
        fetchPolicy: 'network-only',
    });

    const isInvalidUserIdError = error?.graphQLErrors?.some((err) =>
        err.message.includes('Invalid user ID format')
    );

    const projects = isInvalidUserIdError ? [] : data?.getProjectByUser || [];

    const [deleteProject] = useMutation(DELETE_PROJECT, {
        update(cache, { data: { deleteProject } }) {
            const existingProjects: any = cache.readQuery({
                query: QUERY_PROJECTS_BY_USER,
                variables: { userId },
            });

            if (existingProjects && existingProjects.getProjectByUser) {
                const newProjects = existingProjects.getProjectByUser.filter(
                    (proj: any) => proj._id !== deleteProject._id
                );

                cache.writeQuery({
                    query: QUERY_PROJECTS_BY_USER,
                    variables: { userId },
                    data: { getProjectByUser: newProjects },
                });
            }
        },
        onError(err) {
            console.error('Failed to delete project:', err);
        },
    });

    const handleDelete = (projectId: string) => {
        deleteProject({ variables: { id: projectId } });
    };

    const handleExampleProjectClick = () => {
        navigate('/createprojectpage');
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

                {!userId ? (
                    <p>Loading user data...</p>
                ) : loading ? (
                    <p>Loading projects...</p>
                ) : error && !isInvalidUserIdError ? (
                    <p>Error loading projects: {error.message}</p>
                ) : projects.length === 0 ? (
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
                        <div
                            style={{
                                maxWidth: 320,
                                margin: '1.5rem auto',
                                cursor: 'pointer',
                            }}
                            onClick={handleExampleProjectClick}
                            title="Click to create a new project"
                        >
                            <ProjectCard
                                id="example"
                                name={BLANK_EXAMPLE.name}
                                budget={Number(BLANK_EXAMPLE.plannedBudget)}
                                status={
                                    BLANK_EXAMPLE.status as
                                        | 'planning'
                                        | 'in-progress'
                                        | 'completed'
                                        | 'not-started'
                                }
                            />
                        </div>
                        <p>
                            Click the example project above to create your own!
                        </p>
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
                        {projects.map(
                            (
                                project: {
                                    _id: string;
                                    title: string;
                                    estimatedBudget: number;
                                    status?: string;
                                    description?: string;
                                    type?: string;
                                    dueDate?: string;
                                },
                                idx: number
                            ) => (
                                <div
                                    key={project._id || idx}
                                    style={{ position: 'relative' }}
                                >
                                    <ProjectCard
                                        id={project._id || idx.toString()}
                                        name={project.title}
                                        budget={project.estimatedBudget || 0}
                                        status={
                                            (project.status as
                                                | 'planning'
                                                | 'in-progress'
                                                | 'completed'
                                                | 'not-started') || 'planning'
                                        }
                                        description={project.description}
                                        type={project.type}
                                        dueDate={project.dueDate}
                                    />
                                    <button
                                        onClick={() =>
                                            handleDelete(project._id)
                                        }
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
                                            boxShadow:
                                                '0 1px 4px rgba(0,0,0,0.08)',
                                        }}
                                        title="Delete Project"
                                        aria-label="Delete Project"
                                    >
                                        ×
                                    </button>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

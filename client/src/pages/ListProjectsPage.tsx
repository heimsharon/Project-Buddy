import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate();

    // Fetch current user
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
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
                navigate('/login');
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchUserData();
        // eslint-disable-next-line
    }, []);

    // Query projects
    const { loading, error, data, refetch } = useQuery(QUERY_PROJECTS_BY_USER, {
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
            alert('Failed to delete project.');
            console.error('Failed to delete project:', err);
        },
    });

    const handleDelete = (projectId: string) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            deleteProject({ variables: { id: projectId } }).then(() =>
                refetch()
            );
        }
    };

    const handleExampleProjectClick = () => {
        navigate('/createprojectpage');
    };

    const handleAddProject = () => {
        navigate('/createprojectpage');
    };

    return (
        <div className="project-list-background">
            <div className="project-list-container">
                <h1 className="page-title">Your Projects</h1>
                <p className="page-description">
                    Here you can view and manage your projects.
                </p>
                <button
                    className="add-project-btn"
                    onClick={handleAddProject}
                    aria-label="Add new project"
                >
                    + Add New Project
                </button>

                <h2 className="projects-list-title">Projects List</h2>

                {!userId ? (
                    <div className="project-list-loading">
                        Loading user data...
                    </div>
                ) : loading ? (
                    <div className="project-list-loading">
                        Loading projects...
                    </div>
                ) : error && !isInvalidUserIdError ? (
                    <div className="project-list-error">
                        Error loading projects: {error.message}
                    </div>
                ) : projects.length === 0 ? (
                    <div className="project-list-empty">
                        <h3>No projects found</h3>
                        <p>Here’s an example project to get you started:</p>
                        <div
                            className="project-list-example"
                            onClick={handleExampleProjectClick}
                            title="Click to create a new project"
                            tabIndex={0}
                            role="button"
                            style={{
                                maxWidth: 320,
                                margin: '1.5rem auto',
                                cursor: 'pointer',
                            }}
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
                    <div className="project-list-grid">
                        {projects.map((project: { _id: any; title: string; estimatedBudget: any; status: string; description: string | undefined; type: string | undefined; dueDate: string | undefined; }, idx: { toString: () => any; }) => (
                            <ProjectCard
                                key={project._id || idx}
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
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

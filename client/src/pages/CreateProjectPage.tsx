import React from 'react';
import { useState } from 'react';
import ProjectForm from '../components/projects/ProjectForm';
import MaterialInput from '../components/projects/MaterialInput';

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
}

export default function CreateProjectPage() {
    const [project, setProject] = useState<ProjectData>({
        name: '',
        description: '',
        budget: 0,
        materials: [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
          const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const updatedProjects = [...existingProjects, project];
    localStorage.setItem('projects', JSON.stringify(updatedProjects));

    console.log('Project saved:', project);
        // Will replace with GraphQL mutation
    };

    return (
        <div className="create-project-page">
            <h1>Create New Project</h1>

            <form onSubmit={handleSubmit}>
                <ProjectForm
                    values={{
                        name: project.name,
                        description: project.description,
                        budget: project.budget,
                    }}
                    onChange={({ name, description, budget }) =>
                        setProject((prev) => ({
                            ...prev,
                            name,
                            description,
                            budget,
                        }))
                    }
                />

                <MaterialInput
                    materials={project.materials}
                    onMaterialsChange={(materials) =>
                        setProject((prev) => ({ ...prev, materials }))
                    }
                />

                <button type="submit" className="submit-button">
                    Create Project
                </button>
            </form>
        </div>
    );
}

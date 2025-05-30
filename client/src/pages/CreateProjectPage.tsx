import React, { useState } from 'react';
import ProjectForm from '../components/projects/ProjectForm';
import MaterialInput from '../components/projects/MaterialInput';

interface Material {
    id: string;
    name: string;
    quantity: number;
    unit: 'sqft' | 'pieces' | 'gallons';
    cost: number;
}

interface Task {
    id: string;
    title: string;
    dueDate: string;
}

interface ProjectData {
    name: string;
    description: string;
    budget: number;
    materials: Material[];
    tasks: Task[];
}

export default function CreateProjectPage() {
    const [project, setProject] = useState<ProjectData>({
        name: '',
        description: '',
        budget: 0,
        materials: [],
        tasks: [],
    });

    const [taskTitle, setTaskTitle] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting project:', project);
        // Replace with GraphQL mutation
    };

    const addTask = () => {
        if (!taskTitle.trim() || !taskDueDate) return;

        const newTask: Task = {
            id: crypto.randomUUID(),
            title: taskTitle,
            dueDate: taskDueDate,
        };

        setProject((prev) => ({
            ...prev,
            tasks: [...prev.tasks, newTask],
        }));

        setTaskTitle('');
        setTaskDueDate('');
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

                <div className="task-input">
                    <h2>Add Task</h2>
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        value={taskDueDate}
                        onChange={(e) => setTaskDueDate(e.target.value)}
                        required
                    />
                    <button type="button" onClick={addTask}>
                        Add Task
                    </button>
                    <ul>
                        {project.tasks.map((task) => (
                            <li key={task.id}>
                                {task.title} (Due: {task.dueDate})
                            </li>
                        ))}
                    </ul>
                </div>

                <button type="submit" className="submit-button">
                    Create Project
                </button>
            </form>
        </div>
    );
}
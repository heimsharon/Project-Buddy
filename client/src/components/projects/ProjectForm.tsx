import React from 'react';
import { ChangeEvent } from 'react';

interface ProjectFormValues {
    title: string;
    description: string;
    plannedBudget: number; // User's intended spend
    estimatedBudget: number; // Calculated by app
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    dueDate?: string;
    type?: string;
}

interface ProjectFormProps {
    values: ProjectFormValues;
    onChange: (values: ProjectFormValues) => void;
}

export default function ProjectForm({ values, onChange }: ProjectFormProps) {
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        onChange({
            ...values,
            [name]:
                name === 'plannedBudget' || name === 'estimatedBudget'
                    ? Number(value)
                    : value,
        });
    };

    return (
        <div className="project-form">
            <div className="form-group">
                <label htmlFor="title">Project Name</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="e.g., Build a bookshelf"
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Project details..."
                    rows={3}
                />
            </div>

            <div className="form-group">
                <label htmlFor="type">Project Type</label>
                <input
                    type="text"
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    placeholder="e.g., Furniture, Renovation"
                />
            </div>

            <div className="form-group">
                <label htmlFor="plannedBudget">Planned Budget ($)</label>
                <input
                    type="number"
                    id="plannedBudget"
                    name="plannedBudget"
                    value={values.plannedBudget}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="e.g., 5000"
                />
            </div>

            <div className="form-group">
                <label htmlFor="estimatedBudget">Estimated Budget ($)</label>
                <input
                    type="number"
                    id="estimatedBudget"
                    name="estimatedBudget"
                    value={values.estimatedBudget}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    placeholder="e.g., 4800"
                />
            </div>
        </div>
    );
}

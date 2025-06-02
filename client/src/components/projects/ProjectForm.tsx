import React, { ChangeEvent } from 'react';

interface ProjectFormValues {
    title: string;
    description: string;
    estimatedBudget: number;
    dimensions: {
        length: number | null;
        width: number | null;
        height: number | null;
    };
    dueDate?: string;
    type?: string;
}

interface ProjectFormProps {
    values: ProjectFormValues;
    onChange: (values: ProjectFormValues) => void;
}

const projectTypes = [
    'Construction',
    'Design',
    'Renovation',
    'Research',
    'Other'
];

export default function ProjectForm({ values, onChange }: ProjectFormProps) {
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        onChange({
            ...values,
            [name]: type === 'number' ? Number(value) : value,
        });
    };

    const handleDimensionsChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        onChange({
            ...values,
            dimensions: {
                ...values.dimensions,
                [name]: Number(value),
            },
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
                    value={values.estimatedBudget ?? ''}
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

            <div className="form-group">
                <label htmlFor="type">Project Type</label>
                <select
                    id="type"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    required
                >
                    <option value="" disabled>Select a type</option>
                    {projectTypes.map((typeOption) => (
                        <option key={typeOption} value={typeOption}>
                            {typeOption}
                        </option>
                    ))}
                </select>
            </div>

            <fieldset className="form-group">
                <legend>Dimensions (in meters)</legend>
                <div>
                    <label htmlFor="length">Length</label>
                    <input
                        type="number"
                        id="length"
                        name="length"
                        value={values.dimensions.length ?? ''}
                        onChange={handleDimensionsChange}
                        min="0"
                        step="0.01"
                        placeholder="Length"
                    />
                </div>
                <div>
                    <label htmlFor="width">Width</label>
                    <input
                        type="number"
                        id="width"
                        name="width"
                        value={values.dimensions.width ?? ''}
                        onChange={handleDimensionsChange}
                        min="0"
                        step="0.01"
                        placeholder="Width"
                    />
                </div>
                <div>
                    <label htmlFor="height">Height</label>
                    <input
                        type="number"
                        id="height"
                        name="height"
                        value={values.dimensions.height ?? ''}
                        onChange={handleDimensionsChange}
                        min="0"
                        step="0.01"
                        placeholder="Height"
                    />
                </div>
            </fieldset>
        </div>
    );
}

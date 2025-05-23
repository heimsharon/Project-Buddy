import React from 'react';
import { ChangeEvent } from 'react';

interface ProjectFormValues {
  name: string;
  description: string;
  budget: number;
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
      [name]: name === 'budget' ? Number(value) : value,
    });
  };

  return (
    <div className="project-form">
      <div className="form-group">
        <label htmlFor="name">Project Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={values.name}
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
        <label htmlFor="budget">Budget ($)</label>
        <input
          type="number"
          id="budget"
          name="budget"
          value={values.budget}
          onChange={handleChange}
          min="0"
          step="0.01"
          placeholder="Estimated total cost"
        />
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';
import BudgetTracker from '../components/projects/BudgetTracker';
import { Project, BudgetItem } from '../types/project';

export default function ProjectDetailsPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Bookshelf Project',
      description: 'Build a wooden bookshelf',
      budget: 250,
      status: 'in-progress',
      tasks: [
        { id: '1', description: 'Buy materials', completed: true },
        { id: '2', description: 'Cut wood', completed: false }
      ],
      budgetItems: [
        { id: '1', name: 'Lumber', estimatedCost: 150, category: 'materials' },
        { id: '2', name: 'Paint', estimatedCost: 75, category: 'materials' }
      ],
      materials: []
    },
    {
      id: '2',
      name: 'Garden Fence',
      description: 'Build backyard fence',
      budget: 500,
      status: 'planning',
      tasks: [],
      budgetItems: [],
      materials: []
    }
  ]);

  const [selectedProjectId, setSelectedProjectId] = useState('1');

  // Get current project
  const project = projects.find(p => p.id === selectedProjectId)!;

  const handleProjectUpdate = (updatedValues: { name: string; description: string; budget: number }) => {
    setProjects(prev => 
      prev.map(p => 
        p.id === selectedProjectId ? { ...p, ...updatedValues } : p
      )
    );
  };



  const handleBudgetUpdate = (id: string, field: keyof BudgetItem, value: any) => {
      setProjects(prev =>
        prev.map(p => ({
          ...p,
          budgetItems: p.budgetItems.map(item =>
            item.id === id ? { ...item, [field]: value } : item
          )
        }))
      );
    };
  
    const handleBudgetDelete = (id: string) => {
      setProjects(prev =>
        prev.map(p => ({
          ...p,
          budgetItems: p.budgetItems.filter(item => item.id !== id)
        }))
      );
    };

  return (
    <div className="project-details-container">
      {/* Project List Sidebar */}
      <div className="project-list-sidebar">
        <h2>My Projects</h2>
        {projects.map(proj => (
          <ProjectCard
            key={proj.id}
            id={proj.id}
            name={proj.name}
            budget={proj.budget}
            status={proj.status}
            onClick={setSelectedProjectId}
            isSelected={proj.id === selectedProjectId}
          />
        ))}
      </div>

      {/* Project Details Main Content */}
      <div className="project-details-content">
        <div className="project-header">
          <h2>{project.name}</h2>
          <span className={`status-badge ${project.status}`}>
            {project.status}
          </span>
        </div>

        <ProjectForm
          values={{
            name: project.name,
            description: project.description,
            budget: project.budget
          }}
          onChange={handleProjectUpdate}
        />

        <div className="project-sections">
          <section>
            <BudgetTracker
              items={project.budgetItems}
              onItemUpdate={handleBudgetUpdate}
              onItemDelete={handleBudgetDelete}
            />
          </section>

          <section className="budget-section">
            <BudgetTracker
              items={project.budgetItems}
              onItemUpdate={handleBudgetUpdate} onItemDelete={function (): void {
                throw new Error('Function not implemented.');
              } }            />
          </section>
        </div>
      </div>
    </div>
  );
}
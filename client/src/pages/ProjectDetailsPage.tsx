import React from 'react';
import { useState } from 'react';
import TaskList from '../components/projects/TaskList';
import BudgetTracker from '../components/projects/BudgetTracker';
import { Project, Task, BudgetItem } from '../types/project';

export default function ProjectDetailsPage() {
  const [project, setProject] = useState<Project>(() => ({
    id: 'default-id',
    name: 'Default Project',
    description: 'Default project description',
    budget: 1000,
    status: 'in-progress', // Updated to match the allowed 'status' types
    materials: [], // Added missing 'materials' property
    tasks: [
      { id: '1', description: 'Buy materials', completed: false }
    ],
    budgetItems: [
      { id: '1', name: 'Lumber', estimatedCost: 150, category: 'materials' }
    ]
  }));

  const handleTaskToggle = (taskId: string) => {
    setProject((prev: Project) => ({
      ...prev,
      tasks: prev.tasks.map((task: Task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const handleTaskAdd = (description: string) => {
    setProject(prev => ({
      ...prev,
      tasks: [
        ...prev.tasks,
        {
          id: Date.now().toString(),
          description,
          completed: false
        }
      ]
    }));
  };

  const handleBudgetUpdate = (id: string, field: keyof BudgetItem, value: any) => {
    setProject(prev => ({
      ...prev,
      budgetItems: prev.budgetItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  return (
    <div className="project-details">
      {/* ... other project details ... */}
      <TaskList
        tasks={project.tasks}
        onTaskToggle={handleTaskToggle}
        onTaskAdd={handleTaskAdd}
      />
      <BudgetTracker
        items={project.budgetItems}
        onItemUpdate={handleBudgetUpdate}
      />
    </div>
  );
}
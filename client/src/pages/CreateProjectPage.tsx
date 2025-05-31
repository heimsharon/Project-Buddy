import React, { useState } from 'react';
import ProjectForm from '../components/projects/ProjectForm';
import MaterialInput from '../components/projects/MaterialInput';
import MaterialCalculator from './CalculatorPage';
import { useNavigate } from 'react-router-dom';

import { Material } from '../types/project';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_PROJECT, CREATE_MATERIAL } from '../utils/mutations';
import { QUERY_ALL_MATERIALS } from '../utils/queries';
import auth from '../utils/auth';

interface Dimensions {
  length: number | null;
  width: number | null;
  height: number | null;
}

interface ProjectData {
  userId: string;
  title: string;
  description: string;
  type: string;
  dimensions: Dimensions | null;
  materials: Material[];
  dueDate: string;
  estimatedBudget: number | null;
}

export default function CreateProjectPage() {
  const user = auth.getProfile();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'calculator'>('details');

  const [project, setProject] = useState<ProjectData>({
    userId: user.data._id,
    title: '',
    description: '',
    type: '',
    dimensions: { length: null, width: null, height: null },
    materials: [],
    dueDate: new Date().toISOString().split('T')[0],
    estimatedBudget: null
  });

  const { data: materialsData, loading: materialsLoading, error: materialsError } = useQuery(QUERY_ALL_MATERIALS);

  const [createProject] = useMutation(CREATE_PROJECT);
  const [createMaterial] = useMutation(CREATE_MATERIAL);

  const [calculatorResult, setCalculatorResult] = useState<{
    material: string;
    quantity: number;
    estimatedCost: number;
  } | null>(null);

  const isValidObjectId = (id: string) => /^[0-9a-fA-F]{24}$/.test(id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!project.title.trim()) {
      alert('Project title is required.');
      return;
    }

    if (project.materials.some(mat => !mat.id || !isValidObjectId(mat.id))) {
      alert('One or more materials do not have valid IDs.');
      return;
    }

    const materialIds = project.materials.map(mat => mat.id);

    try {
      const { data } = await createProject({
        variables: {
          title: project.title,
          description: project.description,
          type: project.type,
          dimensions: project.dimensions ?? { length: null, width: null, height: null },
          dueDate: project.dueDate,
          materialIds,
          userId: user.data._id
        }
      });

      console.log('Project created:', data.createProject);

      // Navigate to the project list page after creating the project
      navigate('/listprojectspage');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project.');
    }
  };

  const addCalculatorResult = async () => {
    if (!calculatorResult) return;

    try {
      const { data } = await createMaterial({
        variables: {
          name: calculatorResult.material,
          category: 'construction',
          unit: 'pieces',
          quantity: calculatorResult.quantity,
          priceUSD: calculatorResult.estimatedCost
        }
      });

      const newMaterial = data.createMaterial;

      setProject(prev => ({
        ...prev,
        materials: [...prev.materials, newMaterial]
      }));

      setCalculatorResult(null);
      setActiveTab('materials');
    } catch (error) {
      console.error('Error creating material:', error);
      alert('Failed to add material.');
    }
  };

  return (
    <div className="create-project-page">
      <h1>Create New Project</h1>

      <div className="tabs">
        <button
          className={activeTab === 'details' ? 'active' : ''}
          onClick={() => setActiveTab('details')}
          type="button"
        >
          Project Details
        </button>
        <button
          className={activeTab === 'materials' ? 'active' : ''}
          onClick={() => setActiveTab('materials')}
          type="button"
        >
          Materials
        </button>
        <button
          className={activeTab === 'calculator' ? 'active' : ''}
          onClick={() => setActiveTab('calculator')}
          type="button"
        >
          Material Calculator
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === 'details' && (
          <div className="project-details-section">
            <ProjectForm
              values={{
                title: project.title,
                description: project.description,
                type: project.type,
                dimensions: project.dimensions ?? { length: null, width: null, height: null },
                dueDate: project.dueDate,
                estimatedBudget: project.estimatedBudget
              }}
              onChange={(values) =>
                setProject(prev => ({
                  ...prev,
                  ...values,
                  dimensions: {
                    ...prev.dimensions,
                    ...values.dimensions
                  }
                }))
              }
            />
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="materials-section">
            {materialsLoading && <p>Loading materials...</p>}
            {materialsError && <p>Error loading materials.</p>}
            {materialsData && (
              <>
                <MaterialInput
                  materials={project.materials}
                  onMaterialsChange={(materials) =>
                    setProject(prev => ({
                      ...prev,
                      materials: materials.map(material => ({
                        ...material,
                        category: material.category || 'default'
                      }))
                    }))
                  }
                />
                <div className="budget-summary">
                  <h3>
                    Estimated Cost from Materials: $
                    {project.materials
                      .reduce(
                        (sum, material) =>
                          sum + ((material.priceUSD ?? 0) * (material.quantity ?? 0)),
                        0
                      )
                      .toFixed(2)}
                  </h3>
                </div>
                <div className="budget-summary">
                  <h3>
                    Estimated Budget: $
                    {project.estimatedBudget?.toFixed(2) || '0.00'}
                  </h3>
                </div>
                <div className="budget-summary">
                  <h3>
                    Estimated Remaining Budget: $
                    {((project.estimatedBudget ?? 0) - project.materials.reduce(
                      (sum, material) => sum + ((material.priceUSD ?? 0) * (material.quantity ?? 0)),
                      0
                    )).toFixed(2)}
                  </h3>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="calculator-section">
            <MaterialCalculator
              onCalculate={(result) => setCalculatorResult(result)}
            />
            {calculatorResult && (
              <div className="calculator-result">
                <p>
                  {calculatorResult.quantity} {calculatorResult.material} (Est. $
                  {calculatorResult.estimatedCost.toFixed(2)})
                </p>
                <button
                  type="button"
                  onClick={addCalculatorResult}
                  className="add-result-btn"
                >
                  Add to Materials
                </button>
              </div>
            )}
          </div>
        )}

        <div className="form-actions">
          <button
            type="button"
            onClick={() =>
              activeTab === 'details' ? setActiveTab('materials') : setActiveTab('details')
            }
            className="nav-button"
          >
            {activeTab === 'details' ? 'Next: Materials' : 'Back to Details'}
          </button>

          <button
            type="submit"
            className="submit-button"
            disabled={!project.title.trim() || project.materials.length === 0}
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}


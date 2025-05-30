import React, { useState } from 'react';
import ProjectForm from '../components/projects/ProjectForm';
import MaterialInput from '../components/projects/MaterialInput';
import MaterialCalculator from './CalculatorPage';
import { useNavigate } from 'react-router-dom';

import { Material } from '../types/project';
import { useMutation } from '@apollo/client';
import { CREATE_PROJECT } from '../utils/mutations';
import auth from '../utils/auth';

interface ProjectData {
    userId: string;
    title: string;
    description: string;
    type: string;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    materials: Material[];
    dueDate: string;
    budgetItems: Array<{
        name: string;
        estimatedCost: number;
        actualCost?: number;
    }>;
}

export default function CreateProjectPage() {
    const user= auth.getProfile();
    console.log(user);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'calculator'>('details');
    const [project, setProject] = useState<ProjectData>({
        userId: user.data._id,
        title: '',
        description: '',
        type: '',
        dimensions: {
            length: 0,
            width: 0,
            height: 0
        },
        materials: [],
        dueDate: new Date().toISOString().split('T')[0],
        budgetItems: []
    });

    const [createproject] = useMutation(CREATE_PROJECT);

    // Material Calculator State
    const [calculatorResult, setCalculatorResult] = useState<{
        material: string;
        quantity: number;
        estimatedCost: number;
    } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Hello!');
        // Calculate total budget
        const totalBudget = project.materials.reduce(
            (sum, material) => sum + (material.cost * material.quantity), 0
        );

        // Prepare project data for API
        const projectData = {
            ...project,
            userId: user.data._id,
            budget: totalBudget,
            materialIds: project.materials.map(m => m.id),
            budgetItems: project.materials.map(material => ({
                name: material.name,
                estimatedCost: material.cost * material.quantity,
                category: material.category
            }))
        };
console.log(projectData);
        try {
            const { data} = await createproject({
                variables: { ...projectData }
            });
            
           
            console.log('Project created:', data.createProject);
            navigate('/projects');
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const addCalculatorResult = () => {
        if (!calculatorResult) return;
        
        setProject(prev => ({
            ...prev,
            materials: [
                ...prev.materials,
                {
                    id: Date.now().toString(),
                    name: calculatorResult.material,
                    quantity: calculatorResult.quantity,
                    unit: 'pieces',
                    cost: calculatorResult.estimatedCost / calculatorResult.quantity,
                    category: 'construction'
                }
            ]
        }));
        
        setCalculatorResult(null);
    };

    return (
        <div className="create-project-page">
            <h1>Create New Project</h1>
            
            <div className="tabs">
                <button 
                    className={activeTab === 'details' ? 'active' : ''}
                    onClick={() => setActiveTab('details')}
                >
                    Project Details
                </button>
                <button 
                    className={activeTab === 'materials' ? 'active' : ''}
                    onClick={() => setActiveTab('materials')}
                >
                    Materials
                </button>
                <button 
                    className={activeTab === 'calculator' ? 'active' : ''}
                    onClick={() => setActiveTab('calculator')}
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
                                dimensions: project.dimensions,
                                dueDate: project.dueDate,
                                budget: project.materials.reduce(
                                    (sum, material) => sum + (material.cost * material.quantity), 0
                                ) // Calculating budget based on materials
                            }}
                            onChange={(values) => setProject(prev => ({
                                ...prev,
                                ...values
                            }))}
                        />
                    </div>
                )}

                {activeTab === 'materials' && (
                    <div className="materials-section">
                        <MaterialInput
                            materials={project.materials}
                            onMaterialsChange={(materials) =>
                                setProject((prev) => ({
                                    ...prev,
                                    materials: materials.map((material) => ({
                                        ...material,
                                        category: material.category || 'default', // Provide a default category if missing
                                    })),
                                }))
                            }
                        />
                        <div className="budget-summary">
                            <h3>Estimated Budget: $
                                {project.materials.reduce(
                                    (sum, material) => sum + (material.cost * material.quantity), 0
                                ).toFixed(2)}
                            </h3>
                        </div>
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
                                    {calculatorResult.quantity} {calculatorResult.material} 
                                    (Est. ${calculatorResult.estimatedCost.toFixed(2)})
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
                        onClick={() => activeTab === 'details' 
                            ? setActiveTab('materials') 
                            : setActiveTab('details')
                        }
                        className="nav-button"
                    >
                        {activeTab === 'details' ? 'Next: Materials' : 'Back to Details'}
                    </button>
                    
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={!project.title || project.materials.length === 0}
                    >
                        Create Project
                    </button>
                </div>
            </form>
        </div>
    );
}
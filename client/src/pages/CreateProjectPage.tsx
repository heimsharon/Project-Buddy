import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import ProgressStepper from '../components/projects/ProgressStepper';
import MaterialInput from '../components/projects/MaterialInput';
import { QUERY_ALL_MATERIALS } from '../utils/queries';
import MaterialCalculator from '../components/projects/MaterialCalculator';
import { CREATE_PROJECT } from '../utils/mutations';

const steps = ['Project Details', 'Materials', 'Material Calculator'];

type Material = {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    cost: number;
    [key: string]: any;
};

type Project = {
    name: string;
    description: string;
    type?: string;
    plannedBudget: string;
    dueDate?: string;
    dimensions: string;
    materials: Material[];
};

const initialProject: Project = {
    name: '',
    description: '',
    type: '',
    plannedBudget: '',
    dueDate: '',
    dimensions: '',
    materials: [],
};

const CreateProjectPage: React.FC = () => {
    const [step, setStep] = useState(0);
    const [project, setProject] = useState(initialProject);
    const { data } = useQuery(QUERY_ALL_MATERIALS);
    const materialOptions = data?.getAllMaterials || [];
    const [createProjectMutation] = useMutation(CREATE_PROJECT);

    // Validation helpers
    const isProjectDetailsValid =
        !!project.name &&
        !!project.description &&
        !!project.plannedBudget &&
        !!project.dueDate &&
        !!project.type;

    const estimatedBudget = project.materials.reduce(
        (sum, mat) => sum + (mat.cost || 0) * (mat.quantity || 0),
        0
    );

    const handleNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
    const handleBack = () => setStep((s) => Math.max(s - 1, 0));

    // Add material from calculator, merging if already exists
    const handleAddMaterial = (mat: {
        name: string;
        quantity: number;
        unit: string;
        cost: number;
    }) => {
        setProject((prev) => {
            const existing = prev.materials.find((m) => m.name === mat.name);
            if (existing) {
                // If material exists, update quantity
                return {
                    ...prev,
                    materials: prev.materials.map((m) =>
                        m.name === mat.name
                            ? { ...m, quantity: m.quantity + mat.quantity }
                            : m
                    ),
                };
            }
            // Otherwise, add new material
            return {
                ...prev,
                materials: [
                    ...prev.materials,
                    {
                        id: Date.now().toString(),
                        name: mat.name,
                        quantity: mat.quantity,
                        unit: mat.unit,
                        cost: mat.cost,
                    },
                ],
            };
        });
    };

    const handleSubmit = async () => {
        if (!isProjectDetailsValid || project.materials.length === 0) {
            alert('Please complete all required fields and add materials.');
            return;
        }
        try {
            await createProjectMutation({
                variables: {
                    name: project.name,
                    description: project.description,
                    type: project.type,
                    plannedBudget: parseFloat(project.plannedBudget),
                    dueDate: project.dueDate,
                    dimensions: project.dimensions,
                    materials: project.materials.map((mat) => ({
                        name: mat.name,
                        quantity: mat.quantity,
                        unit: mat.unit,
                        cost: mat.cost,
                    })),
                },
            });

            alert('Project created successfully!');
            setProject(initialProject); // Reset form
            setStep(0);

        } catch (error) {
            console.error('Error creating project:', error);
            alert('Failed to create project. Please try again.');
        }
    };


    return (
        <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
            <ProgressStepper steps={steps} currentStep={step} />

            {step === 0 && (
                <div>
                    <h2>Project Details</h2>
                    <label>
                        Name
                        <input
                            type="text"
                            value={project.name || ''}
                            onChange={(e) =>
                                setProject({ ...project, name: e.target.value })
                            }
                            placeholder="Project name"
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Type
                        <input
                            type="text"
                            value={project.type || ''}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    type: e.target.value,
                                })
                            }
                            placeholder="e.g. Furniture, Renovation"
                        />
                    </label>
                    <br />
                    <label>
                        Description
                        <textarea
                            value={project.description || ''}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    description: e.target.value,
                                })
                            }
                            placeholder="Short description"
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Planned Budget (USD)
                        <input
                            type="number"
                            value={project.plannedBudget || ''}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    plannedBudget: e.target.value,
                                })
                            }
                            placeholder="e.g. 10000"
                            min={0}
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Due Date
                        <input
                            type="date"
                            value={project.dueDate || ''}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    dueDate: e.target.value,
                                })
                            }
                            required
                        />
                    </label>
                    <br />
                    <label>
                        Dimensions
                        <input
                            type="text"
                            value={project.dimensions || ''}
                            onChange={(e) =>
                                setProject({
                                    ...project,
                                    dimensions: e.target.value,
                                })
                            }
                            placeholder="e.g. 10x20 ft"
                        />
                    </label>
                </div>
            )}



            {step === 1 && (
                <div>
                    <h2>Material Calculator</h2>
                    <MaterialCalculator
                        onAddMaterial={handleAddMaterial}
                        materialOptions={materialOptions}
                    />
                </div>
            )}

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 32,
                }}
            >
                <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 0}
                >
                    Back
                </button>
                {step < steps.length - 1 ? (
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={
                            (step === 0 && !isProjectDetailsValid) ||
                            (step === 1 && project.materials.length === 0)
                        }
                    >
                        Next
                    </button>
                ) : null}

                {step === 2 && (
                    <div>
                        <h2>Materials</h2>
                        <MaterialInput
                            materials={project.materials}
                            onMaterialsChange={(materials) =>
                                setProject({ ...project, materials })
                            }
                            materialOptions={materialOptions}
                        />
                        <div style={{ marginTop: 16 }}>
                            <strong>Estimated Materials Cost:</strong>{' '}
                            <span
                                style={{
                                    color:
                                        estimatedBudget >
                                            Number(project.plannedBudget)
                                            ? 'red'
                                            : 'green',
                                }}
                            >
                                ${estimatedBudget.toFixed(2)}
                            </span>
                            {' / '}
                            Planned Budget: ${project.plannedBudget}
                        </div>
                        <button
                            type="submit"
                            disabled={
                                !isProjectDetailsValid ||
                                project.materials.length === 0
                            }
                            onClick={handleSubmit}
                        >
                            Create Project
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateProjectPage;

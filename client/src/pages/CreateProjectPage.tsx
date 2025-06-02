import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import ProgressStepper from '../components/projects/ProgressStepper';
import MaterialInput from '../components/projects/MaterialInput';
import { QUERY_ALL_MATERIALS } from '../utils/queries';
import MaterialCalculator from '../components/projects/MaterialCalculator';
import { useNavigate } from 'react-router-dom';
import { Project, Material } from '../types/project';
import { CREATE_PROJECT } from '../utils/mutations';
import auth from '../utils/auth';
import '../assets/styles/createproject.css';

const steps = ['Project Details', 'Material Calculator', 'Materials'];

export default function CreateProjectPage() {
    const navigate = useNavigate();
    let user;
    try {
        user = auth.getProfile();
    } catch (e) {
        navigate('/login');
        return null;
    }

    const [step, setStep] = useState(0);
    const { data } = useQuery(QUERY_ALL_MATERIALS);
    const materialOptions = data?.getAllMaterials || [];

    const [project, setProject] = useState<Project>({
        id: '',
        title: '',
        description: '',
        type: '',
        dimensions: {
            length: null,
            width: null,
            height: null,
        },
        estimatedBudget: null,
        userId: user.data._id,
        materialIds: [],
        createdAt: new Date(),
        dueDate: null,
    });

    const isProjectDetailsValid =
        !!project.title &&
        !!project.description &&
        !!project.dimensions &&
        !!project.dimensions.length &&
        !!project.dimensions.width &&
        !!project.dimensions.height &&
        !!project.dueDate &&
        !!project.type &&
        !!project.estimatedBudget;

    const [createproject] = useMutation(CREATE_PROJECT);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const totalBudget = project.materialIds
            .reduce(
                (sum, material) =>
                    sum + (material.priceUSD ?? 0) * (material.quantity ?? 0),
                0
            )
            .toFixed(2);

        const projectData = {
            ...project,
            userId: user.data._id,
            budget: totalBudget,
            materialIds: project.materialIds.map((m) => m._id),
            budgetItems: project.materialIds.map((material) => ({
                name: material.name,
                estimatedCost:
                    (material.priceUSD ?? 0) * (material.quantity ?? 0),
                category: material.category,
            })),
        };

        try {
            const { data } = await createproject({
                variables: { ...projectData },
            });
            console.log('Project created:', data.createProject);
            navigate('/listprojectspage');
        } catch (error) {
            console.error('Error creating project:', error);
        }
    };

    const handleAddMaterial = (material: Material) => {
        setProject((prev) => ({
            ...prev,
            materialIds: [...prev.materialIds, material],
        }));
    };

    const handleNext = () => {
        setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    };

    const handleBack = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    return (
        <div className="project-background">
            <div className="create-project-container">
                <ProgressStepper steps={steps} currentStep={step} />

                {step === 0 && (
                    <div>
                        <h2>Project Details</h2>
                        <div className="project-inputs-container">
                            <label>
                                Name
                                <input
                                    type="text"
                                    value={project.title || ''}
                                    onChange={(e) =>
                                        setProject({
                                            ...project,
                                            title: e.target.value,
                                        })
                                    }
                                    placeholder="Project name"
                                    required
                                />
                            </label>
                            <br />

                            <label>
                                Type
                                <select
                                    value={project.type || ''}
                                    onChange={(e) =>
                                        setProject({
                                            ...project,
                                            type: e.target.value,
                                        })
                                    }
                                    required
                                >
                                    <option value="">
                                        Select project type
                                    </option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Renovation">
                                        Renovation
                                    </option>
                                    <option value="Landscaping">
                                        Landscaping
                                    </option>
                                    <option value="Electrical">
                                        Electrical
                                    </option>
                                    <option value="Plumbing">Plumbing</option>
                                    <option value="Painting">Painting</option>
                                    <option value="Custom">Custom</option>
                                </select>
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
                                    value={project.estimatedBudget || ''}
                                    onChange={(e) =>
                                        setProject({
                                            ...project,
                                            estimatedBudget: parseFloat(
                                                e.target.value
                                            ),
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
                                    value={
                                        project.dueDate
                                            ? project.dueDate
                                                  .toISOString()
                                                  .split('T')[0]
                                            : ''
                                    }
                                    onChange={(e) =>
                                        setProject({
                                            ...project,
                                            dueDate: new Date(e.target.value),
                                        })
                                    }
                                    required
                                />
                            </label>
                            <br />

                            <label>
                                Length
                                <input
                                    type="number"
                                    min={0}
                                    value={project.dimensions.length ?? ''}
                                    onChange={(e) =>
                                        setProject({
                                            ...project,
                                            dimensions: {
                                                ...project.dimensions,
                                                length: e.target.value
                                                    ? parseFloat(e.target.value)
                                                    : null,
                                            },
                                        })
                                    }
                                    placeholder="Length"
                                    required
                                />
                            </label>
                            <br />

                            <label>
                                Width
                                <input
                                    type="number"
                                    min={0}
                                    value={project.dimensions.width ?? ''}
                                    onChange={(e) =>
                                        setProject({
                                            ...project,
                                            dimensions: {
                                                ...project.dimensions,
                                                width: e.target.value
                                                    ? parseFloat(e.target.value)
                                                    : null,
                                            },
                                        })
                                    }
                                    placeholder="Width"
                                    required
                                />
                            </label>
                            <br />

                            <label>
                                Height
                                <input
                                    type="number"
                                    min={0}
                                    value={project.dimensions.height ?? ''}
                                    onChange={(e) =>
                                        setProject({
                                            ...project,
                                            dimensions: {
                                                ...project.dimensions,
                                                height: e.target.value
                                                    ? parseFloat(e.target.value)
                                                    : null,
                                            },
                                        })
                                    }
                                    placeholder="Height"
                                    required
                                />
                            </label>
                        </div>
                    </div>
                )}

                {step === 1 && (
                    <div>
                        <h2>Material Calculator</h2>
                        <MaterialCalculator
                            materialOptions={materialOptions}
                            onAddMaterial={handleAddMaterial}
                        />
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2>Materials</h2>
                        <MaterialInput
                            materials={project.materialIds}
                            onMaterialsChange={(materialIds: Material[]) =>
                                setProject({ ...project, materialIds })
                            }
                            materialOptions={materialOptions}
                        />
                        <div style={{ marginTop: 16 }}>
                            <strong>Estimated Materials Cost:</strong>{' '}
                            <span style={{ color: 'green' }}>
                                {/* Calculate and display total cost */}
                                {project.materialIds
                                    .reduce(
                                        (sum, material) =>
                                            sum +
                                            (material.priceUSD ?? 0) *
                                                (material.quantity ?? 0),
                                        0
                                    )
                                    .toFixed(2)}{' '}
                                USD
                            </span>
                        </div>
                        <button
                            type="submit"
                            disabled={
                                !isProjectDetailsValid ||
                                project.materialIds.length === 0
                            }
                            onClick={handleSubmit}
                        >
                            Create Project
                        </button>
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
                    {step < steps.length - 1 && (
                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={
                                (step === 0 && !isProjectDetailsValid) ||
                                (step === 1 && project.materialIds.length === 0)
                            }
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

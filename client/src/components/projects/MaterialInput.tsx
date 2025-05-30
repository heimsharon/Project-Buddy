import React from 'react';
import { Material } from '../../types/project';

interface MaterialInputProps {
    materials: Material[];
    onMaterialsChange: (materials: Material[]) => void;
}

export default function MaterialInput({
    materials,
    onMaterialsChange,
}: MaterialInputProps) {
    const addMaterial = () => {
        onMaterialsChange([
            ...materials,
            {
                id: Date.now().toString(),
                name: '',
                quantity: 1,
                unit: 'pieces' as const,
                cost: 0,
            },
        ]);
    };

    const updateMaterial = (
        id: string,
        field: keyof Material,
        value: unknown
    ) => {
        onMaterialsChange(
            materials.map((material) =>
                material.id === id ? { ...material, [field]: value } : material
            )
        );
    };

    return (
        <div className="material-input">
            <h3>Materials Needed</h3>
            {materials.map((material) => (
                <div key={material.id} className="material-row">
                    <input
                        value={material.name}
                        onChange={(e) =>
                            updateMaterial(material.id, 'name', e.target.value)
                        }
                        placeholder="Material name"
                    />
                    <input
                        type="number"
                        value={material.quantity}
                        onChange={(e) =>
                            updateMaterial(
                                material.id,
                                'quantity',
                                Number(e.target.value)
                            )
                        }
                        min="1"
                    />
                    {/* Add similar inputs for unit and cost */}
                </div>
            ))}
            <button type="button" onClick={addMaterial}>
                + Add Material
            </button>
        </div>
    );
}

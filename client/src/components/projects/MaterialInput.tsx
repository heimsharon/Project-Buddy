import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_MATERIALS } from '../../utils/queries';

interface Material {
    id: string;
    name: string;
    quantity: number;
    unit: string;
    cost: number;
}

interface MaterialInputProps {
    materials: Material[];
    onMaterialsChange: (materials: Material[]) => void;
    materialOptions?: any[];
}

const MaterialInput: React.FC<MaterialInputProps> = ({
    materials,
    onMaterialsChange,
    materialOptions = [],
}) => {
    const { data } = useQuery(QUERY_ALL_MATERIALS);
    const [options, setOptions] = useState<any[]>(materialOptions);

    useEffect(() => {
        if (data?.getAllMaterials) {
            setOptions(data.getAllMaterials);
        }
    }, [data]);

    const handleMaterialChange = (
        id: string,
        field: keyof Material,
        value: any
    ) => {
        const updated = materials.map((mat) =>
            mat.id === id
                ? {
                      ...mat,
                      [field]: value,
                      ...(field === 'name'
                          ? {
                                unit:
                                    options.find((opt) => opt.name === value)
                                        ?.unit || '',
                                cost:
                                    options.find((opt) => opt.name === value)
                                        ?.priceUSD || 0,
                            }
                          : {}),
                  }
                : mat
        );
        onMaterialsChange(updated);
    };

    const addMaterial = () => {
        onMaterialsChange([
            ...materials,
            {
                id: Date.now().toString(),
                name: '',
                quantity: 1,
                unit: '',
                cost: 0,
            },
        ]);
    };

    const removeMaterial = (id: string) => {
        onMaterialsChange(materials.filter((mat) => mat.id !== id));
    };

    return (
        <div>
            {materials.map((material) => (
                <div
                    key={material.id}
                    style={{
                        display: 'flex',
                        gap: 8,
                        alignItems: 'center',
                        marginBottom: 8,
                        border: '1px solid #eee',
                        borderRadius: 8,
                        padding: 8,
                    }}
                >
                    <input
                        type="text"
                        placeholder="Search material"
                        value={material.name}
                        onChange={(e) =>
                            handleMaterialChange(
                                material.id,
                                'name',
                                e.target.value
                            )
                        }
                        list={`material-options-${material.id}`}
                        style={{ flex: 2 }}
                    />
                    <datalist id={`material-options-${material.id}`}>
                        {options.map((opt) => (
                            <option key={opt.name} value={opt.name} />
                        ))}
                    </datalist>
                    <input
                        type="number"
                        min={1}
                        value={material.quantity}
                        onChange={(e) =>
                            handleMaterialChange(
                                material.id,
                                'quantity',
                                Number(e.target.value)
                            )
                        }
                        style={{ width: 60 }}
                    />
                    <span style={{ minWidth: 50 }}>{material.unit}</span>
                    <span style={{ minWidth: 70 }}>
                        ${material.cost.toFixed(2)}
                    </span>
                    <button
                        type="button"
                        onClick={() => removeMaterial(material.id)}
                        style={{ color: 'red' }}
                        aria-label="Remove material"
                    >
                        ×
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={addMaterial}
                style={{ marginTop: 8 }}
            >
                + Add Another Material
            </button>
        </div>
    );
};

export default MaterialInput;

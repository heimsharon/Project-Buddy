import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALL_MATERIALS } from '../../utils/queries';
import { Material } from '../../types/project';

interface MaterialInputProps {
  materials: Material[];
  onMaterialsChange: (materials: Material[]) => void;
  materialOptions?: Material[];
}

const MaterialInput: React.FC<MaterialInputProps> = ({
  materials,
  onMaterialsChange,
  materialOptions = [],
}) => {
  const { data } = useQuery(QUERY_ALL_MATERIALS);
  const [options, setOptions] = useState<Material[]>(materialOptions);

  useEffect(() => {
    if (data?.getAllMaterials) {
      setOptions(data.getAllMaterials);
    }
  }, [data]);

  // When user selects a material by id, update the whole material object in the list
  const handleMaterialSelect = (materialId: string, id: string) => {
    const selectedOption = options.find((opt) => opt.id === id);
    if (!selectedOption) return;

    const updated = materials.map((mat) =>
      mat.id === materialId
        ? {
            ...selectedOption,
            quantity: mat.quantity || 1, // preserve quantity if already set
          }
        : mat
    );
    onMaterialsChange(updated);
  };

  const handleQuantityChange = (materialId: string, quantity: number) => {
    const updated = materials.map((mat) =>
      mat.id === materialId ? { ...mat, quantity } : mat
    );
    onMaterialsChange(updated);
  };

  const addMaterial = () => {
    onMaterialsChange([
      ...materials,
      {
        id: Date.now().toString(),
        name: '',
        category: 'fencing',
        unitCoverage: {} as Material['unitCoverage'],
        quantity: 1,
        unit: '',
        priceUSD: 0,
        lastUpdated: new Date(),
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
          <select
            value={material.id || ''}
            onChange={(e) => handleMaterialSelect(material.id, e.target.value)}
            style={{ flex: 2 }}
          >
            <option value="">Select material</option>
            {options.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            min={1}
            value={material.quantity}
            onChange={(e) =>
              handleQuantityChange(material.id, Number(e.target.value))
            }
            style={{ width: 60 }}
          />
          <span style={{ minWidth: 50 }}>{material.unit}</span>
          <span style={{ minWidth: 70 }}>${material.priceUSD.toFixed(2)}</span>
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

      <button type="button" onClick={addMaterial} style={{ marginTop: 8 }}>
        + Add Another Material
      </button>
    </div>
  );
};

export default MaterialInput;

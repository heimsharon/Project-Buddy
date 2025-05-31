import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

interface MaterialOption {
  _id: string;
  name: string;
}

interface MaterialInputProps {
  materials: Array<{
    id: string;
    name: string;
    quantity: number;
    unit: 'sqft' | 'pieces' | 'gallons';
    priceUSD: number;
    category?: string;
  }>;
  onMaterialsChange: (
    materials: MaterialInputProps['materials']
  ) => void;
}

const QUERY_ALL_MATERIALS = gql`
  query GetAllMaterials {
    getAllMaterials {
      _id
      category
      lastUpdated
      name
      priceUSD
      quantity
      unit
      unitCoverage {
        height_ft
        length_ft
        length_in
        sqft
        thickness_in
        weight_lb
        weight_ton
        width_ft
        width_in
      }
      vendor
    }
  }
`;

export default function MaterialInput({
  materials,
  onMaterialsChange,
}: MaterialInputProps) {
  const { loading, error, data } = useQuery(QUERY_ALL_MATERIALS);

  const materialsList: MaterialOption[] = data
    ? data.getAllMaterials.map((m: any) => ({ _id: m._id, name: m.name }))
    : [];

  const addMaterial = () => {
    onMaterialsChange([
      ...materials,
      {
        id: Date.now().toString(),
        name: '',
        quantity: 1,
        unit: 'pieces',
        priceUSD: 0,
      },
    ]);
  };

  const updateMaterial = (
    id: string,
    field: keyof MaterialInputProps['materials'][0],
    value: any
  ) => {
    onMaterialsChange(
      materials.map((material) =>
        material.id === id ? { ...material, [field]: value } : material
      )
    );
  };

  const removeMaterial = (id: string) => {
    onMaterialsChange(materials.filter((material) => material.id !== id));
  };

  const handleMaterialSelect = (
    materialId: string,
    currentMaterialId: string
  ) => {
    const selected = data?.getAllMaterials.find((m: any) => m._id === materialId);
    if (selected) {
      onMaterialsChange(
        materials.map((material) =>
          material.id === currentMaterialId
            ? {
                ...material,
                name: selected.name,
                id: selected._id,
                priceUSD: selected.priceUSD || 0,
              }
            : material
        )
      );
    }
  };

  if (loading) return <p>Loading materials...</p>;
  if (error) return <p>Error loading materials: {error.message}</p>;

  return (
    <div className="materials">
      {materials.map((material) => (
        <div key={material.id} className="material-item">
          <select
            value={
              materialsList.find((m) => m.name === material.name)?._id || ''
            }
            onChange={(e) =>
              handleMaterialSelect(e.target.value, material.id)
            }
            className="material-select"
          >
            <option value="">Select Material</option>
            {materialsList.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={material.quantity}
            onChange={(e) =>
              updateMaterial(material.id, 'quantity', Number(e.target.value))
            }
            min="1"
            className="material-quantity-input"
          />
          <button
            type="button"
            className="remove-material-button"
            onClick={() => removeMaterial(material.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addMaterial}>
        + Add Material
      </button>
    </div>
  );
}

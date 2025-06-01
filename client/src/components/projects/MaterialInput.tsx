import React from 'react';
import { Material } from '../../types/project';

interface MaterialInputProps {
  materials: Material[];
  materialOptions: Material[];
  onMaterialsChange: (updatedMaterials: Material[]) => void;
}

const MaterialInput: React.FC<MaterialInputProps> = ({
  materials,
  materialOptions,
  onMaterialsChange,
}) => {
  // Update quantity for material with _id
  const updateQuantity = (_id: string, quantity: number) => {
    const updated = materials.map((mat) =>
      mat._id === _id ? { ...mat, quantity } : mat
    );
    onMaterialsChange(updated);
  };

  // Remove material by _id
  const removeMaterial = (_id: string) => {
    onMaterialsChange(materials.filter((mat) => mat._id !== _id));
  };

  // Add material from options if not already added
  const addMaterial = (_id: string) => {
    if (materials.some((m) => m._id === _id)) return; // Prevent duplicates
    const matToAdd = materialOptions.find((m) => m._id === _id);
    if (matToAdd) {
      onMaterialsChange([...materials, { ...matToAdd, quantity: 1 }]);
    }
  };

  return (
    <div>
      {materials.length === 0 && <p>No materials added yet.</p>}

      {materials.map((mat) => {
        const fullInfo = materialOptions.find((m) => m._id === mat._id);
        return (
          <div key={mat._id} style={{ marginBottom: 12 }}>
            <div>
              <strong>{mat.name || fullInfo?.name}</strong>{' '}
              <small>({mat.unit || fullInfo?.unit})</small>
            </div>
            <div>
              Quantity:{' '}
              <input
                type="number"
                min={0}
                value={mat.quantity || 0}
                onChange={(e) =>
                  updateQuantity(mat._id, parseFloat(e.target.value) || 0)
                }
              />
              <button onClick={() => removeMaterial(mat._id)}>Remove</button>
            </div>
          </div>
        );
      })}

      <hr />

      <div>
        <label htmlFor="add-material-select">Add Material:</label>{' '}
        <select
          id="add-material-select"
          onChange={(e) => {
            if (e.target.value) {
              addMaterial(e.target.value);
              e.target.value = '';
            }
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Select a material
          </option>
          {materialOptions
            .filter((m) => !materials.some((mat) => mat._id === m._id))
            .map((mat) => (
              <option key={mat._id} value={mat._id}>
                {mat.name} ({mat.unit})
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default MaterialInput;

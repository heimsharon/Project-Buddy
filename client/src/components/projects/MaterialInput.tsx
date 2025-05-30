import React from 'react';

interface MaterialInputProps {
  materials: Array<{
    id: string;
    name: string;
    quantity: number;
    unit: 'sqft' | 'pieces' | 'gallons';
    cost: number;
    category?: string; 
  }>;
  onMaterialsChange: (
    materials: MaterialInputProps['materials']
  ) => void;
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
        unit: 'pieces',
        cost: 0,
      },
    ]);
  };

  const updateMaterial = (id: string, field: keyof MaterialInputProps['materials'][0], value: any) => {
    onMaterialsChange(
      materials.map((material) =>
        material.id === id ? { ...material, [field]: value } : material
      )
    );
  };

  return (
    <div className="materials">
      {materials.map((material) => (
        <div key={material.id}>
     <select 
            value={material.name}
            onChange={(e) =>
              updateMaterial(material.id, 'name', e.target.value)
            }
            className="material-select"
            >

          <option value="concrete">Concrete</option>
          <option value="paint">Paint</option>
          <option value="tile">Tile</option>
          <option value="wood">Wood</option>
          <option value="steel">Steel</option>
          <option value="drywall">Drywall</option>
          <option value="insulation">Insulation</option>
          <option value="roofing">Roofing</option>
          <option value="plumbing">Plumbing</option>
          <option value="electrical">Electrical</option>
          <option value="landscaping">Landscaping</option>
          <option value="hardware">Hardware</option>
          <option value="tools">Tools</option>
          <option value="HVAC">HVAC</option>
          <option value="siding">Siding</option>
          <option value="masonry">Masonry</option>
          <option value="fencing">Fencing</option>
          <option value="other">Other</option>
       
     </select>
          <input
            type="number"
            value={material.quantity}
            onChange={(e) =>
              updateMaterial(material.id, 'quantity', Number(e.target.value))
            }
            min="1"
          />
          {/* Add unit selector and cost input */}
        </div>
      ))}
      <button type="button" onClick={addMaterial}>
        + Add Material
      </button>
    </div>
  );
}
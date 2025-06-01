import React, { useState } from 'react';
import { unitCoverage } from '../../types/project';
import { Material } from '../../types/project';

export interface MaterialCalculatorProps {
  materialOptions: Material[];
  onAddMaterial: (material: {
    name: string;
    category: string;
    unit: string;
    unitCoverage: unitCoverage;
    quantity: number;
    priceUSD: number;
    vendor?: string;
    lastUpdated: Date;
  }) => void;
  selectedMaterialId?: string; // optional initial selection
}

const MaterialCalculator: React.FC<MaterialCalculatorProps> = ({
  materialOptions,
  onAddMaterial,
  selectedMaterialId,
}) => {
  const [selected, setSelected] = useState<Material | null>(() => {
    if (selectedMaterialId) {
      return materialOptions.find((m) => m.id === selectedMaterialId) || null;
    }
    return null;
  });
  const [area, setArea] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number | null>(null);

  const calculate = () => {
    if (!selected || !area) return;
    const coveragePerUnit = selected.unitCoverage?.sqft ?? 10; // fallback to 10 sqft
    const qty = Math.ceil(Number(area) / Number(coveragePerUnit));
    setQuantity(qty);
  };

  const handleAdd = () => {
    if (!selected || quantity === null) return;

    onAddMaterial({
      name: selected.name,
      category: selected.category,
      unit: selected.unit,
      unitCoverage: selected.unitCoverage,
      quantity,
      priceUSD: selected.priceUSD,
      vendor: selected.vendor,
      lastUpdated: selected.lastUpdated,
    });

    setSelected(null);
    setArea('');
    setQuantity(null);
  };

  return (
    <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
      <h3>Quick Material Calculator</h3>
      <label>
        Material:
        <select
          value={selected ? selected.id : ''}
          onChange={(e) => {
            const mat = materialOptions.find((m) => m.id === e.target.value) || null;
            setSelected(mat);
            setQuantity(null);
          }}
          style={{ marginLeft: 8 }}
        >
          <option value="">Select material</option>
          {materialOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Area/Volume:
        <input
          type="number"
          min={1}
          value={area}
          onChange={(e) =>
            setArea(e.target.value === '' ? '' : Number(e.target.value))
          }
          style={{ width: 100, marginLeft: 8 }}
        />
      </label>
      <br />
      <button
        type="button"
        onClick={calculate}
        disabled={!selected || !area}
        style={{ marginTop: 8 }}
      >
        Calculate
      </button>
      {quantity !== null && selected && (
        <div style={{ marginTop: 12 }}>
          <strong>
            You need approximately {quantity} {selected.unit} of {selected.name}
          </strong>
          <br />
          <button type="button" onClick={handleAdd}>
            Add to Materials
          </button>
        </div>
      )}
    </div>
  );
};

export default MaterialCalculator;

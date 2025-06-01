import React, { useState, useEffect } from "react";
import { Material } from "../../types/project";

interface MaterialCalculatorProps {
  materialOptions: Material[];
  onAddMaterial: (material: Material) => void;
}

const MaterialCalculator: React.FC<MaterialCalculatorProps> = ({
  materialOptions,
  onAddMaterial,
}) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>("");
  const [selected, setSelected] = useState<Material | null>(null);
  const [area, setArea] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number | null>(null);

  // Debug: Log the materialOptions when component renders
  useEffect(() => {
    console.log("materialOptions:", materialOptions);
  }, [materialOptions]);

  const handleSelectChange = (id: string) => {
    console.log("Selected ID:", id);
    setSelectedMaterialId(id);
    // Try matching by both `id` and `_id` for robustness
    const mat =
      materialOptions.find(
        (m) => m._id === id || (m as any)._id === id
      ) || null;
    console.log("Selected material:", mat);
    setSelected(mat);
    setQuantity(null);
  };

  const calculate = () => {
    if (!selected || !area) {
      console.warn("Calculate failed: selected or area is missing");
      return;
    }

    const coveragePerUnit: number = selected.unitCoverage?.sqft ?? 10;
    console.log("Coverage per unit:", coveragePerUnit);

    const qty = Math.ceil(Number(area) / coveragePerUnit);
    console.log("Calculated quantity:", qty);
    setQuantity(qty);
  };

  const handleAdd = () => {
    if (!selected || quantity === null) {
      console.warn("Add failed: selected or quantity is missing");
      return;
    }

    onAddMaterial({
      ...selected,
      quantity,
    });

    setSelected(null);
    setSelectedMaterialId("");
    setArea("");
    setQuantity(null);
  };

  return (
    <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
      <h3>Quick Material Calculator</h3>
      <label>
        Material:
        <select
          value={selectedMaterialId}
          onChange={(e) => handleSelectChange(e.target.value)}
          style={{ marginLeft: 8 }}
        >
          <option value="">Select material</option>
          {materialOptions.map((opt) => (
            <option key={opt._id || (opt as any)._id} value={opt._id || (opt as any)._id}>
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
            setArea(e.target.value === "" ? "" : Number(e.target.value))
          }
          style={{ width: 100, marginLeft: 8 }}
        />
      </label>
      <br />
      <button
        type="button"
        onClick={() => {
          console.log("Calculate button clicked");
          calculate();
        }}
        disabled={!selected || !area || isNaN(Number(area))}
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

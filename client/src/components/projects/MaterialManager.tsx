import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_MATERIALS } from "../../utils/queries";
import MaterialInput from "./MaterialInput";
import MaterialCalculator from "./MaterialCalculator";
import { Material, UnitCoverage } from "../../types/project";

function mapUnitCoverage(raw: any): UnitCoverage {
  return {
    length_ft: raw.length_ft,
    width_ft: raw.width_ft,
    height_ft: raw.height_ft,
    width_in: raw.width_in,
    length_in: raw.length_in,
    thickness_in: raw.thickness_in,
    weight_lb: raw.weight_lb,
    weight_ton: raw.weight_ton,
    sqft: raw.sqft,
  };
}

const MaterialsManager: React.FC = () => {
  const { data, loading, error } = useQuery(QUERY_ALL_MATERIALS);

  // Store full material objects (with quantity, etc.)
  const [materials, setMaterials] = useState<Material[]>([]);
  const [materialOptions, setMaterialOptions] = useState<Material[]>([]);

  useEffect(() => {
    if (data?.getAllMaterials) {
      const opts: Material[] = data.getAllMaterials.map((mat: any) => ({
        id: mat._id,
        name: mat.name,
        category: mat.category,
        unit: mat.unit,
        unitCoverage: mapUnitCoverage(mat.unitCoverage),
        quantity: 0, // initial quantity 0 or 1
        priceUSD: mat.priceUSD,
        vendor: mat.vendor,
        lastUpdated: new Date(mat.lastUpdated),
      }));
      setMaterialOptions(opts);
    }
  }, [data]);

  // Add new material object
  const handleAddMaterial = (material: Material) => {
    setMaterials((prev) => [...prev, material]);
  };

  // Update whole materials list (e.g. quantity changed or removed)
  const handleMaterialsChange = (updatedMaterials: Material[]) => {
    setMaterials(updatedMaterials);
  };

  if (loading) return <p>Loading materials...</p>;
  if (error) return <p>Error loading materials: {error.message}</p>;

  return (
    <div>
      <h2>Manage Materials</h2>

      <MaterialCalculator
        materialOptions={materialOptions}
        onAddMaterial={handleAddMaterial}
      />

      <hr />

      <MaterialInput
        materials={materials}
        onMaterialsChange={handleMaterialsChange}
        materialOptions={materialOptions}
      />
    </div>
  );
};

export default MaterialsManager;

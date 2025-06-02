import React, { useState } from 'react';
import '../assets/styles/calculator.css';

function MaterialCalculator() {
  const [material, setMaterial] = useState('concrete');
  const [length, setLength] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [depth, setDepth] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    let volume, area, value;

    switch (material) {
      case 'concrete':
        volume = length * width * depth; // in cubic feet
        value = volume / 0.6; // 1 bag = 0.6 cu ft (80 lb bag)
        setResult(`${Math.ceil(value)} bags of concrete`);
        break;

      case 'paint':
        area = length * width;
        value = area / 350; // 1 gallon covers ~350 sq ft
        setResult(`${Math.ceil(value)} gallons of paint`);
        break;

      case 'tile':
        area = length * width;
        value = area / 1; // assume each tile covers 1 sq ft
        setResult(`${Math.ceil(value)} tiles needed`);
        break;

      default:
        setResult(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Material Calculator</h2>

      <select
        className="w-full p-2 border mb-4"
        value={material}
        onChange={(e) => {
          setMaterial(e.target.value);
          setResult(null); // Reset result
        }}
      >
        <option value="concrete">Concrete</option>
        <option value="paint">Paint</option>
        <option value="tile">Tile</option>
      </select>

      <div className="space-y-2">
        <input
          type="number"
          placeholder="Length (ft)"
          className="w-full border p-2"
          onChange={(e) => setLength(parseFloat(e.target.value))}
        />
        <input
          type="number"
          placeholder="Width (ft)"
          className="w-full border p-2"
          onChange={(e) => setWidth(parseFloat(e.target.value))}
        />
        {material === 'concrete' && (
          <input
            type="number"
            placeholder="Depth (ft)"
            className="w-full border p-2"
            onChange={(e) => setDepth(parseFloat(e.target.value))}
          />
        )}

        <button
          onClick={calculate}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Calculate
        </button>
      </div>

      {result && (
        <p className="mt-4 text-lg font-medium text-green-700">
          Estimated: {result}
        </p>
      )}
    </div>
  );
}

export default MaterialCalculator;
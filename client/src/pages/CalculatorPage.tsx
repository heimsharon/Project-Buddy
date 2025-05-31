import React, { useState } from 'react';

interface MaterialCalculatorProps {
    onCalculate?: (result: { material: string; quantity: number; estimatedCost: number }) => void;
}

function MaterialCalculator({ onCalculate }: MaterialCalculatorProps) {
    const [material, setMaterial] = useState('concrete');
    const [length, setLength] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);
    const [depth, setDepth] = useState<number>(0);

    const calculate = () => {
        let volume, area, value, estimatedCost;

        switch (material) {
            case 'concrete':
                volume = length * width * depth; // in cubic feet
                value = volume / 0.6; // 1 bag = 0.6 cu ft (80 lb bag)
                estimatedCost = Math.ceil(value) * 5; // Assume $5 per bag
                onCalculate?.({
                    material: 'Concrete',
                    quantity: Math.ceil(value),
                    estimatedCost,
                });
                break;

            case 'paint':
                area = length * width;
                value = area / 350; // 1 gallon covers ~350 sq ft
                estimatedCost = Math.ceil(value) * 25; // Assume $25 per gallon
                onCalculate?.({
                    material: 'Paint',
                    quantity: Math.ceil(value),
                    estimatedCost,
                });
                break;

            case 'tile':
                area = length * width;
                value = area / 1; // assume each tile covers 1 sq ft
                estimatedCost = Math.ceil(value) * 2; // Assume $2 per tile
                onCalculate?.({
                    material: 'Tile',
                    quantity: Math.ceil(value),
                    estimatedCost,
                });
                break;

            default:
                onCalculate?.({
                    material: '',
                    quantity: 0,
                    estimatedCost: 0,
                });
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 border rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Material Calculator</h2>

            <select
                className="w-full p-2 border mb-4"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
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
                    value={length === 0 ? '' : length}
                    onChange={(e) =>
                        setLength(
                            e.target.value === ''
                                ? 0
                                : parseFloat(e.target.value)
                        )
                    }
                />
                <input
                    type="number"
                    placeholder="Width (ft)"
                    className="w-full border p-2"
                    value={width === 0 ? '' : width}
                    onChange={(e) =>
                        setWidth(
                            e.target.value === ''
                                ? 0
                                : parseFloat(e.target.value)
                        )
                    }
                />
                {material === 'concrete' && (
                    <input
                        type="number"
                        placeholder="Depth (ft)"
                        className="w-full border p-2"
                        value={depth === 0 ? '' : depth}
                        onChange={(e) =>
                            setDepth(
                                e.target.value === ''
                                    ? 0
                                    : parseFloat(e.target.value)
                            )
                        }
                    />
                )}

                <button
                    onClick={calculate}
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Calculate
                </button>
            </div>
        </div>
    );
}

export default MaterialCalculator;


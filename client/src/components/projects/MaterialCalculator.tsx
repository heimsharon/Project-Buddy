import React, { useState } from 'react';

interface MaterialOption {
    name: string;
    unit: string;
    priceUSD: number;
}

interface MaterialCalculatorProps {
    materialOptions: MaterialOption[];
    onAddMaterial: (material: {
        name: string;
        quantity: number;
        unit: string;
        cost: number;
    }) => void;
}

const MaterialCalculator: React.FC<MaterialCalculatorProps> = ({
    materialOptions,
    onAddMaterial,
}) => {
    const [selected, setSelected] = useState<MaterialOption | null>(null);
    const [area, setArea] = useState('');
    const [quantity, setQuantity] = useState<number | null>(null);

    // Example: 1 unit per 10 sq ft (customize per material)
    const calculate = () => {
        if (!selected || !area) return;
        // Simple formula, adjust as needed
        const qty = Math.ceil(Number(area) / 10);
        setQuantity(qty);
    };

    const handleAdd = () => {
        if (selected && quantity) {
            onAddMaterial({
                name: selected.name,
                quantity,
                unit: selected.unit,
                cost: selected.priceUSD,
            });
            setArea('');
            setQuantity(null);
            setSelected(null);
        }
    };

    return (
        <div style={{ border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
            <h3>Quick Material Calculator</h3>
            <label>
                Material:
                <select
                    value={selected?.name || ''}
                    onChange={(e) => {
                        const mat =
                            materialOptions.find(
                                (m) => m.name === e.target.value
                            ) || null;
                        setSelected(mat);
                        setQuantity(null);
                    }}
                >
                    <option value="">Select material</option>
                    {materialOptions.map((opt) => (
                        <option key={opt.name} value={opt.name}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </label>
            <br />
            <label>
                Area/Volume (sq ft, cu ft, etc.):
                <input
                    type="number"
                    min={1}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    style={{ width: 100, marginLeft: 8 }}
                />
            </label>
            <br />
            <button
                type="button"
                onClick={calculate}
                disabled={!selected || !area}
            >
                Calculate
            </button>
            {quantity !== null && selected && (
                <div style={{ marginTop: 12 }}>
                    <strong>
                        You need approximately {quantity} {selected.unit} of{' '}
                        {selected.name}
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

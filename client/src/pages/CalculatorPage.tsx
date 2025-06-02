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
        <div className="calculator-background">
            <div className="calculator-card">
                <h2>Material Calculator</h2>

                <select
                    className="form-input"
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

                <div className="calculator-fields">
                    <input
                        type="number"
                        placeholder="Length (ft)"
                        className="form-input"
                        onChange={(e) => setLength(parseFloat(e.target.value))}
                    />
                    <input
                        type="number"
                        placeholder="Width (ft)"
                        className="form-input"
                        onChange={(e) => setWidth(parseFloat(e.target.value))}
                    />
                    {material === 'concrete' && (
                        <input
                            type="number"
                            placeholder="Depth (ft)"
                            className="form-input"
                            onChange={(e) =>
                                setDepth(parseFloat(e.target.value))
                            }
                        />
                    )}
                </div>

                <button onClick={calculate} className="calculator-btn">
                    Calculate
                </button>

                {result && (
                    <p className="calculator-result">Estimated: {result}</p>
                )}
            </div>
        </div>
    );
}

export default MaterialCalculator;

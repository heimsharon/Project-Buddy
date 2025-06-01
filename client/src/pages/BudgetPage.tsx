import React, { useState } from 'react';
import BudgetTracker from '../components/projects/BudgetTracker';
import { BudgetItem } from '../types/project';
import '../assets/styles/budget.css';

export default function BudgetPage() {
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
        {
            id: '1',
            name: 'Lumber',
            estimatedCost: 150,
            actualCost: 145,
            category: 'materials',
        },
        {
            id: '2',
            name: 'Paint',
            estimatedCost: 75,
            actualCost: 80,
            category: 'materials',
        },
        {
            id: '3',
            name: 'Labor',
            estimatedCost: 200,
            category: 'labor',
        },
        {
            id: '4',
            name: 'Tools',
            estimatedCost: 50,
            actualCost: 65,
            category: 'tools',
        },
    ]);
    const [isSaving, setIsSaving] = useState(false);
    const [showSaved, setShowSaved] = useState(false);

    // Calculate totals
    const totalEstimated = budgetItems.reduce(
        (sum, item) => sum + item.estimatedCost,
        0
    );
    const totalActual = budgetItems.reduce(
        (sum, item) => sum + (item.actualCost || 0),
        0
    );
    const difference = totalEstimated - totalActual;
    const percentUsed =
        totalEstimated > 0 ? (totalActual / totalEstimated) * 100 : 0;

    const handleItemUpdate = (
        id: string,
        field: keyof BudgetItem,
        value: any
    ) => {
        setBudgetItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const handleAddItem = () => {
        setBudgetItems((prevItems) => [
            ...prevItems,
            {
                id: Date.now().toString(),
                name: 'New Item',
                estimatedCost: 0,
                category: 'materials',
            },
        ]);
    };

    const handleDeleteItem = (id: string) => {
        setBudgetItems((prevItems) =>
            prevItems.filter((item) => item.id !== id)
        );
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setShowSaved(true);
            setTimeout(() => setShowSaved(false), 2000);
        }, 1000);
    };

    const handleReset = () => {
        // Optionally, reset to initial state or fetch from backend
        window.location.reload();
    };

    return (
        <div className="budget-background">
            <div className="budget-main">
                <h2>Project Budget</h2>

                {/* Total Cost Summary */}
                <BudgetSummaryCard
                    totalEstimated={totalEstimated}
                    totalActual={totalActual}
                    difference={difference}
                    percentUsed={percentUsed}
                />

                {/* Budget Tracker Table */}
                <BudgetTracker
                    items={budgetItems}
                    onItemUpdate={handleItemUpdate}
                    onItemDelete={handleDeleteItem}
                />

                {/* Action Buttons */}
                <div className="budget-actions">
                    <button
                        onClick={handleAddItem}
                        className="btn btn-add"
                        aria-label="Add budget item"
                        disabled={isSaving}
                    >
                        ➕ Add Budget Item
                    </button>
                    <button
                        onClick={handleSave}
                        className="btn btn-save"
                        aria-label="Save budget"
                        disabled={isSaving}
                    >
                        💾 {isSaving ? 'Saving...' : 'Save Budget'}
                    </button>
                    <button
                        onClick={handleReset}
                        className="btn btn-reset"
                        aria-label="Reset budget"
                        disabled={isSaving}
                    >
                        🔄 Reset
                    </button>
                </div>
                {showSaved && <div className="budget-toast">Budget saved!</div>}
                {budgetItems.length === 0 && (
                    <div className="budget-empty-state">
                        <p>
                            No budget items yet. Click "Add Budget Item" to get
                            started!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

// --- Extracted summary card for clarity and reuse ---
function BudgetSummaryCard({
    totalEstimated,
    totalActual,
    difference,
    percentUsed,
}: {
    totalEstimated: number;
    totalActual: number;
    difference: number;
    percentUsed: number;
}) {
    return (
        <div
            className="budget-summary-card"
            role="region"
            aria-label="Budget summary"
        >
            <h3>Total Project Cost</h3>
            <div className="summary-grid">
                <div className="summary-item">
                    <span className="summary-label">Estimated:</span>
                    <span className="summary-value estimated">
                        ${totalEstimated.toFixed(2)}
                    </span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Actual:</span>
                    <span className="summary-value actual">
                        ${totalActual.toFixed(2)}
                    </span>
                </div>
                <div className="summary-item">
                    <span className="summary-label">Difference:</span>
                    <span
                        className={`summary-value ${
                            difference >= 0 ? 'under-budget' : 'over-budget'
                        }`}
                    >
                        ${Math.abs(difference).toFixed(2)}{' '}
                        {difference >= 0 ? 'under' : 'over'}
                    </span>
                </div>
            </div>
            <div className="budget-progress" aria-label="Budget usage progress">
                <div
                    className="progress-bar"
                    style={{
                        width: `${Math.min(100, percentUsed)}%`,
                        backgroundColor:
                            totalActual > totalEstimated
                                ? '#e74c3c'
                                : '#2ecc71',
                    }}
                ></div>
                <span>{percentUsed.toFixed(1)}% of budget used</span>
            </div>
        </div>
    );
}

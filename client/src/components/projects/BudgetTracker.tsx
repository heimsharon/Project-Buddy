import React from 'react';
import { BudgetItem } from '../../types/project';

interface BudgetTrackerProps {
    items: BudgetItem[];
    onItemUpdate: (id: string, field: keyof BudgetItem, value: any) => void;
    onItemDelete: (id: string) => void;
}

function BudgetTableRow({
    item,
    onItemUpdate,
    onItemDelete,
}: {
    item: BudgetItem;
    onItemUpdate: (id: string, field: keyof BudgetItem, value: any) => void;
    onItemDelete: (id: string) => void;
}) {
    // Validation: prevent negative numbers
    const handleNumberChange = (field: keyof BudgetItem, value: string) => {
        const num = Number(value);
        if (num < 0) return;
        onItemUpdate(item.id, field, num);
    };

    return (
        <tr>
            <td>
                <input
                    value={item.name}
                    onChange={(e) =>
                        onItemUpdate(item.id, 'name', e.target.value)
                    }
                    aria-label="Budget item name"
                />
            </td>
            <td>
                <input
                    type="number"
                    min={0}
                    value={item.estimatedCost}
                    onChange={(e) =>
                        handleNumberChange('estimatedCost', e.target.value)
                    }
                    aria-label="Estimated cost"
                />
            </td>
            <td>
                <input
                    type="number"
                    min={0}
                    value={item.actualCost || ''}
                    onChange={(e) =>
                        handleNumberChange('actualCost', e.target.value)
                    }
                    aria-label="Actual cost"
                />
            </td>
            <td>
                <select
                    value={item.category}
                    onChange={(e) =>
                        onItemUpdate(
                            item.id,
                            'category',
                            e.target.value as BudgetItem['category']
                        )
                    }
                    aria-label="Category"
                >
                    <option value="materials">Materials</option>
                    <option value="labor">Labor</option>
                    <option value="tools">Tools</option>
                    <option value="other">Other</option>
                </select>
            </td>
            <td>
                <button
                    className="btn btn-delete"
                    aria-label="Delete budget item"
                    onClick={() => {
                        if (window.confirm('Delete this item?'))
                            onItemDelete(item.id);
                    }}
                >
                    🗑️
                </button>
            </td>
        </tr>
    );
}

export default function BudgetTracker({
    items,
    onItemUpdate,
    onItemDelete,
}: BudgetTrackerProps) {

    return (
        <div className="budget-table-container">
            <h3>Budget Items</h3>
            <table className="budget-table" aria-label="Budget items table">
                <caption className="sr-only">Budget items</caption>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Estimated</th>
                        <th>Actual</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center' }}>
                                No budget items. Add one to get started!
                            </td>
                        </tr>
                    ) : (
                        items.map((item) => (
                            <BudgetTableRow
                                key={item.id}
                                item={item}
                                onItemUpdate={onItemUpdate}
                                onItemDelete={onItemDelete}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

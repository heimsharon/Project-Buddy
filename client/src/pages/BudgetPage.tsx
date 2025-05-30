import React, { useState } from 'react';
import BudgetTracker from '../components/projects/BudgetTracker';
import { BudgetItem } from '../types/project';

export default function BudgetPage() {
  // Initialize with sample budget items
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([
    {
      id: '1',
      name: 'Lumber',
      estimatedCost: 150,
      actualCost: 145,
      category: 'materials'
    },
    {
      id: '2',
      name: 'Paint',
      estimatedCost: 75,
      actualCost: 80,
      category: 'materials'
    },
    {
      id: '3',
      name: 'Labor',
      estimatedCost: 200,
      category: 'labor'
    }
  ]);

  // Handler for budget item updates
  const handleItemUpdate = (
    id: string, 
    field: keyof BudgetItem, 
    value: any
  ) => {
    setBudgetItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  // Handler for adding new budget items
  const handleAddItem = () => {
    setBudgetItems(prevItems => [
      ...prevItems,
      {
        id: Date.now().toString(),
        name: 'New Item',
        estimatedCost: 0,
        category: 'materials'
      }
    ]);
  };

  return (
    <div className="budget-page">
      <h2>Project Budget</h2>
      <BudgetTracker 
        items={budgetItems} 
        onItemUpdate={handleItemUpdate} 
      />
      <button 
        onClick={handleAddItem}
        className="add-budget-item"
      >
        + Add Budget Item
      </button>
    </div>
  );
}
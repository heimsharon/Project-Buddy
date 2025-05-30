import React from 'react';
import { BudgetItem } from '../../types/project';

interface BudgetTrackerProps {
  items: BudgetItem[];
  onItemUpdate: (id: string, field: keyof BudgetItem, value: any) => void;
}

export default function BudgetTracker({
  items,
  onItemUpdate,
}: BudgetTrackerProps) {
  const totalEstimated = items.reduce(
    (sum, item) => sum + item.estimatedCost,
    0
  );
  const totalActual = items.reduce(
    (sum, item) => sum + (item.actualCost || 0),
    0
  );

  return (
    <div className="budget-tracker">
      <h3>Budget Summary</h3>
      <div className="budget-totals">
        <span>Estimated: ${totalEstimated.toFixed(2)}</span>
        <span>Actual: ${totalActual.toFixed(2)}</span>
        <span>
          Difference: ${(totalEstimated - totalActual).toFixed(2)}
        </span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Estimated</th>
            <th>Actual</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  value={item.name}
                  onChange={(e) =>
                    onItemUpdate(
                      item.id,
                      'name',
                      e.target.value
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.estimatedCost}
                  onChange={(e) =>
                    onItemUpdate(
                      item.id,
                      'estimatedCost',
                      Number(e.target.value)
                    )
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={item.actualCost || ''}
                  onChange={(e) =>
                    onItemUpdate(
                      item.id,
                      'actualCost',
                      e.target.value
                        ? Number(e.target.value)
                        : undefined
                    )
                  }
                />
              </td>
              <td>
                <select
                  value={item.category}
                  onChange={(e) =>
                    onItemUpdate(
                      item.id,
                      'category',
                      e.target
                        .value as BudgetItem['category']
                    )
                  }
                >
                  <option value="materials">Materials</option>
                  <option value="labor">Labor</option>
                  <option value="tools">Tools</option>
                  <option value="other">Other</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

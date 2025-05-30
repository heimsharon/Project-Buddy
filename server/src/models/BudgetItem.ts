import { Schema, model, Document, ObjectId } from 'mongoose';

interface IBudgetItem extends Document {
  projectId: ObjectId;
  name: string;
  estimatedCost: number;
  actualCost?: number;
  quantity: number;
}

const budgetItemSchema = new Schema<IBudgetItem>({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  estimatedCost: {
    type: Number,
    required: true
  },
  actualCost: {
    type: Number,
    default: 0
  },
  quantity: {
    type: Number,
    default: 1
  },
});

const BudgetItem = model<IBudgetItem>('BudgetItem', budgetItemSchema);
export default BudgetItem;
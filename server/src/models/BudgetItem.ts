import { Schema, model, Document, ObjectId } from 'mongoose';

interface IBudgetItem extends Document {
  projectId: ObjectId;
  name: string;
  cost: number;
  quantity: number;
  notes?: string;
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
  cost: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  },
  notes: String
});

const BudgetItem = model<IBudgetItem>('BudgetItem', budgetItemSchema);
export default BudgetItem;
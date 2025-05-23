import { Schema, model, Document, Types } from 'mongoose';

interface IBudgetItem extends Document {
  projectId: Types.ObjectId;
  materialId?: Types.ObjectId;
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
  materialId: {
    type: Schema.Types.ObjectId,
    ref: 'Material'
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
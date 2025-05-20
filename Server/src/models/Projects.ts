import { Schema, model, Document, Types } from 'mongoose';

interface IProject extends Document {
    title: string;
    description?: string;
    type: string;
    dimensions?: {
      length?: number;
      width?: number;
      height?: number;
    };
    createdBy: Types.ObjectId;
    materials: Types.ObjectId[];
    checklist: Types.ObjectId[];
    budget: Types.ObjectId[];
    createdAt: Date;
    dueDate?: Date;
  }
  
  const projectSchema = new Schema<IProject>({
    title: { type: String, required: true },
    description: String,
    type: { type: String },
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    materials: [{
      type: Schema.Types.ObjectId,
      ref: 'Material'
    }],
    checklist: [{
      type: Schema.Types.ObjectId,
      ref: 'Task'
    }],
    budget: [{
      type: Schema.Types.ObjectId,
      ref: 'BudgetItem'
    }],
    createdAt: {
      type: Date,
      default: Date.now
    },
    dueDate: {
      type: Date,
      default: null
    }
  });
  
  const Project = model<IProject>('Project', projectSchema);
  export default Project;
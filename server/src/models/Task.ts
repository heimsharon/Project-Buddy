import { Schema, model, Document, Types } from 'mongoose';

interface ITask extends Document {
  projectId: Types.ObjectId;
  title: string;
  dueDate?: Date;
  completed: boolean;
  notes?: string;
}

const taskSchema = new Schema<ITask>({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  title: { type: String, required: true },
  dueDate: Date,
  completed: {
    type: Boolean,
    default: false
  },
  notes: String
});

const Task = model<ITask>('Task', taskSchema);
export default Task;
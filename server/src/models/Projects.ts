import { Schema, model, Document, ObjectId } from 'mongoose';

interface IProject extends Document {
    title: string;
    description?: string;
    type: string;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    estimatedBudget: number;
    actualBudget?: number;
    userId: ObjectId;
    materialIds: ObjectId[];
    createdAt: Date;
    dueDate?: Date;
}

const projectSchema = new Schema<IProject>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    type: {
        type: String,
    },
    dimensions: {
        length: {
            type: Number,
            default: null,
        },
        width: {
            type: Number,
            default: null,
        },
        height: {
            type: Number,
            default: null,
        },
    },
    estimatedBudget: {
        type: Number,
        default: 0,
    },
    actualBudget: {
        type: Number,
        default: 0,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    materialIds: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Material',
            required: true,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    dueDate: {
        type: Date,
        default: null,
    },
});

const Project = model<IProject>('Project', projectSchema);
export default Project;

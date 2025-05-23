import {Schema, model, Document, Types} from 'mongoose';

interface IMessage {
    sender: 'user' | 'bot';
    message: string;
    timestamp: Date;
    updatedAt?: Date;
}

interface IChatLog extends Document {
    projectId: Types.ObjectId;
    messages: IMessage[];
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
    sender: {
        type: String,
        enum: ['user', 'bot'],
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, {_id: false});

const chatlogSchema = new Schema<IChatLog>({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    messages: {
        type: [messageSchema],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

// automatically update the updatedAt field on message "push"
chatlogSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

//index updatedAt field for faster queries
chatlogSchema.index({updatedAt: -1});

const ChatLog = model<IChatLog>('ChatLog', chatlogSchema);
export default ChatLog;
import {Schema, model, Document, Types} from 'mongoose';

interface IMessage {
    sender: 'user' | 'bot';
    message: string;
    timestamp: Date;
}

interface IChatLog extends Document {
    projectId: Types.ObjectId;
    messages: IMessage[];
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
    sender: {
        type: String,
        enum: ['user', 'bot'],
        required: true
    },
    messages: {
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
    }
})

const ChatLog = model<IChatLog>('ChatLog', chatlogSchema);
export default ChatLog;





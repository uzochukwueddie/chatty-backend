import mongoose, { Model, model, Schema } from 'mongoose';
import { IConversationDocument } from '@chat/interfaces/conversation.interface';

const conversationSchema: Schema = new Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const ConversationModel: Model<IConversationDocument> = model<IConversationDocument>('Conversation', conversationSchema, 'Conversation');
export { ConversationModel };

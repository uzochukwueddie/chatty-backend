import mongoose, { Document } from 'mongoose';

export interface IConversationDocument extends Document {
  _id: mongoose.Types.ObjectId;
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
}

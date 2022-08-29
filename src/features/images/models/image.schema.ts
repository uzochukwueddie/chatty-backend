import mongoose, { model, Model, Schema } from 'mongoose';
import { IFileImageDocument } from '@image/interfaces/image.interface';

const imageSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  bgImageVersion: { type: String, default: '' },
  bgImageId: { type: String, default: '' },
  imgVersion: { type: String, default: '' },
  imgId: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now, index: true }
});

const ImageModel: Model<IFileImageDocument> = model<IFileImageDocument>('Image', imageSchema, 'Image');
export { ImageModel };

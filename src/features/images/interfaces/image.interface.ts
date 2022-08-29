import mongoose from 'mongoose';

export interface IFileImageDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId | string;
  bgImageVersion: string;
  bgImageId: string;
  imgId: string;
  imgVersion: string;
  createdAt: Date;
}

export interface IFileImageJobData {
  key?: string;
  value?: string;
  imgId?: string;
  imgVersion?: string;
  userId?: string;
  imageId?: string;
}

export interface IBgUploadResponse {
  version: string;
  publicId: string;
  public_id?: string;
}

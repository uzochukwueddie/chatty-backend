/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { IFileImageDocument } from '@image/interfaces/image.interface';
import { AuthPayload } from '@auth/interfaces/auth.interface';
import { IJWT } from './auth.mock';
import mongoose from 'mongoose';

export const imagesMockRequest = (sessionData: IJWT, body: any, currentUser?: AuthPayload | null, params?: IParams) => ({
  session: sessionData,
  body,
  params,
  currentUser
});

export const imagesMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export interface IParams {
  followerId?: string;
  userId?: string;
  imageId?: string;
  bgImageId?: string;
}

export const fileDocumentMock: IFileImageDocument = {
  userId: new mongoose.Types.ObjectId('60263f14648fed5246e322d9'),
  bgImageVersion: '2468',
  bgImageId: '12345',
  imgVersion: '',
  imgId: '',
  createdAt: new Date()
} as IFileImageDocument;

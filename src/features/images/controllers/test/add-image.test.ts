/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { Server } from 'socket.io';
import * as imageServer from '@socket/image';
import { imagesMockRequest, imagesMockResponse } from '@root/mocks/image.mock';
import { Add } from '@image/controllers/add-image';
import { CustomError } from '@global/helpers/error-handler';
import { authUserPayload } from '@root/mocks/auth.mock';
import { UserCache } from '@service/redis/user.cache';
import { existingUser } from '@root/mocks/user.mock';
import { imageQueue } from '@service/queues/image.queue';
import * as cloudinaryUploads from '@global/helpers/cloudinary-upload';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/user.cache');
jest.mock('@socket/user');
jest.mock('@global/helpers/cloudinary-upload');

Object.defineProperties(imageServer, {
  socketIOImageObject: {
    value: new Server(),
    writable: true
  }
});

describe('Add', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('profileImage', () => {
    it('should call image upload method', async () => {
      const req: Request = imagesMockRequest({}, { image: 'testing' }, authUserPayload) as Request;
      const res: Response = imagesMockResponse();
      jest.spyOn(cloudinaryUploads, 'uploads').mockImplementation((): any => Promise.resolve({ version: '1234', public_id: '123456' }));

      await Add.prototype.profileImage(req, res);
      expect(cloudinaryUploads.uploads).toHaveBeenCalledWith(req.body.image, req.currentUser?.userId, true, true);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Image added successfully'
      });
    });

    it('should call updateSingleUserItemInCache method', async () => {
      const req: Request = imagesMockRequest({}, { image: 'testing' }, authUserPayload) as Request;
      const res: Response = imagesMockResponse();
      jest.spyOn(UserCache.prototype, 'updateSingleUserItemInCache').mockResolvedValue(existingUser);
      jest.spyOn(imageServer.socketIOImageObject, 'emit');
      jest.spyOn(cloudinaryUploads, 'uploads').mockImplementation((): any => Promise.resolve({ version: '1234', public_id: '123456' }));

      const url = 'https://res.cloudinary.com/dyamr9ym3/image/upload/v1234/123456';

      await Add.prototype.profileImage(req, res);
      expect(UserCache.prototype.updateSingleUserItemInCache).toHaveBeenCalledWith(`${req.currentUser?.userId}`, 'profilePicture', url);
      expect(imageServer.socketIOImageObject.emit).toHaveBeenCalledWith('update user', existingUser);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Image added successfully'
      });
    });

    it('should call addImageJob method', async () => {
      const req: Request = imagesMockRequest({}, { image: 'testing' }, authUserPayload) as Request;
      const res: Response = imagesMockResponse();
      jest.spyOn(cloudinaryUploads, 'uploads').mockImplementation((): any => Promise.resolve({ version: '1234', public_id: '123456' }));
      jest.spyOn(imageQueue, 'addImageJob');

      await Add.prototype.profileImage(req, res);
      expect(imageQueue.addImageJob).toHaveBeenCalledWith('addUserProfileImageToDB', {
        key: `${req.currentUser?.userId}`,
        value: 'https://res.cloudinary.com/dyamr9ym3/image/upload/v1234/123456',
        imgId: '123456',
        imgVersion: '1234'
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Image added successfully'
      });
    });
  });

  describe('backgroundImage', () => {
    it('should upload new image', async () => {
      const req: Request = imagesMockRequest({}, { image: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==' }, authUserPayload) as Request;
      const res: Response = imagesMockResponse();
      jest.spyOn(cloudinaryUploads, 'uploads').mockImplementation((): any => Promise.resolve({ version: '2467', public_id: '987654' }));

      await Add.prototype.backgroundImage(req, res);
      expect(cloudinaryUploads.uploads).toHaveBeenCalledWith(req.body.image);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Image added successfully'
      });
    });

    it('should not upload existing image', async () => {
      const req: Request = imagesMockRequest(
        {},
        { image: 'https://res.cloudinary.com/dyamr9ym3/image/upload/v1234/123456' },
        authUserPayload
      ) as Request;
      const res: Response = imagesMockResponse();
      jest.spyOn(cloudinaryUploads, 'uploads');

      await Add.prototype.backgroundImage(req, res);
      expect(cloudinaryUploads.uploads).not.toHaveBeenCalledWith(req.body.image);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Image added successfully'
      });
    });

    it('should return bad request error', async () => {
      const req: Request = imagesMockRequest({}, { image: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==' }, authUserPayload) as Request;
      const res: Response = imagesMockResponse();
      jest
        .spyOn(cloudinaryUploads, 'uploads')
        .mockImplementation((): any => Promise.resolve({ version: '', public_id: '', message: 'Upload error' }));

      Add.prototype.backgroundImage(req, res).catch((error: CustomError) => {
        expect(error.statusCode).toEqual(400);
        expect(error.serializeErrors().message).toEqual('Upload error');
      });
    });

    it('should call updateSingleUserItemInCache method', async () => {
      const req: Request = imagesMockRequest({}, { image: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==' }, authUserPayload) as Request;
      const res: Response = imagesMockResponse();
      jest.spyOn(UserCache.prototype, 'updateSingleUserItemInCache').mockResolvedValue(existingUser);
      jest.spyOn(imageServer.socketIOImageObject, 'emit');
      jest.spyOn(cloudinaryUploads, 'uploads').mockImplementation((): any => Promise.resolve({ version: '1234', public_id: '123456' }));

      await Add.prototype.backgroundImage(req, res);
      expect(UserCache.prototype.updateSingleUserItemInCache).toHaveBeenCalledWith(`${req.currentUser!.userId}`, 'bgImageId', '123456');
      expect(UserCache.prototype.updateSingleUserItemInCache).toHaveBeenCalledWith(
        `${req.currentUser!.userId}`,
        'bgImageVersion',
        '1234'
      );
      expect(imageServer.socketIOImageObject.emit).toHaveBeenCalledWith('update user', {
        bgImageId: '123456',
        bgImageVersion: '1234',
        userId: existingUser
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Image added successfully'
      });
    });

    it('should call addImageJob method', async () => {
      const req: Request = imagesMockRequest({}, { image: 'data:text/plain;base64,SGVsbG8sIFdvcmxkIQ==' }, authUserPayload) as Request;
      const res: Response = imagesMockResponse();
      jest.spyOn(cloudinaryUploads, 'uploads').mockImplementation((): any => Promise.resolve({ version: '1234', public_id: '123456' }));
      jest.spyOn(imageQueue, 'addImageJob');

      await Add.prototype.backgroundImage(req, res);
      expect(imageQueue.addImageJob).toHaveBeenCalledWith('updateBGImageInDB', {
        key: `${req.currentUser?.userId}`,
        imgId: '123456',
        imgVersion: '1234'
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Image added successfully'
      });
    });
  });
});

import { Request, Response } from 'express';
import { authUserPayload } from '@root/mocks/auth.mock';
import { Delete } from '@chat/controllers/delete-chat-message';
import { Server } from 'socket.io';
import * as chatServer from '@socket/chat';
import { chatMockRequest, chatMockResponse, mockMessageId } from '@root/mocks/chat.mock';
import { existingUser } from '@root/mocks/user.mock';
import { MessageCache } from '@service/redis/message.cache';
import { chatQueue } from '@service/queues/chat.queue';
import { messageDataMock } from '@root/mocks/chat.mock';
import mongoose from 'mongoose';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/message.cache');

Object.defineProperties(chatServer, {
  socketIOChatObject: {
    value: new Server(),
    writable: true
  }
});

describe('Delete', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('markMessageAsDeleted', () => {
    it('should send correct json response (deleteForMe)', async () => {
      const req: Request = chatMockRequest({}, {}, authUserPayload, {
        senderId: `${existingUser._id}`,
        receiverId: '60263f14648fed5246e322d8',
        messageId: `${mockMessageId}`,
        type: 'deleteForMe'
      }) as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(MessageCache.prototype, 'markMessageAsDeleted').mockResolvedValue(messageDataMock);
      jest.spyOn(chatServer.socketIOChatObject, 'emit');
      jest.spyOn(chatQueue, 'addChatJob');

      await Delete.prototype.markMessageAsDeleted(req, res);
      expect(chatServer.socketIOChatObject.emit).toHaveBeenCalledTimes(2);
      expect(chatServer.socketIOChatObject.emit).toHaveBeenCalledWith('message read', messageDataMock);
      expect(chatServer.socketIOChatObject.emit).toHaveBeenCalledWith('chat list', messageDataMock);
      expect(chatQueue.addChatJob).toHaveBeenCalledWith('markMessageAsDeletedInDB', {
        messageId: new mongoose.Types.ObjectId(mockMessageId),
        type: 'deleteForMe'
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Message marked as deleted'
      });
    });

    it('should send correct json response (deleteForEveryone)', async () => {
      const req: Request = chatMockRequest({}, {}, authUserPayload, {
        senderId: `${existingUser._id}`,
        receiverId: '60263f14648fed5246e322d8',
        messageId: `${mockMessageId}`,
        type: 'deleteForEveryone'
      }) as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(MessageCache.prototype, 'markMessageAsDeleted').mockResolvedValue(messageDataMock);
      jest.spyOn(chatServer.socketIOChatObject, 'emit');
      jest.spyOn(chatQueue, 'addChatJob');

      await Delete.prototype.markMessageAsDeleted(req, res);
      expect(chatServer.socketIOChatObject.emit).toHaveBeenCalledTimes(2);
      expect(chatServer.socketIOChatObject.emit).toHaveBeenCalledWith('message read', messageDataMock);
      expect(chatServer.socketIOChatObject.emit).toHaveBeenCalledWith('chat list', messageDataMock);
      expect(chatQueue.addChatJob).toHaveBeenCalledWith('markMessageAsDeletedInDB', {
        messageId: new mongoose.Types.ObjectId(mockMessageId),
        type: 'deleteForEveryone'
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Message marked as deleted'
      });
    });
  });
});

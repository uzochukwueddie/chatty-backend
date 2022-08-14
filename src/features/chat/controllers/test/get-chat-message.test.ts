import { Request, Response } from 'express';
import { authUserPayload } from '@root/mocks/auth.mock';
import { chatMessage, chatMockRequest, chatMockResponse, messageDataMock } from '@root/mocks/chat.mock';
import { MessageCache } from '@service/redis/message.cache';
import { Get } from '@chat/controllers/get-chat-message';
import { chatService } from '@service/db/chat.service';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/message.cache');

describe('Get', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('conversationList', () => {
    it('should send correct json response if chat list exist in redis', async () => {
      const req: Request = chatMockRequest({}, {}, authUserPayload) as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(MessageCache.prototype, 'getUserConversationList').mockResolvedValue([messageDataMock]);

      await Get.prototype.conversationList(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User conversation list',
        list: [messageDataMock]
      });
    });

    it('should send correct json response if no chat list response from redis', async () => {
      const req: Request = chatMockRequest({}, {}, authUserPayload) as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(MessageCache.prototype, 'getUserConversationList').mockResolvedValue([]);
      jest.spyOn(chatService, 'getUserConversationList').mockResolvedValue([messageDataMock]);

      await Get.prototype.conversationList(req, res);
      expect(chatService.getUserConversationList).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User conversation list',
        list: [messageDataMock]
      });
    });

    it('should send correct json response with empty chat list if it does not exist (redis & database)', async () => {
      const req: Request = chatMockRequest({}, chatMessage, authUserPayload) as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(MessageCache.prototype, 'getUserConversationList').mockResolvedValue([]);
      jest.spyOn(chatService, 'getUserConversationList').mockResolvedValue([]);

      await Get.prototype.conversationList(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User conversation list',
        list: []
      });
    });
  });

  describe('messages', () => {
    it('should send correct json response if chat messages exist in redis', async () => {
      const req: Request = chatMockRequest({}, chatMessage, authUserPayload, {
        receiverId: '60263f14648fed5246e322d8'
      }) as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(MessageCache.prototype, 'getChatMessagesFromCache').mockResolvedValue([messageDataMock]);

      await Get.prototype.messages(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User chat messages',
        messages: [messageDataMock]
      });
    });

    it('should send correct json response if no chat message response from redis', async () => {
      const req: Request = chatMockRequest({}, chatMessage, authUserPayload, {
        receiverId: '60263f14648fed5246e322d8'
      }) as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(MessageCache.prototype, 'getChatMessagesFromCache').mockResolvedValue([]);
      jest.spyOn(chatService, 'getMessages').mockResolvedValue([messageDataMock]);

      await Get.prototype.messages(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User chat messages',
        messages: [messageDataMock]
      });
    });

    it('should send correct json response with empty chat messages if it does not exist (redis & database)', async () => {
      const req: Request = chatMockRequest({}, chatMessage, authUserPayload, {
        receiverId: '6064793b091bf02b6a71067a'
      }) as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(MessageCache.prototype, 'getChatMessagesFromCache').mockResolvedValue([]);
      jest.spyOn(chatService, 'getMessages').mockResolvedValue([]);

      await Get.prototype.messages(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User chat messages',
        messages: []
      });
    });
  });
});

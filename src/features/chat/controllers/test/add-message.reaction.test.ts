import { Request, Response } from 'express';
import { authUserPayload } from '@root/mocks/auth.mock';
import { Server } from 'socket.io';
import * as chatServer from '@socket/chat';
import { chatMockRequest, chatMockResponse, mockMessageId } from '@root/mocks/chat.mock';
import { MessageCache } from '@service/redis/message.cache';
import { chatQueue } from '@service/queues/chat.queue';
import { messageDataMock } from '@root/mocks/chat.mock';
import { Message } from '@chat/controllers/add-message-reaction';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/message.cache');

Object.defineProperties(chatServer, {
  socketIOChatObject: {
    value: new Server(),
    writable: true
  }
});

describe('Message', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('message', () => {
    it('should call updateMessageReaction', async () => {
      const req: Request = chatMockRequest(
        {},
        {
          conversationId: '602854c81c9ca7939aaeba43',
          messageId: `${mockMessageId}`,
          reaction: 'love',
          type: 'add'
        },
        authUserPayload
      ) as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(MessageCache.prototype, 'updateMessageReaction').mockResolvedValue(messageDataMock);
      jest.spyOn(chatServer.socketIOChatObject, 'emit');

      await Message.prototype.reaction(req, res);
      expect(MessageCache.prototype.updateMessageReaction).toHaveBeenCalledWith(
        '602854c81c9ca7939aaeba43',
        `${mockMessageId}`,
        'love',
        `${authUserPayload.username}`,
        'add'
      );
      expect(chatServer.socketIOChatObject.emit).toHaveBeenCalledTimes(1);
      expect(chatServer.socketIOChatObject.emit).toHaveBeenCalledWith('message reaction', messageDataMock);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Message reaction added'
      });
    });

    it('should call chatQueue addChatJob', async () => {
      const req: Request = chatMockRequest(
        {},
        {
          conversationId: '602854c81c9ca7939aaeba43',
          messageId: `${mockMessageId}`,
          reaction: 'love',
          type: 'add'
        },
        authUserPayload
      ) as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(chatQueue, 'addChatJob');

      await Message.prototype.reaction(req, res);
      expect(chatQueue.addChatJob).toHaveBeenCalledWith('updateMessageReaction', {
        messageId: mockMessageId,
        senderName: req.currentUser!.username,
        reaction: 'love',
        type: 'add'
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Message reaction added'
      });
    });
  });
});

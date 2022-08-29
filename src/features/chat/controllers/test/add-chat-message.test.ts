import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import * as chatServer from '@socket/chat';
import { chatMessage, chatMockRequest, chatMockResponse } from '@root/mocks/chat.mock';
import { Add } from '@chat/controllers/add-chat-message';
import { chatQueue } from '@service/queues/chat.queue';
import { authUserPayload } from '@root/mocks/auth.mock';
import { MessageCache } from '@service/redis/message.cache';
import { emailQueue } from '@service/queues/email.queue';
import { existingUser, existingUserTwo } from '@root/mocks/user.mock';
import { notificationTemplate } from '@service/emails/templates/notifications/notification-template';
import { UserCache } from '@service/redis/user.cache';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@socket/user');
jest.mock('@service/redis/user.cache');
jest.mock('@service/redis/message.cache');
jest.mock('@service/queues/email.queue');

Object.defineProperties(chatServer, {
  socketIOChatObject: {
    value: new Server(),
    writable: true
  }
});

describe('Add', () => {
  beforeEach(() => {
    jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue(existingUser);
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should call socket.io emit twice', async () => {
    jest.spyOn(chatServer.socketIOChatObject, 'emit');
    const req: Request = chatMockRequest({}, chatMessage, authUserPayload) as Request;
    const res: Response = chatMockResponse();

    await Add.prototype.message(req, res);
    expect(chatServer.socketIOChatObject.emit).toHaveBeenCalledTimes(2);
  });

  it('should call addEmailJob method', async () => {
    existingUserTwo.notifications.messages = true;
    const req: Request = chatMockRequest({}, chatMessage, authUserPayload) as Request;
    const res: Response = chatMockResponse();
    jest.spyOn(UserCache.prototype, 'getUserFromCache').mockResolvedValue(existingUserTwo);
    jest.spyOn(emailQueue, 'addEmailJob');

    const templateParams = {
      username: existingUserTwo.username!,
      message: chatMessage.body,
      header: `Message notification from ${req.currentUser!.username}`
    };
    const template: string = notificationTemplate.notificationMessageTemplate(templateParams);

    await Add.prototype.message(req, res);
    expect(emailQueue.addEmailJob).toHaveBeenCalledWith('directMessageEmail', {
      receiverEmail: existingUserTwo.email!,
      template,
      subject: `You've received messages from ${req.currentUser!.username!}`
    });
  });

  it('should not call addEmailJob method', async () => {
    chatMessage.isRead = true;
    const req: Request = chatMockRequest({}, chatMessage, authUserPayload) as Request;
    const res: Response = chatMockResponse();
    jest.spyOn(emailQueue, 'addEmailJob');

    const templateParams = {
      username: existingUserTwo.username!,
      message: chatMessage.body,
      header: `Message Notification from ${req.currentUser!.username}`
    };
    const template: string = notificationTemplate.notificationMessageTemplate(templateParams);

    await Add.prototype.message(req, res);
    expect(emailQueue.addEmailJob).not.toHaveBeenCalledWith('directMessageMail', {
      receiverEmail: req.currentUser!.email,
      template,
      subject: `You've received messages from ${existingUserTwo.username!}`
    });
  });

  it('should call addChatListToCache twice', async () => {
    jest.spyOn(MessageCache.prototype, 'addChatListToCache');
    const req: Request = chatMockRequest({}, chatMessage, authUserPayload) as Request;
    const res: Response = chatMockResponse();

    await Add.prototype.message(req, res);
    expect(MessageCache.prototype.addChatListToCache).toHaveBeenCalledTimes(2);
  });

  it('should call addChatMessageToCache', async () => {
    jest.spyOn(MessageCache.prototype, 'addChatMessageToCache');
    const req: Request = chatMockRequest({}, chatMessage, authUserPayload) as Request;
    const res: Response = chatMockResponse();

    await Add.prototype.message(req, res);
    expect(MessageCache.prototype.addChatMessageToCache).toHaveBeenCalledTimes(1);
  });

  it('should call chatQueue addChatJob', async () => {
    jest.spyOn(chatQueue, 'addChatJob');
    const req: Request = chatMockRequest({}, chatMessage, authUserPayload) as Request;
    const res: Response = chatMockResponse();

    await Add.prototype.message(req, res);
    expect(chatQueue.addChatJob).toHaveBeenCalledTimes(1);
  });

  it('should send correct json response', async () => {
    const req: Request = chatMockRequest({}, chatMessage, authUserPayload) as Request;
    const res: Response = chatMockResponse();

    await Add.prototype.message(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Message added',
      conversationId: new mongoose.Types.ObjectId(`${chatMessage.conversationId}`)
    });
  });
});

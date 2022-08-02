import { Request, Response } from 'express';
import { Server } from 'socket.io';
import { authUserPayload } from '@root/mocks/auth.mock';
import * as postServer from '@socket/post';
import { newPost, postMockRequest, postMockResponse } from '@root/mocks/post.mock';
import { postQueue } from '@service/queues/post.queue';
import { Delete } from '@post/controllers/delete-post';
import { PostCache } from '@service/redis/post.cache';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/post.cache');

Object.defineProperties(postServer, {
  socketIOPostObject: {
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

  it('should send correct json response', async () => {
    const req: Request = postMockRequest(newPost, authUserPayload, { postId: '12345' }) as Request;
    const res: Response = postMockResponse();
    jest.spyOn(postServer.socketIOPostObject, 'emit');
    jest.spyOn(PostCache.prototype, 'deletePostFromCache');
    jest.spyOn(postQueue, 'addPostJob');

    await Delete.prototype.post(req, res);
    expect(postServer.socketIOPostObject.emit).toHaveBeenCalledWith('delete post', req.params.postId);
    expect(PostCache.prototype.deletePostFromCache).toHaveBeenCalledWith(req.params.postId, `${req.currentUser?.userId}`);
    expect(postQueue.addPostJob).toHaveBeenCalledWith('deletePostFromDB', { keyOne: req.params.postId, keyTwo: req.currentUser?.userId });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Post deleted successfully'
    });
  });
});

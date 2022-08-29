import { Request, Response } from 'express';
import { chatMockRequest, chatMockResponse } from '@root/mocks/chat.mock';
import { authUserPayload } from '@root/mocks/auth.mock';
import { searchedUserMock } from '@root/mocks/user.mock';
import { Search } from '@user/controllers/search-user';
import { userService } from '@service/db/user.service';

jest.useFakeTimers();
jest.mock('@service/queues/base.queue');
jest.mock('@service/redis/user.cache');

describe('Search', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('user', () => {
    it('should send correct json response if searched user exist', async () => {
      const req: Request = chatMockRequest({}, {}, authUserPayload, { query: 'Danny' }) as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(userService, 'searchUsers').mockResolvedValue([searchedUserMock]);

      await Search.prototype.user(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Search results',
        search: [searchedUserMock]
      });
    });

    it('should send correct json response if searched user does not exist', async () => {
      const req: Request = chatMockRequest({}, {}, authUserPayload, { query: 'DannyBoy' }) as Request;
      const res: Response = chatMockResponse();
      jest.spyOn(userService, 'searchUsers').mockResolvedValue([]);

      await Search.prototype.user(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Search results',
        search: []
      });
    });
  });
});

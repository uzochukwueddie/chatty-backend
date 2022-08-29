import { Response } from 'express';
import { IJWT } from './auth.mock';
import { AuthPayload } from '@auth/interfaces/auth.interface';
import { existingUserTwo } from '@root/mocks/user.mock';
import mongoose from 'mongoose';
import { IFollowerData } from '@follower/interfaces/follower.interface';

export const followersMockRequest = (sessionData: IJWT, currentUser?: AuthPayload | null, params?: IParams) => ({
  session: sessionData,
  params,
  currentUser
});

export const followersMockResponse = (): Response => {
  const res: Response = {} as Response;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export interface IParams {
  followerId?: string;
  followeeId?: string;
  userId?: string;
}

export const mockFollowerData: IFollowerData = {
  avatarColor: `${existingUserTwo.avatarColor}`,
  followersCount: existingUserTwo.followersCount,
  followingCount: existingUserTwo.followingCount,
  profilePicture: `${existingUserTwo.profilePicture}`,
  postCount: existingUserTwo.postsCount,
  username: `${existingUserTwo.username}`,
  uId: `${existingUserTwo.uId}`,
  _id: new mongoose.Types.ObjectId(existingUserTwo._id)
};

export const followerData = {
  _id: '605727cd646cb50e668a4e13',
  followerId: {
    username: 'Manny',
    postCount: 5,
    avatarColor: '#ff9800',
    followersCount: 3,
    followingCount: 5,
    profilePicture: 'https://res.cloudinary.com/ratingapp/image/upload/605727cd646eb50e668a4e13'
  },
  followeeId: {
    username: 'Danny',
    postCount: 10,
    avatarColor: '#ff9800',
    followersCount: 3,
    followingCount: 5,
    profilePicture: 'https://res.cloudinary.com/ratingapp/image/upload/605727cd646eb50e668a4e13'
  }
};

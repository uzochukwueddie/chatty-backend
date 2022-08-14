import { config } from '@root/config';
import { chatService } from '@service/db/chat.service';
import { DoneCallback, Job } from 'bull';
import Logger from 'bunyan';

const log: Logger = config.createLogger('chatWorker');

class ChatWorker {
  async addChatMessageToDB(jobQueue: Job, done: DoneCallback): Promise<void> {
    try {
      await chatService.addMessageToDB(jobQueue.data);
      jobQueue.progress(100);
      done(null, jobQueue.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async markMessageAsDeleted(jobQueue: Job, done: DoneCallback): Promise<void> {
    try {
      const { messageId, type } = jobQueue.data;
      await chatService.markMessageAsDeleted(messageId, type);
      jobQueue.progress(100);
      done(null, jobQueue.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async markMessagesAsReadInDB(jobQueue: Job, done: DoneCallback): Promise<void> {
    try {
      const { senderId, receiverId } = jobQueue.data;
      await chatService.markMessagesAsRead(senderId, receiverId);
      jobQueue.progress(100);
      done(null, jobQueue.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async updateMessageReaction(jobQueue: Job, done: DoneCallback): Promise<void> {
    try {
      const { messageId, senderName, reaction, type } = jobQueue.data;
      await chatService.updateMessageReaction(messageId, senderName, reaction, type);
      jobQueue.progress(100);
      done(null, jobQueue.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }
}

export const chatWorker: ChatWorker = new ChatWorker();

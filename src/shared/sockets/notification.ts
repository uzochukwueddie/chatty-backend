import { Server } from 'socket.io';

let socketIONotificationObject: Server;

export class SocketIONotificationHandler {
  public listen(io: Server): void {
    socketIONotificationObject = io;
  }
}

export { socketIONotificationObject };

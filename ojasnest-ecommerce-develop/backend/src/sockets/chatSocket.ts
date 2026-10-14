import { Server, Socket } from 'socket.io';

export const initChatSockets = (io: Server, socket: Socket) => {
  socket.on('join_chat', (roomId: string) => {
    socket.join(roomId);
  });

  socket.on('send_message', (data: any) => {
    io.to(data.roomId).emit('receive_message', data);
  });
};
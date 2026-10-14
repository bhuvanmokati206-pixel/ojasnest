import { Server, Socket } from 'socket.io';
import { OrderStatus } from '@prisma/client';

export const initOrderSockets = (io: Server, socket: Socket) => {
  socket.on('join:order', (orderId: string) => {
    socket.join(`order:${orderId}`);
  });

  socket.on('leave:order', (orderId: string) => {
    socket.leave(`order:${orderId}`);
  });
};

export const emitOrderStatusUpdate = (io: Server, orderId: string, status: OrderStatus) => {
  io.to(`order:${orderId}`).emit('order:status_change', { orderId, status });
};
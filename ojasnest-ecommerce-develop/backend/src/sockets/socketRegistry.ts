import { Server, Socket } from 'socket.io';
import { initOrderSockets } from './orderSocket';
import { initChatSockets } from './chatSocket';
import { prisma } from '../config/db';

export const socketRegistry = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    // Inventory queries
    socket.on('stock:query', async (productId: string) => {
      try {
        const product = await prisma.product.findUnique({
          where: { id: productId },
          select: { id: true, stock: true },
        });
        if (product) {
          socket.emit('stock:update', {
            productId: product.id,
            currentStock: product.stock,
          });
        }
      } catch (err) {
        console.error('Error handling stock query:', err);
      }
    });

    initOrderSockets(io, socket);
    initChatSockets(io, socket);

    socket.on('disconnect', () => {});
  });
};
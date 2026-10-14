import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    const total = items.reduce((sum: number, i: any) => sum + Number(i.price) * i.quantity, 0);

    const order = await prisma.order.create({
      data: {
        userId: (req as any).user?.id || 'guest',
        totalAmount: total,
        status: 'PENDING',
        trackingNumber: `OJ-${Date.now()}`,
      },
    });

    res.json({ url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/checkout/success?orderId=${order.id}` });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: { include: { product: true } } },
    });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true, user: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(order);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
import { stripe } from '../config/stripe';
import { prisma } from '../config/db';

export const createStripeSession = async (orderId: string, totalAmount: number, successUrl: string, cancelUrl: string) => {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: { name: `Ojasnest Order #${orderId}` },
          unit_amount: Math.round(totalAmount * 100),
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: { orderId },
  });
};

export const issueRefund = async (orderId: string) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order || !order.stripeSessionId) throw new Error('Valid order with payment not found');

  const session = await stripe.checkout.sessions.retrieve(order.stripeSessionId);
  if (session.payment_intent) {
    await stripe.refunds.create({ payment_intent: String(session.payment_intent) });
    return await prisma.order.update({
      where: { id: orderId },
      data: { status: 'CANCELLED' },
    });
  }
};
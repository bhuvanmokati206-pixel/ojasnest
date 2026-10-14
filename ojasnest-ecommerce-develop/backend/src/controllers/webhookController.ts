import { Request, Response } from 'express';

export const handleStripeWebhook = async (_req: Request, res: Response) => {
  res.json({ received: true });
};
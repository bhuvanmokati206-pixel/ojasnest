import { logger } from '../utils/logger';

export const sendTransactionalEmail = async (to: string, subject: string, bodyHtml: string) => {
  logger.info(`[Email Service] Dispatched to: ${to} | Subject: ${subject}`);
  return Promise.resolve({ success: true, timestamp: new Date().toISOString() });
};
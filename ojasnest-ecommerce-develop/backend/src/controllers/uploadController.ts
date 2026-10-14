import { Request, Response } from 'express';

export const getPresignedUrl = async (req: Request, res: Response) => {
  const { fileName } = req.body;
  res.json({
    uploadUrl: `https://mock-s3.local/${fileName}`,
    publicUrl: `https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c`,
  });
};
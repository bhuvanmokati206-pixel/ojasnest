import { Request, Response } from 'express';
import { prisma } from '../config/db';

export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.json(categories);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await prisma.category.create({ data: req.body });
    res.status(201).json(category);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
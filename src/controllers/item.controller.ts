import { Request, Response, NextFunction } from 'express';
import * as itemService from '../services/item.service';
import { createItemSchema, updateItemSchema } from '../schemas/item.schema';

export async function getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await itemService.getAll();
    res.status(200).json(items);
  } catch (err) {
    next(err);
  }
}

export async function getById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const item = await itemService.getById(req.params.id as string);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
}

export async function create(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = createItemSchema.parse(req.body);
    const userId = req.user!.sub;
    const item = await itemService.create(dto, userId);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

export async function update(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dto = updateItemSchema.parse(req.body);
    const item = await itemService.update(req.params.id as string, dto);
    res.status(200).json(item);
  } catch (err) {
    next(err);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await itemService.remove(req.params.id as string);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
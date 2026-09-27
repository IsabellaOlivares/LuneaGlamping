import { Item, IItem } from '../models/item.model.js';
import type { CreateItemDto, UpdateItemDto } from '../schemas/item.schema.js';

export async function findAll(): Promise<IItem[]> {
  return Item.find({ active: true }).sort({ createdAt: -1 });
}

export async function findById(id: string): Promise<IItem | null> {
  return Item.findById(id);
}

export async function create(data: CreateItemDto, userId: string): Promise<IItem> {
  return Item.create({ ...data, createdBy: userId });
}

export async function update(
  id: string,
  data: UpdateItemDto,
  requesterId: string,
  requesterRole: string
): Promise<IItem | null> {
  const item = await Item.findById(id);
  if (!item) return null;

  if (requesterRole !== 'admin' && item.createdBy !== requesterId) {
    throw new Error('FORBIDDEN');
  }

  return Item.findByIdAndUpdate(id, data, { new: true });
}

export async function remove(id: string): Promise<IItem | null> {
  return Item.findByIdAndDelete(id);
}
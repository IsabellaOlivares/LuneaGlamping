import { ItemModel, IItem } from '../models/item.model';
import { CreateItemDto, UpdateItemDto } from '../schemas/item.schema';

export async function findAll(): Promise<IItem[]> {
  return ItemModel.find().sort({ createdAt: -1 });
}

export async function findById(id: string): Promise<IItem | null> {
  return ItemModel.findById(id);
}

export async function create(data: CreateItemDto & { createdBy: string }): Promise<IItem> {
  return ItemModel.create(data);
}

export async function updateById(
  id: string,
  data: UpdateItemDto
): Promise<IItem | null> {
  return ItemModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteById(id: string): Promise<boolean> {
  const result = await ItemModel.findByIdAndDelete(id);
  return result !== null;
}
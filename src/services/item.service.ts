import { IItem } from '../models/item.model';
import * as itemRepository from '../repositories/item.repository';
import { CreateItemDto, UpdateItemDto } from '../schemas/item.schema';
import { AppError } from '../errors/AppError';

export async function getAll(): Promise<IItem[]> {
  return itemRepository.findAll();
}

export async function getById(id: string): Promise<IItem> {
  const item = await itemRepository.findById(id);
  if (!item) {
    throw new AppError(404, 'Plan no encontrado');
  }
  return item;
}

export async function create(dto: CreateItemDto, userId: string): Promise<IItem> {
  return itemRepository.create({ ...dto, createdBy: userId });
}

export async function update(id: string, dto: UpdateItemDto): Promise<IItem> {
  await getById(id);
  const updated = await itemRepository.updateById(id, dto);
  if (!updated) {
    throw new AppError(404, 'Plan no encontrado');
  }
  return updated;
}

export async function remove(id: string): Promise<void> {
  const deleted = await itemRepository.deleteById(id);
  if (!deleted) {
    throw new AppError(404, 'Plan no encontrado');
  }
}
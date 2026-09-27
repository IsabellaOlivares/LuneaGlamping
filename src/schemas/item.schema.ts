import { z } from 'zod';

export const createItemSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  description: z.string().min(1, 'La descripción es requerida'),
  category: z.enum(['Alojamiento', 'Actividad'], {
    message: 'Lacategoria debe ser alojamiento o actividad'
  }),
  price: z.number().positive('El precio debe ser mayor a 0'),
  priceUnit: z.string().min(1, 'La unidad de precio es requerida'),
  details: z.string().min(1, 'Los detalles son requeridos'),
});

export const updateItemSchema = createItemSchema.partial();

export type CreateItemDto = z.infer<typeof createItemSchema>;
export type UpdateItemDto = z.infer<typeof updateItemSchema>;
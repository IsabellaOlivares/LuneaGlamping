import { z } from 'zod';

export const createItemSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(200)
      .regex(/^[^<>]*$/, 'Name must not contain HTML characters'),
    description: z
      .string()
      .max(1000)
      .regex(/^[^<>]*$/, 'Description must not contain HTML characters')
      .optional(),
    category: z.enum(['Alojamiento', 'Actividad']),
    price: z.number().positive('Price must be positive'),
    priceUnit: z.string().min(1).max(50),
    details: z.string().min(1).max(300),
  }),
});

export const updateItemSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(200).regex(/^[^<>]*$/).optional(),
    description: z.string().max(1000).regex(/^[^<>]*$/).optional(),
    category: z.enum(['Alojamiento', 'Actividad']).optional(),
    price: z.number().positive().optional(),
    priceUnit: z.string().min(1).max(50).optional(),
    details: z.string().min(1).max(300).optional(),
    active: z.boolean().optional(),
  }),
});

export type CreateItemDto = z.infer<typeof createItemSchema>['body'];
export type UpdateItemDto = z.infer<typeof updateItemSchema>['body'];
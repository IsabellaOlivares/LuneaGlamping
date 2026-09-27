import { Schema, model, Document } from 'mongoose';

export type PlanCategory = 'Alojamiento' | 'Actividad';

export interface IItem extends Document {
  name: string;
  description?: string;
  category: PlanCategory;
  price: number;
  priceUnit: string;
  details: string;
  active: boolean;
  createdBy: string; // user ID — do NOT remove
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema<IItem>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: String, enum: ['Alojamiento', 'Actividad'], required: true },
    price: { type: Number, required: true, min: 0 },
    priceUnit: { type: String, required: true, trim: true },
    details: { type: String, required: true, trim: true },
    active: { type: Boolean, default: true },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

export const Item = model<IItem>('Item', itemSchema);
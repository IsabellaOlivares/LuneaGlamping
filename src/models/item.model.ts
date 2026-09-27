import mongoose, { Document, Schema } from 'mongoose';

export type PlanCategory = 'Alojamiento' | 'Actividad';

export interface IItem extends Document {
  name: string;
  description: string;
  category: PlanCategory;
  price: number;
  priceUnit: string;
  details: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const itemSchema = new Schema<IItem>(
  {
    name: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
    },
    category: {
      type: String,
      enum: ['Alojamiento', 'Actividad'],
      required: [true, 'La categoría es requerida'],
    },
    price: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },
    priceUnit: {
      type: String,
      required: [true, 'La unidad de precio es requerida'],
      trim: true,
    },
    details: {
      type: String,
      required: [true, 'Los detalles son requeridos'],
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const ItemModel = mongoose.model<IItem>('Item', itemSchema);
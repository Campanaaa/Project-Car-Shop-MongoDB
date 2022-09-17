import { Schema, model as moongoseModel } from 'mongoose';
import MongoModel from './MongoModel';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export const motorcycleSchema = new Schema<IMotorcycle>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  category: {
    type: String,
    enum: ['Street', 'Custom', 'Trail'],
  },
  engineCapacity: Number,
}, {
  versionKey: false,
});

export default class MotorcycleModel extends MongoModel<IMotorcycle> {
  constructor(model = moongoseModel<IMotorcycle>('Motorcycle', motorcycleSchema)) {
    super(model);
  }
}
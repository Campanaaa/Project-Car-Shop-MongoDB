import { Schema, model as moongoseModel } from 'mongoose';
import MongoModel from './MongoModel';
import { ICar } from '../interfaces/ICar';

export const carSchema = new Schema<ICar>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, {
  versionKey: false,
});

export default class CarModel extends MongoModel<ICar> {
  constructor(model = moongoseModel<ICar>('Car', carSchema)) {
    super(model);
  }
}
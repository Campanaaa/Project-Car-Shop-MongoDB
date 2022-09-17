import { IMotorcycle, motorcycleSchema } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import CustomError from '../helpers/CustomError';

export default class MotorcycleService implements IModel<IMotorcycle> {
  private _motorcycles: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycles = model;
  }

  public async create(obj: IMotorcycle): Promise<IMotorcycle> {
    const objParsed = motorcycleSchema.safeParse(obj);
    if (!objParsed.success) {
      throw new CustomError(400, 'Invalid Motorcycle Information');
    }
    const result = this._motorcycles.create(obj);
    return result;
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycles.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    return this._motorcycles.readOne(_id);
  }

  public async update(_id: string, obj: IMotorcycle): Promise<IMotorcycle | null> {
    return this._motorcycles.update(_id, obj);
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    return this._motorcycles.delete(_id);
  }
}
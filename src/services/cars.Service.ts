import { ICar, carSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import CustomError from '../helpers/CustomError';

export default class CarService implements IModel<ICar> {
  private _cars: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._cars = model;
  }

  public async create(obj: ICar): Promise<ICar> {
    const objParsed = carSchema.safeParse(obj);
    if (!objParsed.success) {
      throw new CustomError(400, 'Invalid Car Information');
    }
    this._cars.create(obj);
    return obj;
  }

  public async read(): Promise<ICar[]> {
    return this._cars.read();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    return this._cars.readOne(_id);
  }

  public async update(_id: string, obj: ICar): Promise<ICar | null> {
    return this._cars.update(_id, obj);
  }

  public async delete(_id: string): Promise<ICar | null> {
    return this._cars.delete(_id);
  }
}
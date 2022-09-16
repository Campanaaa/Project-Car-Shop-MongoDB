import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';

export default class CarController {
  private _carService: IModel<ICar>;

  constructor(model: IModel<ICar>) {
    this._carService = model;
  }

  public async create(req: Request & { body: ICar }, res: Response): Promise<Response> {
    const { body } = req;
    const result = await this._carService.create(body);
    return res.status(201).json(result);
  }

  public async read(_req: Request, res: Response<ICar[]>): Promise<Response> {
    const result = await this._carService.read();
    return res.status(200).json(result);
  }
}
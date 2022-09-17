import { Request, Response } from 'express';
import { ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import CustomError from '../helpers/CustomError';
import ErrorMessages from '../helpers/ErrorMessages';

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

  public async readOne(req: Request, res: Response<ICar>): Promise<Response> {
    const { id } = req.params;
    if (id.length !== 24) {
      throw new CustomError(400, ErrorMessages.IdError);
    }
    const result = await this._carService.readOne(id);
    if (!result) {
      throw new CustomError(404, ErrorMessages.NotFoundError);
    }
    return res.status(200).json(result);
  }

  public async update(req: Request & { body: ICar }, res: Response): Promise<Response> {
    const { id } = req.params;
    if (id.length !== 24) throw new CustomError(400, ErrorMessages.IdError);
    if (!Object.keys(req.body).length) throw new CustomError(400, ErrorMessages.BodyError);

    const result = await this._carService.update(id, req.body);

    if (!result) throw new CustomError(404, ErrorMessages.NotFoundError);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response<null>) {
    const { id } = req.params;
    if (id.length !== 24) throw new CustomError(400, ErrorMessages.IdError);
    const result = await this._carService.delete(id);
    if (!result) throw new CustomError(404, ErrorMessages.NotFoundError);
    return res.status(204).json();
  }
}
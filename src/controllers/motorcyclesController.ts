import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import CustomError from '../helpers/CustomError';
import ErrorMessages from '../helpers/ErrorMessages';

export default class MotorcycleController {
  private _motorcycleService: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycleService = model;
  }

  public async create(req: Request & { body: IMotorcycle }, res: Response): Promise<Response> {
    const { body } = req;
    const result = await this._motorcycleService.create(body);
    return res.status(201).json(result);
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>): Promise<Response> {
    const result = await this._motorcycleService.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response<IMotorcycle>): Promise<Response> {
    const { id } = req.params;
    if (id.length !== 24) {
      throw new CustomError(400, ErrorMessages.IdError);
    }
    const result = await this._motorcycleService.readOne(id);
    if (!result) {
      throw new CustomError(404, ErrorMessages.NotFoundError);
    }
    return res.status(200).json(result);
  }

  public async update(req: Request & { body: IMotorcycle }, res: Response): Promise<Response> {
    const { id } = req.params;
    if (id.length !== 24) throw new CustomError(400, ErrorMessages.IdError);
    if (!Object.keys(req.body).length) throw new CustomError(400, ErrorMessages.BodyError);

    const result = await this._motorcycleService.update(id, req.body);

    if (!result) throw new CustomError(404, ErrorMessages.NotFoundError);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response<null>) {
    const { id } = req.params;
    if (id.length !== 24) throw new CustomError(400, ErrorMessages.IdError);
    const result = await this._motorcycleService.delete(id);
    if (!result) throw new CustomError(404, ErrorMessages.NotFoundError);
    return res.status(204).json();
  }
}
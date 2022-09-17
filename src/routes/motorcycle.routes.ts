import { Router, Request, Response } from 'express';
import MotorcycleModel from '../models/MotorcyclesModel';
import MotorcycleController from '../controllers/motorcyclesController';
import MotorcycleService from '../services/motorcycles.Service';

const motorcycleRouter = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

motorcycleRouter.post('/', (req: Request, res: Response) => motorcycleController.create(req, res));

export default motorcycleRouter;
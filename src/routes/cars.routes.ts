import { Router, Request, Response } from 'express';
import CarController from '../controllers/carsController';
import CarModel from '../models/CarsModel';
import CarService from '../services/cars.Service';

const carRouter = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

carRouter.post('/', (req: Request, res: Response) => carController.create(req, res));
carRouter.get('/', (_req: Request, res: Response) => carController.read(_req, res));
carRouter.get('/:id', (req: Request, res: Response) => carController.readOne(req, res));
carRouter.put('/:id', (req: Request, res: Response) => carController.update(req, res));

export default carRouter;

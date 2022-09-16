import { Router, Request, Response } from 'express';
import CarController from '../controllers/carsController';
import CarModel from '../models/CarsModel';
import CarService from '../services/cars.Service';

const carRouter = Router();

const car = new CarModel();
const carService = new CarService(car);
const carController = new CarController(carService);

carRouter.post('/', (req: Request, res: Response) => carController.create(req, res));

export default carRouter;
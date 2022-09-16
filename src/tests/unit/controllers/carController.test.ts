import * as sinon from 'sinon';
import chai from 'chai';

import CarModel from '../../../models/CarsModel';
import CarService from '../../../services/cars.Service';
import CarController from '../../../controllers/carsController';
import { correctCar } from '../carsMock';
import { Request, Response } from 'express';

const { expect } = chai;

describe('Testa a criação de items no controller', () => {

  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  const createdCar = { ...correctCar };

  before(() => {
    sinon
      .stub(carService, 'create')
      .resolves(createdCar);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  it('Deve retornar o item criado', async () => {
    req.body = correctCar;
    await carController.create(req, res);
    expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
  });
});
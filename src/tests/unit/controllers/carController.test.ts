import Sinon, * as sinon from 'sinon';
import chai from 'chai';

import CarModel from '../../../models/CarsModel';
import CarService from '../../../services/cars.Service';
import CarController from '../../../controllers/carsController';
import { correctCar, updatedCar } from '../carsMock';
import { Request, Response } from 'express';

const { expect } = chai;

describe('Testa Controllers', () => {

  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  describe('Testa a criação de items no controller', () => {

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

    it('Deve retornar o status 200', async () => {
      req.body = correctCar;
      await carController.create(req, res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    });
  });

  describe('Testa a listagem de items no controller', () => {

    const carsList = [
      { _id: 1, ...correctCar },
      { _id: 2, ...correctCar },
      { _id: 3, ...correctCar },
    ];

    before(() => {
      sinon
        .stub(carService, 'read')
        .resolves(carsList);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
    });

    after(() => {
      sinon.restore();
    });

    it('Deve retornar o status 200', async () => {
      await carController.read(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });
  });

  describe('Testa a procura de carro por id no controller', () => {
    const createdCar = { _id: "bacbf78ac5bebf8ba7efbce9", ...correctCar };

    before(() => {
      sinon
        .stub(carService, 'readOne')
        .resolves(createdCar);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
    });

    after(() => {
      sinon.restore();
    })

    it('Deve retornar o status 200', async () => {
      req.params = { id: "bacbf78ac5bebf8ba7efbce9" };
      await carController.readOne(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });
  });

  describe('Testa o update de carro por id no controller', () => {
    const createdCar = { _id: "bacbf78ac5bebf8ba7efbce9", ...correctCar };

    before(() => {
      sinon
        .stub(carService, 'update')
        .resolves(createdCar);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();
    });

    after(() => {
      sinon.restore();
    })

    it('Deve retornar o status 200', async () => {
      req.params = { id: "bacbf78ac5bebf8ba7efbce9" };
      req.body = updatedCar;
      await carController.update(req, res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });
  });
});

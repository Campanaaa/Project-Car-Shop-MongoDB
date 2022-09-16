import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';

import CarModel from '../../../models/CarsModel';
import CarService from '../../../services/cars.Service';
import { correctCar } from '../carsMock';

const { expect } = chai;

describe('Testa Services', () => {
  describe('Testa a criação de items na service', () => {
    const createdCar = { ...correctCar };

    before(async () => {
      sinon
        .stub(Model, 'create')
        .resolves(createdCar);
    });

    after(() => {
      sinon.restore();
    })

    const carService = new CarService(new CarModel());

    it('Deve retornar o item criado', async () => {
      const result = await carService.create(correctCar);
      expect(result).to.deep.equal(createdCar);
    });
  });

  describe('Testa a listagem de items na service', () => {
    const carsList = [
      { _id: 1, ...correctCar },
      { _id: 2, ...correctCar },
      { _id: 3, ...correctCar },
    ];

    before(async () => {
      sinon
        .stub(Model, 'find')
        .resolves(carsList);
    });

    after(() => {
      sinon.restore();
    })

    const carService = new CarService(new CarModel());

    it('Deve retornar todos os itens criados', async () => {
      const result = await carService.read();
      expect(result).to.deep.equal(carsList);
    });
  });

})
import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';

import CarModel from '../../../models/CarsModel';
import CarService from '../../../services/cars.Service';
import { correctCar, updatedCar } from '../carsMock';

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

  describe('Testa a procura de carro por id na services', () => {
    const createdCar = { _id: "bacbf78ac5bebf8ba7efbce9", ...correctCar };

    before(async () => {
      sinon
        .stub(Model, 'findOne')
        .resolves(createdCar);
    });

    after(() => {
      sinon.restore();
    })

    const carService = new CarService(new CarModel());

    it('Deve retornar o carro pelo id', async () => {
      const result = await carService.readOne("bacbf78ac5bebf8ba7efbce9");
      expect(result).to.deep.equal(createdCar);
    });

  });

  describe('Testa o update de carro por id na service', () => {
    const car = { _id: "bacbf78ac5bebf8ba7efbce9", ...updatedCar };

    before(async () => {
      sinon
        .stub(Model, 'findByIdAndUpdate')
        .resolves(car);
    });

    after(() => {
      sinon.restore();
    })

    const carService = new CarService(new CarModel());

    it('Deve retornar o carro atualizado pela id', async () => {
      const result = await carService.update("bacbf78ac5bebf8ba7efbce9", updatedCar);
      expect(result).to.deep.equal(car);
    });

  });

})
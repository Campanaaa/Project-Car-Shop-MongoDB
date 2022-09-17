import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';

import CarModel from '../../../models/CarsModel';
import { correctCar, updatedCar } from '../carsMock';

const { expect } = chai;

describe('Testa Model', () => {
  describe('Testa a criação de items na model', () => {
    const createdCar = { _id: 2, ...correctCar };
    before(async () => {
      sinon
        .stub(Model, 'create')
        .resolves(createdCar);
    });

    after(() => {
      sinon.restore();
    })

    const carModel = new CarModel();

    it('Deve retornar o item criado', async () => {
      const result = await carModel.create(correctCar);
      expect(result).to.deep.equal(createdCar);
    });

  });


  describe('Testa a listagem de todos os itens na model', () => {
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

    const carModel = new CarModel();

    it('Deve retornar todos os carros', async () => {
      const result = await carModel.read();
      expect(result).to.deep.equal(carsList);
    });
  });

  describe('Testa a procura de carro por id na model', () => {
    const createdCar = { _id: "bacbf78ac5bebf8ba7efbce9", ...correctCar };

    before(async () => {
      sinon
        .stub(Model, 'findOne')
        .resolves(createdCar);
    });

    after(() => {
      sinon.restore();
    })

    const carModel = new CarModel();

    it('Deve retornar o carro pelo id', async () => {
      const result = await carModel.readOne("bacbf78ac5bebf8ba7efbce9");
      expect(result).to.deep.equal(createdCar);
    });

  });

  describe('Testa o update de carro por id na model', () => {
    const car = { _id: "bacbf78ac5bebf8ba7efbce9", ...updatedCar };

    before(async () => {
      sinon
        .stub(Model, 'findByIdAndUpdate')
        .resolves(car);
    });

    after(() => {
      sinon.restore();
    })

    const carModel = new CarModel();

    it('Deve retornar o carro atualizado pela id', async () => {
      const result = await carModel.update("bacbf78ac5bebf8ba7efbce9", updatedCar);
      expect(result).to.deep.equal(car);
    });

  });
});

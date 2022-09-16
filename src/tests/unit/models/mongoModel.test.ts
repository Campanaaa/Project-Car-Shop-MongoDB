import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';

import CarModel from '../../../models/CarsModel';
import { correctCar } from '../carsMock';

const { expect } = chai;

describe('Testa a criação de items na model', () => {
  const createdCar = { _id: '2', ...correctCar };
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
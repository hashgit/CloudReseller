/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { LOAD_PRODUCTS } from 'containers/HomePage/constants';
import { productsLoaded, displayCurrency } from 'containers/HomePage/actions';

import productsData, { getProducts } from '../saga';

const currency = 'AUD';

/* eslint-disable redux-saga/yield-effects */
describe('getProducts Saga', () => {
  let getProductsGenerator;

  beforeEach(() => {
    getProductsGenerator = getProducts();

    const selectDescriptor = getProductsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getProductsGenerator.next(currency).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the productsLoaded action if it requests the data successfully', () => {
    const response = [{
      name: 'First product',
    }, {
      name: 'Second product',
    }];
    const putDescriptor = getProductsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(productsLoaded(response)));

    const currencyPutDescriptor = getProductsGenerator.next(currency).value;
    expect(currencyPutDescriptor).toEqual(put(displayCurrency(currency)));
  });
});

describe('productsData Saga', () => {
  const productsDataSaga = productsData();

  it('should start task to watch for LOAD_PRODUCTS action', () => {
    const takeLatestDescriptor = productsDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(LOAD_PRODUCTS, getProducts));
  });
});

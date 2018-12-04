/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest, select } from 'redux-saga/effects';
import { productsLoaded, displayCurrency } from 'containers/HomePage/actions';

import request from 'utils/request';
import { LOAD_PRODUCTS } from 'containers/HomePage/constants';
import { makeSelectCurrency } from 'containers/HomePage/selectors';

/**
 */
export function* getProducts() {
  const currency = yield select(makeSelectCurrency());
  const requestURL = `${process.env.API_URL}api/products?currency=${currency}`;

  try {
    // Call our request helper (see 'utils/request')
    const products = yield call(request, requestURL);
    yield put(productsLoaded(products));
    yield put(displayCurrency(currency));
  } catch (err) {
    // yield put(repoLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* productsData() {
  yield takeLatest(LOAD_PRODUCTS, getProducts);
}

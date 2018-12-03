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
  const requestURL = `http://localhost:61168/api/products?currency=${currency}`;

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
export default function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_PRODUCTS, getProducts);
}

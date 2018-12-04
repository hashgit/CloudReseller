import { call, put, takeLatest, select } from 'redux-saga/effects';
import request from 'utils/request';
import { placed } from './actions';
import { PLACE_ORDER } from './constants';
import { makeSelectData, makeSelectCart } from './selectors';

/**
 */
export function* place() {
  const data = yield select(makeSelectData());
  const orders = yield select(makeSelectCart());

  const requestURL = `${process.env.API_URL}api/orders`;
  const payload = {
    name: data.name,
    email: data.email,
    items: orders.map((o) => ({ productId: o.product.productId, quantity: o.quantity })),
  };

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  try {
    // Call our request helper (see 'utils/request')
    yield call(request, requestURL, options);
    yield put(placed());
  } catch (err) {
    // yield put(repoLoadingError(err));
  }
}

export default function* orderSaga() {
  yield takeLatest(PLACE_ORDER, place);
}

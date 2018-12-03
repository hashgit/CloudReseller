import { ADD_PRODUCT, PLACE_ORDER, PLACED } from './constants';

export function addProduct(product) {
  return {
    type: ADD_PRODUCT,
    product
  };
}

export function placeOrder(data) {
  return {
    type: PLACE_ORDER,
    data
  };
}

export function placed() {
  return {
    type: PLACED,
  };
}

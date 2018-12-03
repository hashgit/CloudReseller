import { fromJS } from 'immutable';

import { ADD_PRODUCT, PLACE_ORDER, PLACED } from './constants';

// The initial state of the App
const initialState = fromJS({
  cart: [],
  data: null,
  placed: false,
});

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return state.update('cart', (cart) => cart.push(action.product));
    case PLACE_ORDER:
      return state.set('data', fromJS(action.data));
    case PLACED:
      return state.set('placed', true);
    default:
      return state;
  }
}

export default orderReducer;

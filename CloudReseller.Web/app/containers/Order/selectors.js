/**
 * Order selectors
 */

import { createSelector } from 'reselect';

const selectOrder = (state) => state.get('order');

const makeSelectCart = () => createSelector(
  selectOrder,
  (orderState) => orderState.get('cart').toJS()
);

const makeSelectData = () => createSelector(
  selectOrder,
  (orderState) => orderState.get('data').toJS()
);

const makeSelectPlaced = () => createSelector(
  selectOrder,
  (orderState) => orderState.get('placed')
);

export {
  selectOrder,
  makeSelectCart,
  makeSelectData,
  makeSelectPlaced,
};

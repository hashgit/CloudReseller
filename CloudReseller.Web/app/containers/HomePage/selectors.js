/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectProducts = () => createSelector(
  selectHome,
  (homeState) => homeState.get('products').toJS()
);

const makeSelectCurrency = () => createSelector(
  selectHome,
  (homeState) => homeState.get('currency')
);

const makeSelectDisplayCurrency = () => createSelector(
  selectHome,
  (homeState) => homeState.get('displayCurrency')
);

export {
  selectHome,
  makeSelectProducts,
  makeSelectCurrency,
  makeSelectDisplayCurrency,
};

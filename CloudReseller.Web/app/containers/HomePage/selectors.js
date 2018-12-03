/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectProducts = () => createSelector(
  selectHome,
  (homeState) => homeState.get('products').toJS()
);

export {
  selectHome,
  makeSelectProducts,
};

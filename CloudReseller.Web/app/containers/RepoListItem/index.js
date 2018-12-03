import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectDisplayCurrency } from 'containers/HomePage/selectors';
import { addProduct } from 'containers/Order/actions';
import RepoListItem from './RepoListItem';

const mapDispatchToProps = (dispatch) => ({
  addToCart: (product, quantity) => {
    dispatch(addProduct({ product, quantity }));
  }
});

export default connect(
  createStructuredSelector({
    currency: makeSelectDisplayCurrency()
  }),
  mapDispatchToProps
)(RepoListItem);

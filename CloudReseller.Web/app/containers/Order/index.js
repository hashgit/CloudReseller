import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { placeOrder } from './actions';
import { makeSelectCart, makeSelectPlaced } from './selectors';
import reducer from './reducer';
import Order from './Order';
import saga from './saga';

const mapDispatchToProps = (dispatch) => ({
  placeOrder: (name, email) => {
    dispatch(placeOrder({ name, email }));
  }
});

const mapStateToProps = createStructuredSelector({
  orders: makeSelectCart(),
  placed: makeSelectPlaced(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'order', saga });
const withReducer = injectReducer({ key: 'order', reducer });

export default compose(withReducer, withSaga, withConnect)(Order);
export { mapDispatchToProps };

import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class Order extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    name: '',
    email: '',
  };

  setValue(field, value) {
    this.setState((state) => {
      const newState = { ...state };
      newState[field] = value;
      return newState;
    });
  }

  placeOrder() {
    const { name, email } = this.state;

    if (name && email) {
      this.props.placeOrder(name, email);
    }
  }

  render() {
    const { orders, placed } = this.props;
    const { name, email } = this.state;

    return placed ?
      <div>
        Order placed
      </div>
      : (
        <div>
          <div>
            Name: <input type="text" className="field" placeholder="enter your name" name="name" value={name} onChange={(evt) => this.setValue('name', evt.target.value)} />
          </div>
          <div>
            Email: <input type="email" className="field" placeholder="enter your email" name="email" value={email} onChange={(evt) => this.setValue('email', evt.target.value)} />
          </div>
          <div>
            <button onClick={() => this.placeOrder()}>Place order</button>
          </div>
          <ul>
            {
              orders.map((order, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <li className="cart-order" key={order.product.productId + idx}>
                  <div>{order.product.name}</div>
                  <div>{order.quantity}</div>
                </li>))
            }
          </ul>
        </div>
      );
  }
}

Order.propTypes = {
  orders: PropTypes.array,
  placeOrder: PropTypes.func,
  placed: PropTypes.bool,
};

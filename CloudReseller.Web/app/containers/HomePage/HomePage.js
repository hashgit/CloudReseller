/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import Order from 'containers/Order';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    this.props.loadProducts();
  }

  render() {
    const { loading, error, products } = this.props;
    const reposListProps = {
      loading,
      error,
      products,
    };

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <div className="home-page">
          <section className="centered">
            <h2>Products</h2>
            <p>As supplied by our vendor</p>
          </section>
          <section>
            <h2>
              <select onChange={this.props.loadProducts}>
                <option>AUD</option>
                <option>GBP</option>
                <option>USD</option>
              </select>
            </h2>
            <ReposList {...reposListProps} />
          </section>
          <section>
            <h2>Order</h2>
            <Order />
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  products: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  loadProducts: PropTypes.func,
};

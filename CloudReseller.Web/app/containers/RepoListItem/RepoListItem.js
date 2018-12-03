/**
 * RepoListItem
 *
 * Lists the name and the issue count of a repository
 */

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'components/ListItem';
import './style.scss';

export default class RepoListItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    quantity: 0,
  };

  setQuantity(q) {
    this.setState((state) => ({ ...state, quantity: q }));
  }

  render() {
    const { quantity } = this.state;
    const { item, currency, addToCart } = this.props;
    // Put together the content of the repository
    const content = (
      <div className="repo-list-item">
        <div className="repo-list-item__name">
          <div>{item.name}</div>
          <div>{item.unitPrice} {currency}</div>
        </div>
        <div>{item.description}</div>
        <div>
          <input type="number" min="0" value={quantity} name={`${item.name}_quantity`} onChange={(evt) => this.setQuantity(evt.target.value)} />
          <button onClick={() => addToCart(item, quantity)}>Add</button>
        </div>
      </div>
    );

    // Render the content into a list item
    return (
      <ListItem key={`repo-list-item-${item.name}`} item={content} />
    );
  }
}

RepoListItem.propTypes = {
  item: PropTypes.object,
  currency: PropTypes.string,
  addToCart: PropTypes.func,
};

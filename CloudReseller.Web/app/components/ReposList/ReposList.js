import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import RepoListItem from 'containers/RepoListItem';

const ReposList = ({ loading, error, products }) => {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => (
      <ListItem item={'Something went wrong, please try again!'} />
    );
    return <List component={ErrorComponent} />;
  }

  if (products !== false) {
    return <List items={products} component={RepoListItem} />;
  }

  return null;
};

ReposList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  products: PropTypes.any
};

export default ReposList;

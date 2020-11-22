import React from 'react';
import PropTypes from 'prop-types';

export default function Layout(props) {
  const { renderHeader, renderSideBar, renderContent } = props;

  return (
    <>
      <div>{renderHeader()}</div>
      <div>{renderSideBar()}</div>
      <div>{renderContent()}</div>
    </>
  );
}

Layout.propTypes = {
  renderHeader: PropTypes.func,
  renderSideBar: PropTypes.func,
  renderContent: PropTypes.func,
};

Layout.defaultProps = {
  renderHeader: () => {},
  renderSideBar: () => {},
  renderContent: () => {},
};

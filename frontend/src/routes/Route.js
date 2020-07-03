import PropTypes from 'prop-types';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import AuthLayout from '~/pages/_layouts/auth';
import DefautLayout from '~/pages/_layouts/default';
// import { store } from '~/store';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  // const { signed } = true; // store.getState().auth;

  const signed = false;
  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/delivery" />;
  }

  const Layout = signed ? DefautLayout : AuthLayout;

  return (
    <Route
      {...rest}
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  );
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

RouteWrapper.defaultProps = {
  isPrivate: false,
  component: PropTypes.func,
};

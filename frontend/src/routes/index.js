import React from 'react';
import { Switch } from 'react-router-dom';
import Delivery from '../pages/Delivery';
import SignIn from '../pages/SignIn';
import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/delivery" exact component={Delivery} isPrivate />
    </Switch>
  );
}

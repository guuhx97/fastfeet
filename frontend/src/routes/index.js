import React from 'react';
import { Switch } from 'react-router-dom';
import Delivery from '~/pages/Delivery';
import Deliveryman from '~/pages/Deliveryman';
import Problem from '~/pages/Problem';
import Recipient from '~/pages/Recipient';
import SignIn from '~/pages/SignIn';
import Route from './Route';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/delivery" component={Delivery} isPrivate />
      <Route path="/deliveryman" component={Deliveryman} isPrivate />
      <Route path="/recipient" component={Recipient} isPrivate />
      <Route path="/problem" component={Problem} isPrivate />
    </Switch>
  );
}

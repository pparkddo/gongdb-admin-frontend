import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from '../components/navigation';
import Home from '../pages/home';
import Sequence from '../pages/sequence';
import SequenceEdit from '../pages/sequence-edit';

const Root = () => (
  <BrowserRouter>
    <Navigation />
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/sequence" component={Sequence} exact />
      <Route path="/sequence/:id" component={SequenceEdit} exact />
    </Switch>
  </BrowserRouter>
)

export default Root;
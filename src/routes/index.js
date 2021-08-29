import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from '../components/navigation';
import Home from '../pages/home';
import Sequence from '../pages/sequence';
import SequenceEdit from '../pages/sequence-edit';
import AnnouncementInput from '../pages/announcement-input';
import AnnouncementList from '../pages/announcement-list';

const Root = () => (
  <BrowserRouter>
    <Navigation />
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/sequence" component={Sequence} exact />
      <Route path="/sequence/:id" component={SequenceEdit} exact />
      <Route path="/sequence/:id/announcement" component={AnnouncementInput} exact />
      <Route path="/announcement/" component={AnnouncementList} exact />
    </Switch>
  </BrowserRouter>
)

export default Root;
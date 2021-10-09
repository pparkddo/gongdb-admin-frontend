import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from '../components/navigation';
import AnnouncementEdit from '../pages/announcement-edit';
import AnnouncementInput from '../pages/announcement-input';
import AnnouncementList from '../pages/announcement-list';
import Home from '../pages/home';
import Sequence from '../pages/sequence';
import SequenceDeleteComplete from '../pages/sequence-delete-complete';
import SequenceEdit from '../pages/sequence-edit';
import SequenceSubmitComplete from '../pages/sequence-submit-complete';
import "./index.css";

const Root = () => (
  <BrowserRouter>
    <Navigation />
    <div className="nav-padding">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/sequence" component={Sequence} exact />
        <Route path="/sequence/submit-complete" component={SequenceSubmitComplete} exact />
        <Route path="/sequence/delete-complete" component={SequenceDeleteComplete} exact />
        <Route path="/sequence/:id" component={SequenceEdit} exact />
        <Route path="/sequence/:id/announcement" component={AnnouncementInput} exact />
        <Route path="/announcement/" component={AnnouncementList} exact />
        <Route path="/announcement/:id" component={AnnouncementEdit} exact />
      </Switch>
    </div>
  </BrowserRouter>
)

export default Root;
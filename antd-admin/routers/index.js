import React from 'react'
import {HashRouter, Route, Switch, Redirect} from 'react-router-dom';

import Layout from '@components/Layout'

export default () => (
    <HashRouter>
      <Switch>
        <Route path="/" component={Layout}></Route>
      </Switch>
    </HashRouter>
);

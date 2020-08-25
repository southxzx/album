import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './component/Home';
import Layout from './hoc/layout';

const Routes = () => {
  return(
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Layout>
  )
}

export default Routes;

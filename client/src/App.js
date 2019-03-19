import React, { Fragment, } from 'react';
import { Route, Switch, } from 'react-router-dom';
import Home from './components/Home';
import DepartmentIndex from './components/DepartmentIndex.js';
import Department from './components/Department.js';
import NoMatch from './components/NoMatch';
import { Container, } from 'semantic-ui-react';

const App = () => (
  <Fragment>
    <Container>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/departments/' component={DepartmentIndex} />
        <Route exact path='/departments/:id/' component={Department} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </Fragment>
);

export default App;

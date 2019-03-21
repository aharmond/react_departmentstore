import React, { Fragment, } from 'react';
import { Route, Switch,} from 'react-router-dom';
import Helmet from 'react-helmet';
import Navbar from './components/Navbar.js';
import Home from './components/Home';
import DepartmentIndex from './components/DepartmentIndex.js';
import DepartmentForm from './components/DepartmentForm.js';
import Department from './components/Department.js';
import ItemForm from './components/ItemForm.js';
import NoMatch from './components/NoMatch';
import { Container, } from 'semantic-ui-react';

const App = () => (
  <Fragment>
    <Helmet bodyAttributes={{style: 'background-color : #2e333a'}} />
    <Container>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/departments/' component={DepartmentIndex} />
        <Route exact path='/departments/new' component={DepartmentForm} />
        <Route exact path='/departments/:id/' component={Department} />
        <Route exact path='/departments/:department_id/new' component={ItemForm} />
        <Route exact path='/departments/:department_id/items/:id/edit' component={ItemForm} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </Fragment>
);

export default App;

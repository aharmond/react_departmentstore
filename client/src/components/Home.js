import React from 'react';
import { Link, } from 'react-router-dom';
import { Header, Button, } from 'semantic-ui-react';

const Home = () => (
  <div>
    <Header as="h1">Welcome to the Department Store</Header>
    <Button as={Link} to="/departments/" color="olive">
      Browse Departments
    </Button>
  </div>
)

export default Home;
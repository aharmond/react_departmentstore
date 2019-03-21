import React from 'react';
import StyledHead from '../styles/StyledHead';
import { Link, } from 'react-router-dom';
import { Button, } from 'semantic-ui-react';

const Home = () => (
  <div>
    <StyledHead size="large">Welcome to the Department Store</StyledHead>
    <div style={{ display: "flex", justifyContent: "center"}}>
      <Button 
        as={Link} 
        to="/departments/" 
        color="teal"
        content="Browse Departments"
        size="huge"
      />
    </div>
  </div>
)

export default Home;
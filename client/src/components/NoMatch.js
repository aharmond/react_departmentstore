import React from 'react';
import StyledHead from '../styles/StyledHead';
import { Link, } from 'react-router-dom';
import { Button, } from 'semantic-ui-react';

const NoMatch = () => (
  <div style={styles.container}>
    <StyledHead size="large">Oops!</StyledHead>
    <StyledHead size="large">Nothing to see here.</StyledHead>
    <StyledHead size="small">YOU FOUND A BROKEN LINK.</StyledHead>
    <Button as={Link} to='/' color='black'>Home</Button>
  </div>
)

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px'
  },
};

export default NoMatch;
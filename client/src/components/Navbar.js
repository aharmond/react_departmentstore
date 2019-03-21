import React from 'react';
import axios from 'axios';
import { Link, withRouter, } from 'react-router-dom';
import { Menu, Dropdown } from 'semantic-ui-react';

class Navbar extends React.Component {
  state = { departments: [], };

  componentDidMount() {
    axios.get('/api/departments')
      .then( res => {
        this.setState({ departments: res.data, });
      });
  };

  render() {
    const { departments } = this.state

    return (
      <Menu inverted>
        <Menu.Item
          as={Link}
          to='/'
          name="Home"
        />
        <Menu.Item
          as={Link} 
          to='/departments'
          name='Department Index'
        />
        <Dropdown item text='Departments'>
          <Dropdown.Menu>
            {
              departments.map( department => (
                <Dropdown.Item
                  key={ department.id }
                  as={ Link }
                  to={`/departments/${department.id}`}
                >
                {department.name}
                </Dropdown.Item>
                )
              )
            }
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item
          as={Link} 
          to='/departments/new'
          name='Add Department'
        />
      </Menu> 
    )
  }
}
  
export default Navbar;
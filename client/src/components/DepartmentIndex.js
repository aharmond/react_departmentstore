import React from 'react';
import axios from 'axios';
import { Link, } from 'react-router-dom';
import { Segment, Header, Button } from 'semantic-ui-react';

class DepartmentIndex extends React.Component {
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
      <div>
        <Button as={Link} to={`/departments/new`} color='olive'>
          New Department
        </Button>
        {
          departments.map( department => (
              <Segment key={department.id}>
                <Header>{department.name}</Header>
                <Button as={Link} to={`/departments/${department.id}`} color='brown'>
                  View Department
                </Button>
              </Segment>
            )
          )
        }
      </div>
    )
  }
}

export default DepartmentIndex
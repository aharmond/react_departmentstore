import React from 'react';
import axios from 'axios';
import StyledHead from '../styles/StyledHead.js'
import { Link, } from 'react-router-dom';
import { Segment, Button } from 'semantic-ui-react';

class DepartmentIndex extends React.Component {
  state = { departments: [], };

  componentDidMount() {
    axios.get('/api/departments')
      .then( res => {
        this.setState({ departments: res.data, });
      });
  };

  deleteDepartment = (departmentId) => {
    axios.delete(`/api/departments/${departmentId}`)
      .then( res => {
        const { departments } = this.state
        this.setState({ departments: departments.filter( d => d.id !== departmentId), })
      })
  }

  render() {
    const { departments } = this.state
    return (
      <div>
        <Button inverted as={Link} to={`/departments/new`} color='olive'>
          New Department
        </Button>
        {
          departments.map( department => (
              <Segment stacked inverted key={department.id}>
                <StyledHead size="medium">{department.name}</StyledHead>
                <Button inverted as={Link} to={`/departments/${department.id}`} color='brown'>
                  View Department
                </Button>
                <Button inverted floated="right" color="red" onClick={() => this.deleteDepartment(department.id)}>
                  Delete Department
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
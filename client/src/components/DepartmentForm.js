import React from 'react';
import StyledHead from '../styles/StyledHead'
import { Form, } from 'semantic-ui-react';
import axios from 'axios';

class DepartmentForm extends React.Component {
  state = { name: "" }

  handleChange = (e) => {
    this.setState({ name: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { name } = this.state
    const department = { name }
    axios.post(`/api/departments/`, department)
      .then( res => {
        this.props.history.push(`/departments/`)
      })
  }

  render() {
    return (
      <div>
        <StyledHead>New Department</StyledHead>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            placeholder="Department Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <Form.Button inverted color="olive">Submit</Form.Button>
        </Form> 
      </div>
    )
  }
}

export default DepartmentForm;
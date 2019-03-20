import React from 'react';
import { Form, Header, } from 'semantic-ui-react';
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
        <Header>New Department</Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            placeholder="Department Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            required
          />
          <Form.Button>Submit</Form.Button>
        </Form> 
      </div>
    )
  }
}

export default DepartmentForm;
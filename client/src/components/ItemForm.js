import React from 'react';
import { Form, Header, } from 'semantic-ui-react';
import axios from 'axios';

class ItemForm extends React.Component {
  state = { name: "", description: "", price: ""}

  componentDidMount() {
    if (this.props.match.params.id)
      axios.get(`/api/departments/${this.props.match.params.department_id}/items/${this.props.match.params.id}`)
        .then( res => {
          this.setState({ ...res.data })
      })
  }

  handleChange = (e) => {
    const { target: { name, value, } } = e;
    this.setState({ [name]: value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const item = { ...this.state, };
    if (item.id) {
      axios.put(`/api/departments/${this.props.match.params.department_id}/items/${this.props.match.params.id}`, item)
      .then( res => {
        this.props.history.push(`/departments/${this.props.match.params.department_id}`)
      })
    } else {
      axios.post(`/api/departments/${this.props.match.params.department_id}/items`, item)
      .then( res => {
        this.props.history.push(`/departments/${this.props.match.params.department_id}`);
      })
    } 
  }

  render() {
    const { name, description, price, } = this.state

    return (
      <div>
        <Header as="h1">Add Item</Header>
        <Form widths="equal" onSubmit={this.handleSubmit}>
          <Form.Input
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            label="Description"
            placeholder="Description"
            name="description"
            value={description}
            onChange={this.handleChange}
            required
          />
          <Form.Input
            label="Price"
            placeholder="Price"
            name="price"
            value={price}
            onChange={this.handleChange}
            type="number"
            required
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default ItemForm;
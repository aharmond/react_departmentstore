import React from 'react';
import { Link, } from 'react-router-dom';
import { Segment, Header, Button, Form } from 'semantic-ui-react';
import axios from 'axios';

class Department extends React.Component {
  state = { department: {}, items: [], toggleEdit: false }

  componentDidMount() {
    axios.get(`/api/departments/${this.props.match.params.id}`)
      .then( res => {
        this.setState({ department: res.data, });
      })
    axios.get(`/api/departments/${this.props.match.params.id}/items`)
      .then( res => {
        this.setState({ items: res.data, });
      })
  }

  deleteItem = (itemId) => {
    axios.delete(`/api/departments/${this.props.match.params.id}/items/${itemId}`)
      .then( res=> {
        const { items, } = this.state;
        this.setState({ items: items.filter( i => i.id !== itemId), })
      })
  }

  handleChange = (e) => {
    this.setState({ department: { name: e.target.value, } })
  }

  handleSubmit =(e) => {
    e.preventDefault();
    const { name } = this.state.department
    axios.post(`api/departments/${this.state.department.id}`)
      .then( res => {
        this.setState({ department: { name: name }, })
      })
    this.toggleEdit()
  }

  renderItems = () => {
    const { items } = this.state;
    
    if (items.length <= 0)
      return <h2>Out of Stock!</h2>
    return items.map( item => (
      <Segment stacked key={item.id}>
        <Header as='h3'>{item.name}</Header>
        <Header as='h5'>{item.price}</Header>
        <Button 
          floated='right' 
          color='red' 
          onClick={() => this.deleteItem(item.id)}
        >
          Delete
        </Button>
        <Button 
          floated='right' 
          color='green'
          as={Link}
          to={`/departments/${this.props.match.params.id}/items/${item.id}/edit`}
        >
          Edit
        </Button>
        <p>{item.description}</p>
      </Segment>
    ))
  }

  toggleEdit = () => this.setState({ toggleEdit : !this.state.toggleEdit })

  render() {
    const { department, toggleEdit } = this.state
    return (
      <div>
        {
          toggleEdit ? 
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              label="Name"
              placeholder={department.name}
              value={department.name}
              onChange={this.handleChange}
              required
            />
            <Form.Button>Submit</Form.Button>
          </Form>
        :
        <Header as='h1'>{ department.name }</Header>
        }
        <br/>
        <Button as={Link} to={`/departments/${this.props.match.params.id}/new`} color='yellow'>
          Add Item
        </Button>
        <Button onClick={this.toggleEdit} color='green'>
          Edit Department Name
        </Button>
        <br/>
        <br/>
        <Segment.Group>
            { this.renderItems() }
        </Segment.Group>
      </div>
    )
  }
}

export default Department
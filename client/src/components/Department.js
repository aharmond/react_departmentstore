import React from 'react';
import StyledHead from '../styles/StyledHead';
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

  componentDidUpdate(prevProps) {
    if (prevProps.location !== this.props.location) {
      axios.get(`/api/departments/${this.props.match.params.id}`)
      .then( res => {
        this.setState({ department: res.data, });
      })
      axios.get(`/api/departments/${this.props.match.params.id}/items`)
      .then( res => {
        this.setState({ items: res.data, });
      })
    }
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
    const { department } = this.state
    axios.put(`/api/departments/${this.props.match.params.id}`, department)
      .then( res => {
        this.setState({ department })
      })
    this.toggleEdit()
  }

  renderItems = () => {
    const { items } = this.state;
    
    if (items.length <= 0)
      return <StyledHead size='medium'>Out of Stock!</StyledHead>
    return items.map( item => (
      <div style={{ padding: "25px", }}>
        <Segment inverted stacked key={item.id}>
          <StyledHead size='medium'>{item.name}</StyledHead>
          <Header as='h5'>{item.price}</Header>
          <Button
            inverted
            floated='right' 
            color='red' 
            onClick={() => this.deleteItem(item.id)}
            >
            Delete
          </Button>
          <Button 
            inverted
            floated='right' 
            color='green'
            as={Link}
            to={`/departments/${this.props.match.params.id}/items/${item.id}/edit`}
            >
            Edit
          </Button>
          <p>{item.description}</p>
        </Segment>
      </div>
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
              placeholder={department.name}
              value={department.name}
              onChange={this.handleChange}
              required
            />
            <Form.Button inverted color="green">Submit</Form.Button>
          </Form>
        :
        <StyledHead size='large'>{ department.name }</StyledHead>
        }
        <br/>
        <Button inverted as={Link} to={`/departments/${this.props.match.params.id}/new`} color='yellow'>
          Add Item
        </Button>
        <Button inverted onClick={this.toggleEdit} color='green'>
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
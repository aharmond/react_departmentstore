import React from 'react';
import { Segment, Header, } from 'semantic-ui-react';
import axios from 'axios';

class Department extends React.Component {
  state = { department: {}, items: [], }

  componentDidMount() {
    axios.get(`/api/departments/${this.props.match.params.id}`)
      .then( res => {
        this.setState({ department: res.data, });
      })
    axios.get(`/api/departments/${this.props.match.params.id}/items`)
      .then( res=> {
        this.setState({ items: res.data, });
      })
  }

  renderItems = () => {
    const { items } = this.state;
    if (items.length <= 0)
      return <h2>Out of Stock!</h2>
    return items.map( item => (
      <Segment stacked key={item.id}>
        <Header as='h3'>{item.name}</Header>
        <Header as='h5'>{item.price}</Header>
        <p>{item.description}</p>
      </Segment>
    ))
  }

  render() {
    const { department } = this.state
    return (
      <div>
        <Header as='h1'>{ department.name }</Header>
        <br/>
        <Segment.Group>
            { this.renderItems() }
        </Segment.Group>
      </div>
    )
  }
}

export default Department
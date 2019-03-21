import React from 'react';
import axios from 'axios';
import StyledHead from '../styles/StyledHead';
import { Link } from 'react-router-dom';
import { Segment, Header, Button, Form, } from 'semantic-ui-react';


class Item extends React.Component {
  state = { item: {}, reviews: [], }

  componentDidMount() {
    const { department_id, id } = this.props.match.params
    axios.get(`/api/departments/${department_id}/items/${id}`)
      .then( res => {
        this.setState({ item: res.data, })
      });
    axios.get(`/api/items/${id}/reviews`)
      .then( res => {
        this.setState({ reviews: res.data, })
      })
  }

  render() {
    const { name, price, description } = this.state.item
    const { department_id, id } = this.props.match.params

    return (
      <div>
        <StyledHead size="large">{ name }</StyledHead>
        <StyledHead size="small">${ price }</StyledHead>
        <div style={{ padding: "25px" }}>
          <Segment inverted>
            { description }
            <Button 
              inverted 
              color="olive" 
              as={Link} 
              to={`/departments/${department_id}/items/${id}/edit`}
              content="Edit Item"
              floated="right"
              size="tiny"
            />
          </Segment>
        </div>
      </div>
    )
  }
}

export default Item;
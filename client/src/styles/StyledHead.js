import styled from 'styled-components';
import { Header, } from 'semantic-ui-react';

const fontSize = (size) => {
  switch(size) {
    case 'large':
      return '4rem'
    case 'medium':
      return '3rem'
    case 'small':
      return '2rem'
    default:
      return '1rem'
  }
}

export default styled(Header)`
  color: lightblue !important;
  text-align: center;
  font-size: ${props => fontSize(props.size)} !important;
`
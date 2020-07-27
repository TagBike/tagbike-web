import styled from 'styled-components';

const Button = styled.button`
cursor: pointer;
background: transparent;
font-size: 16px;
border-radius: 5px;
color: ${props => (props.primary ? 'green' : 'palevioletred')};
border: ${props =>
  props.primary ? '2px solid green' : '2px solid palevioletred'};
margin: 0 1em;
padding: 0.25em 1em;
transition: 0.5s all ease-out;

&:hover {
  color: white;
  background-color: ${props =>
    props.primary ? 'green' : 'palevioletred'};
}
`;


export { Button };
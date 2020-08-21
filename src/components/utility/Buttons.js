import styled from 'styled-components';
import { palette } from 'styled-theme';

const Button = styled.button`
cursor: pointer;
font-size: 16px;
border-radius: 5px;
color: ${props => (props.primary ? palette('secondary', 0) : palette('primary', 0))};
background-color: ${props =>
  props.primary ? palette('primary', 0) : 'transparent'};
/*border: ${props =>
  props.primary ? `1px solid ${palette('primary', 0)}` : `1px solid ${palette('secondary', 0)}`};*/
margin: 0 1em;
padding: 0.25em 1em;
transition: 0.5s all ease-out;

&:hover {
  color: ${palette('secondary', 0)};
  background-color: ${props =>
    props.primary ? palette('primary', 0) : palette('primary', 0)};
}
`;


export { Button };
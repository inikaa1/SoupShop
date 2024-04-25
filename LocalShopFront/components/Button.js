import styled, { css } from "styled-components";
import { pastel } from "@/lib/colors";
import { background, deleteColour, textColour} from "@/lib/colors";

export const ButtonStyle = css`
  border:0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight:500;
  svg{
    height: 16px;
    margin-right: 5px;
  }
  img{
    height: 16px;
    margin-right: 5px;
  }
  ${props => props.block && css`
    display: block;
    width: 100%;
  `}
  ${props => props.white && !props.outline && css`
    background-color: #C0D9A1;
    color: black;
    text-decoration: none;
    &:active {
      background-color: ${background};
    }
  `}
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
  `}
  ${props => props.black && !props.outline && css`
    background-color: ${background};
    color: #fff;
  `}
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${props => props.pastel && !props.outline && css`
    background-color: ${pastel};
    border: 1px solid ${background};
    color: ${background};
    &:active {
      background-color: ${background};
      border-color: ${background};
      color: ${textColour};
  }
  `}
  ${props => props.pastel && props.outline && css`
    background-color: transparent;
    border: 1px solid ${pastel};
    color:${pastel};
  `}
  ${props => props.size === 'l' && css`
    font-size:1.2rem;
    padding: 10px 20px;
    svg{
      height: 20px;
    }
  `}
  ${props => props.red && !props.outline && css`
    background-color: ${deleteColour};
    color: ${textColour};
    &:active {
      background-color: #8b0000;
    }
  `}
  ${props => props.green && !props.outline && css`
    background-color: ${textColour};
    color: black;
    text-decoration: none;
`}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
  return (
    <StyledButton {...rest}>{children}</StyledButton>
  );
}
import styled from "styled-components";
import {background, pastel, textColour} from "@/lib/colors";

const StyledTable = styled.table`
  width: 100%;
  th{
    text-align: left;
    text-transform: uppercase;
    color: ${pastel};
    font-weight: 600;
    font-size: .7rem;
  }
  td{
    border-top: 1px solid ${pastel};
    color: ${background};
  }
`;

export default function Table(props) {
  return <StyledTable {...props} />
}
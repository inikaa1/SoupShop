import styled from "styled-components";
import Link from "next/link";
import { textColour } from "@/lib/colors";
import Button from "./Button";

const Bg = styled.div`
  background-color: #59654e;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='77' height='107' viewBox='0 0 77 107'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='stamp-collection' fill='%23c0d9a1' fill-opacity='0.4'%3E%3Cpath d='M46 101a5 5 0 0 1 5 5h5a5 5 0 0 1 10 0h5a5 5 0 0 1 5-5v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10v-5a5 5 0 0 1 0-10V6a5 5 0 0 1-5-5h-5a5 5 0 0 1-10 0h-5a5 5 0 0 1-10 0h-5a5 5 0 0 1-10 0h-5a5 5 0 0 1-10 0H6a5 5 0 0 1-5 5v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 0 10v5a5 5 0 0 1 5 5h5a5 5 0 0 1 10 0h5a5 5 0 0 1 10 0h5a5 5 0 0 1 5-5zm15-2a7 7 0 0 0-6.71 5h-1.58a7 7 0 0 0-13.42 0h-1.58a7 7 0 0 0-13.42 0h-1.58a7 7 0 0 0-13.42 0H7.71A7.01 7.01 0 0 0 3 99.29v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58a7 7 0 0 0 0-13.42v-1.58A7 7 0 0 0 3 9.29V7.71A7.02 7.02 0 0 0 7.71 3h1.58a7 7 0 0 0 13.42 0h1.58a7 7 0 0 0 13.42 0h1.58a7 7 0 0 0 13.42 0h1.58a7 7 0 0 0 13.42 0h1.58A7.02 7.02 0 0 0 74 7.71v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7 7 0 0 0 0 13.42v1.58a7.01 7.01 0 0 0-4.71 4.71h-1.58A7 7 0 0 0 61 99zM12 12h53v83H12V12zm51 81H14V14h49v79z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  color:#fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin:0;
  font-family: Allura, cursive;
  font-weight: bold;
  font-size: 100px;
  letter-spacing: 0.2em;
  width:100%;
  background-opacity: 80%;
  colour: #F5F5F2;
  @media screen and (min-width: 768px) {
    font-size:3rem;
  }
`;


const StyledDiv = styled.div`
  max-width: 800px;
  margin: auto;
  text-align: center;
`;

const NewImage = styled.img`
  width: 50%;
  height:auto;
`;

const NavLink = styled(Link)`
  display: block;
  font-size: 20px;
  text-decoration: none;
  color: ${textColour};
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;

const Para = styled.p`
  padding-bottom: 7s0px;
  font-weight: bold;
  letter-spacing: 0.2em;
`;

export default function IndexFeature() {
  return (
    <Bg>
      <StyledDiv>
        <Title>Welcome to Soup Street!</Title>
        <Para>Where Every Spoonful Feels Like Home.</Para>
        <Button white outline>
          <NavLink href={'/login'}>Login</NavLink>
        </Button>
        <br></br><br></br><br></br><br></br><br></br>
        <NewImage src="https://isys2160localshop.s3.amazonaws.com/image-1697380804717.png" alt="" />
      </StyledDiv>
    </Bg>
  );
}
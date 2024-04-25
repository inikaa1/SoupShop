import styled from "styled-components";
import { background } from "@/lib/colors";
import { textColour } from "@/lib/colors";

const StyledHeader = styled.header`
  background-color: ${textColour};
`;

const Para = styled.p`
  padding-bottom: 20px;
  text-align: center;
  width: 800px;
  margin: auto;
`;

const BoldedPara = styled.p`
  text-align: center;
  width: 800px;
  margin: auto;
  font-weight: bold;
`;

const Title = styled.h1`
  padding-top: 70px;
  margin:0;
  text-align: center;
  font-family: Allura, cursive;
  font-weight: bold;
  font-size: 100px;
  letter-spacing: 0.2em;
  width:100%;
  background-opacity: 80%;
  colour: ${background};
  @media screen and (min-width: 768px) {
    font-size:3rem;
  }
`;

export default function InitHeader() {
  return (
    <StyledHeader>
      <Title>About Us</Title>
      <br></br><br></br>
      <Para>Welcome to Soup Street, your ultimate destination for a culinary voyage through the world of soups! At our online soup store, we've redefined the art of gastronomy by marrying convenience with a tantalizing array of flavors.</Para>
      <BoldedPara>Embark on a Flavorful Journey:</BoldedPara>
      <Para>Step into our virtual aisles and explore a rich tapestry of soups, each concoction telling a unique story. From the timeless comfort of hearty classics to the adventurous zest of exotic blends, we take pride in presenting a collection that caters to every discerning palate.</Para>
      <BoldedPara>Crafted with Passion and Perfection:</BoldedPara>
      <Para>
        Our commitment to quality is unwavering. Each soup is a labor of love, meticulously crafted with the finest ingredients and culinary expertise. We believe in transforming the ordinary into the extraordinary, one savory spoonful at a time.
      </Para>
      <BoldedPara>Convenience at Your Fingertips:</BoldedPara>
      <Para>
        Experience the joy of hassle-free soup shopping. With just a few clicks, you can fill your cart with warmth and goodness, selecting from our carefully curated assortment. We've streamlined the process, making it as delightful as the soups we offer.
      </Para>
      <BoldedPara>
      Anticipation Delivered to Your Doorstep:
      </BoldedPara>
      <Para>
        Savoring a bowl of soup is not just about the taste; it's about the experience. Anticipate the arrival of your chosen flavors, and relish the moment as a steaming bowl is delivered straight to your doorstep.
      </Para>
      <Para>
        Join us at Soup Street, where every sip is a celebration, and every order is an invitation to embark on a journey through flavor. Let us redefine your soup experience — simple, convenient, and undeniably delicious.
      </Para>
      <Para>
        Login and Start Ordering Now!!
      </Para>
    </StyledHeader>
  );
}
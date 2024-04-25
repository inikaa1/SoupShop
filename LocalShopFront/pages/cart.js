import Header from "@/components/Header";
import styled, { createGlobalStyle } from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import { pastel, background, textColour } from "@/lib/colors";

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${textColour};
    margin: 0;  // Reset default margin
  }
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr .8fr;
  }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: ${pastel};
  border-radius: 10px;
  padding: 30px;
`;

const CartBox = styled.div`
  background-color: ${textColour};
  border-radius: 10px;
  padding: 30px;
  border: 3px solid ${pastel};
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
  color: ${background};
`;

const ProductImageBox = styled.div`
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  display:flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${pastel};
  img{
    max-width: 60px;
    max-height: 60px;
  }
  @media screen and (min-width: 768px) {
    padding: 10px;
    width: 100px;
    height: 100px;
    img{
      max-width: 80px;
      max-height: 80px;
    }
  }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const StyledH2 = styled.h2`
  color: ${background};
  letter-spacing: 0.05em;
`;

export default function CartPage() {
  const {
    cartProducts,
    addProduct,
    removeProduct,
    clearCart,
  } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const calculateTotalPrice = () => {
    return cartProducts.reduce((total, productId) => {
      const price = products.find(p => p._id === productId)?.price || 0;
      return total + price;
    }, 0);
  };

  const fetchData = async () => {
    if (cartProducts.length > 0) {
      try {
        const response = await axios.post('/api/cart', { ids: cartProducts });
        console.log("Response Data" + response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
  }, []);

  const moreOfThisProduct = (id) => {
    addProduct(id);
  };

  const lessOfThisProduct = (id) => {
    removeProduct(id);
  };

  const goToPayment = async () => {
    const response = await axios.post('/api/checkout', {
      name, email, city, postalCode, streetAddress, country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      clearCart();
    }
  }, [isSuccess]);

  if (isSuccess) {
    return (
      <>
        <GlobalStyle />
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Header />
      <Center>
        <ColumnsWrapper>
          <CartBox>
            <StyledH2>Cart</StyledH2>
            {!cartProducts?.length && (
              <div>Your cart is empty</div>
            )}
            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img src={product.images[0]} alt="" />
                        </ProductImageBox>
                        <br></br>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button red
                          onClick={() => lessOfThisProduct(product._id)}>-</Button>
                        <QuantityLabel>
                          {cartProducts.filter(id => id === product._id).length}
                        </QuantityLabel>
                        <Button white
                          onClick={() => moreOfThisProduct(product._id)}>+</Button>
                      </td>
                      <td>
                        ${cartProducts.filter(id => id === product._id).length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${calculateTotalPrice()}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </CartBox>
          {!!cartProducts?.length && (
            <Box>
              <StyledH2>Order information</StyledH2>
              <Input type="text"
                placeholder="Name"
                value={name}
                name="name"
                onChange={ev => setName(ev.target.value)} />
              <Input type="text"
                placeholder="Email"
                value={email}
                name="email"
                onChange={ev => setEmail(ev.target.value)} />
              <CityHolder>
                <Input type="text"
                  placeholder="City"
                  value={city}
                  name="city"
                  onChange={ev => setCity(ev.target.value)} />
                <Input type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  name="postalCode"
                  onChange={ev => setPostalCode(ev.target.value)} />
              </CityHolder>
              <Input type="text"
                placeholder="Street Address"
                value={streetAddress}
                name="streetAddress"
                onChange={ev => setStreetAddress(ev.target.value)} />
              <Input type="text"
                placeholder="Country"
                value={country}
                name="country"
                onChange={ev => setCountry(ev.target.value)} />
              <Button black block
                onClick={goToPayment}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}


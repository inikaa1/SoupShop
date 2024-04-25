import Header from "@/components/Header";
import Center from "@/components/Center";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ProductsGrid from "@/components/ProductsGrid";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import {textColour} from "@/lib/colors";
import {background} from "@/lib/colors";

export default function ProductsPage({ }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch products
    axios.get("/api/products").then(productResponse => {
      const products = productResponse.data;

      // Fetch categories
      axios.get("/api/categories").then(categoryResponse => {
        const categories = categoryResponse.data;

        // Map category names to products
        const productsWithCategoryNames = products.map(product => {
          const category = categories.find(cat => cat._id === product.category);
          return {
            ...product,
            categoryName: category ? category.name : 'Unknown'
          };
        });

        // Set state
        setProducts(productsWithCategoryNames);
        setFilteredProducts(productsWithCategoryNames);
        const uniqueCategories = [...new Set(categories.map(category => category.name))];
        setCategories(uniqueCategories);
      });
    });
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === 'Soup') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.categoryName === category));
    }
  };

  const StyledDiv = styled.div`
    text-align: right;
    padding-top: 30px;

  `;

  const SelectDiv = styled.div`
    position: relative;
  `;

  const StyledSelect = styled.select`
    background-color: ${textColour};
    border: 1px solid ${background};
    color: ${background};
    padding: 8px 10px;
    font-weight: bold;
  `;

  const Category = styled.label`
    font-weight: bold;
    color: ${background};
  `;

  const Title = styled.h1`
  font-size: 2rem;
  margin:30px 0 20px;
  font-weight: normal;
  color: ${background};
  padding-bottom: 20px;
`;


  return (
    <>
      <Header />
      <Center>
        <StyledDiv>
          <SelectDiv>
            <Category>
              Category: &nbsp;&nbsp;
              <StyledSelect value={selectedCategory} onChange={handleCategoryChange}>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </StyledSelect>
            </Category>
          </SelectDiv>
        </StyledDiv>
        <Title>All products</Title>
        <ProductsGrid products={filteredProducts} />
        <br></br>
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  const products = await Product.find({}, null, { sort: { '_id': -1 } });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  };
}
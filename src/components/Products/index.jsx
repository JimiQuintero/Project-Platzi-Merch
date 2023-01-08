import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import Product from "../Product";
import "../Products/Products.css";

// sin utilizar useContext
/* const Products = ({ products}) => {
  return (
    <div className='Products'>
      <div className="Products-items">
        {products.map(product =>(
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
} */

// Trabajando con useContext
const Products = () => {
  // Agregando el context
  const { state, addToCart } = useContext(AppContext);
  const { products } = state;

  const handleAddToCart = (product) => () => {
    addToCart(product);
  };

  return (
    <div className="Products">
      <div className="Products-items">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;

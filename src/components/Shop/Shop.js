import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart]=useState([]);
  //declaring the event hendler 
  const handleAddProduct = (product) => {
    const newCart=[...cart, product];
    setCart(newCart);
  }
//passing the event handler to a child component named Product component here
  return (
    <div className='main-wrap'>
      <div className="product-wrap">
        {products.map(p => <Product handleAddProduct={handleAddProduct} product={p}></Product>)}
      </div>
      <div className="cart-wrap">
        <Cart cart={cart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
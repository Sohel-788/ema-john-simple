import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
const Shop = () => {
  const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState(first10);
  const [cart, setCart] = useState([]);
  //data loading from databaseManager
  useEffect(() => {
    const savedCart = getDatabaseCart();
    const productKeys = Object.keys(savedCart);
    const cartProducts = productKeys.map(pdkey => {
      const product = fakeData.find(pd => pd.key === pdkey);
      product.quantity = savedCart[pdkey];
      return product;
    })
    setCart(cartProducts);
  }, [])
  //declaring the event hendler 
  const handleAddProduct = (product) => {
    // databaseManager declaration
    const toBeAddedKey = product.key;
    const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter(pd => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct]
    } else {
      product.quantity = 1;
      newCart = [...cart, product]
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  }
  //passing the event handler to a child component named Product component here
  return (
    <div className='main-wrap'>
      <div className="product-wrap">
        {products.map(p => <Product key={p.key} showAddToCart={true} handleAddProduct={handleAddProduct} product={p}></Product>)}
      </div>
      <div className="cart-wrap">
        <Cart cart={cart}>
          <Link to='/review'><button className='btn' type='button'>Order Review</button></Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
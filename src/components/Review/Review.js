import React, { useEffect, useState } from 'react';
import './Review.css';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImg from '../../images/giphy.gif';
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced]=useState(false);
    let thankyou;
    if (orderPlaced) {
    thankyou= <img src={happyImg} alt=''/>
    }
    const handlePlaceOrder=()=>{
        setCart([]);
        setOrderPlaced(true);
        processOrder();
    }
    const removeProduct =(productKey)=>{
        const newCart=cart.filter(pd =>pd.key !==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    //data loading from databaseManager
    useEffect(()=>{
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(pdkey=>{
            const product = fakeData.find(pd=> pd.key ===pdkey);
            product.quantity = savedCart[pdkey];
            return product
        });
        setCart(cartProducts);
    },[])
    return (
        <div className='main-wrap'>
            <div className="product-wrap">
            {
                cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} product={pd}></ReviewItem>)
            }
            {thankyou}
            </div>
            <div className="cart-wrap">
                <Cart cart={cart}>
                    <button onClick={handlePlaceOrder} className='btn' type='button'>Place Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;
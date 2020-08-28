import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';
const Product = (props) => {
    const { img, name, seller, price, stock } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt='' />
            </div>
            <div>
                <h3 className='product-title'>{name}</h3>
                <p>by: {seller}</p>
                <p>${price}</p>
                <p> <small>Only {stock} left in stock - order soon</small></p>
                <button onClick={()=>props.handleAddProduct(props.product)} className='btn' type='button'> <FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>
            </div>
        </div>
    );
};

export default Product;
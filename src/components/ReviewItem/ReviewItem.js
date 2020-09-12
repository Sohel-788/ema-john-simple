import React from 'react';

const ReviewItem = (props) => {
    // console.log(props)
    const { name, quantity, img, key, price } = props.product;
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h3 className='product-title'>{name}</h3>
                <p><small>ID: {key}</small></p>
                <p>Price: ${price}</p>
                <p>Quantity: {quantity}</p>
                <br/>
                <button onClick={()=>props.removeProduct(key)} className='btn'>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;
import React from 'react';
import './Cart.css';
const Cart = (props) => {
    const cart = props.cart;
    //Total price process in reduce process ,just uncomment the below line and comment out the for loop process
    // const totalPrice=cart.reduce((total,prod)=>total+prod.price,0)
    //Total price process by for loop
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = (total + product.price);
        console.log(product)

    }
    //shipping cost
    let shipping = 0;
     if (total > 50) {
        shipping = 0;
    } else if (total >30) {
        shipping = 5
    } else if(total>0){
        shipping=10
    }
    // Tax and vat
    const tax=(total/10).toFixed(2);
const grandTotal=(total + shipping+Number(tax)).toFixed(2);
console.log(total,shipping)
    return (
        <div>
            <h3>Order Summary</h3>
            <p>Items Ordered: {cart.length}</p>
            <p>Product Price: ${total.toFixed(2)}</p>
            <p><small>Shipping: ${shipping}</small></p>
            <p><small>Tax + Vat: ${tax}</small></p>
            <p>Total Price: ${grandTotal}</p>
        </div>
    );
};

export default Cart;
import React from 'react';
import './ProductDetail.css';
import Product from '../Product/Product';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
const ProductDetail = () => {
   const {productKey}= useParams();
   const product=fakeData.find(pd=> pd.key ===productKey);
   console.log(product)
    return (
        <div className='ProductDetail-wrap'>
            <h1>Product detail here</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Lazy } from 'react-lazy'
import { price } from '../../config'

class Product extends Component {

    render() {
        const { product } = this.props
        return (
            <Link style={{textDecoration: 'none'}} to={{ pathname: `product/${product.product_id}` , state: product }}>
            <div className="product">
                <div className="photo">
                    <Lazy ltIE9>
                        <img src={product.image} alt=""/>
                    </Lazy>
                </div>
                <div className="name">
                    <span>{product.name}</span>
                </div>
                <div className="code">
                    <div>Code product</div>
                    <span>{product.code}</span>
                </div>
                <div className="price">
                    <div>Price</div> <span>Rp {price(product.price)}</span>
                </div>

            </div>
            </Link>
        );
    }
}

export default Product;
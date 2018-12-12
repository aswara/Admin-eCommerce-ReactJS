import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Product extends Component {
    render() {
        const { product } = this.props
        console.log(this.props)
        return (
            <Link style={{textDecoration: 'none'}} to={`product/${product.product_id}`}>
            <div className="product">
                <div className="photo">
                    <img src={product.image} alt=""/>
                </div>
                <div className="name">
                    <span>{product.name}</span>
                </div>
                <div className="code">
                    Code Product <br/>
                    <span>{product.code}</span>
                </div>
                <div className="price">
                    Price <span>Rp {product.price}</span>
                </div>

            </div>
            </Link>
        );
    }
}

export default Product;
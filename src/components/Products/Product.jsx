import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Lazy } from 'react-lazy'

class Product extends Component {
    price(number){
        var reverse = number.toString().split('').reverse().join(''),
        thousand = reverse.match(/\d{1,3}/g);
        thousand = thousand.join('.').split('').reverse().join('');
        return thousand + ",-";
    }

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
                    <div>Price</div> <span>Rp {this.price(product.price)}</span>
                </div>

            </div>
            </Link>
        );
    }
}

export default Product;
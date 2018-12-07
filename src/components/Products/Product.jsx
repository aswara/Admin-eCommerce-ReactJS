import React, { Component } from 'react';

class Product extends Component {
    render() {
        const { product } = this.props
        return (
            <div className="product">
                <div className="tabel">
                    <div className="photo">
                        <img src={product.image} alt=""/>
                    </div>
                    <div className="name">
                        <span>{product.name}</span>
                    </div>
                    <div className="code">
                        Kode Produk <br/>
                       <span>{product.code}</span>
                    </div>
                    <div className="price">
                        Harga : <span>{product.price}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;
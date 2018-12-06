import React, { Component } from 'react';
import './products.scss'
import AddProduct from './AddProduct'

import Header from '../Header'
import Navbar from '../Navbar'

class index extends Component {
    state = {
        open_add : false
    }

    render() {
        const { open_add } = this.state
        return (
            <div className="products">
                <Header />
                <Navbar />

                <div className="wrapper">
                    <div onClick={()=>{this.setState({ open_add : !open_add })}} className="new">
                        { open_add ? <i className="demo-icon icon-cancel">&#xe80f;</i> : <i className="demo-icon icon-plus">&#xe808;</i> }
                    </div>

                    <span>Products</span>

                    { // open add product
                        open_add ? <AddProduct /> :
                        <div className="costumer">
                            <div className="photo">
                                
                            </div>
                            <div>
                                <span> Adi Aswara</span>
                            </div>
                            <span>Tulungagung</span>
                            <span>email.gmail.com</span>
                            <span>098389372772</span>
                        </div>
                    }

                </div>
            </div>
        );
    }
}

export default index;
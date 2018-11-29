import React, { Component } from 'react';
import './products.scss'

import Header from '../Header'
import Navbar from '../Navbar'

class index extends Component {
    render() {
        return (
            <div className="products">
                <Header />
                <Navbar />

                <div className="wrapper">
                    <div className="new">
                    
                    </div>

                    <span>Products</span>

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

                </div>
            </div>
        );
    }
}

export default index;
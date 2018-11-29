import React, { Component } from 'react';
import './orders.scss'

import Header from '../Header'
import Navbar from '../Navbar'

class index extends Component {
    render() {
        return (
            <div className="orders">
                <Header />
                <Navbar />
                <div className="wrapper">
                    <span>Orders</span>
                </div>
            </div>
        );
    }
}

export default index;
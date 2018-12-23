import React, { Component } from 'react';
import './dashboard.scss'
import Header from '../Header'
import Navbar from '../Navbar'

class index extends Component {
    render() {
        return (
            <div className="dashboard">
                <Navbar />

                <Header />
                <div className="wrapper">
                    <span>Overview</span>
                    <div className="total">
                        <div className="card">
                            <div><i className="demo-icon icon-card">&#xe805;</i></div>
                            <div>
                                <p>Recent Orders</p>
                                <h1>25</h1>
                            </div>
                        </div>
                        <div className="card">
                            <div><i className="demo-icon icon-cart">&#xe80d;</i></div>
                            <div>
                                <p>Total Products</p>
                                <h1>21</h1>
                            </div>
                        </div>
                        <div className="card">
                            <div><i className="demo-icon icon-costumers">&#xe80a;</i></div>
                            <div>
                                <p>Total Costumers</p>
                                <h1>12</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default index;
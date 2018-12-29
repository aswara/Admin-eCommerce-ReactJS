import React, { Component } from 'react';
import './orders.scss'

import Header from '../Header'
import Navbar from '../Navbar'
import New from './New';
import Shipping from './Shipping'
import Success from './Success'
import Process from './Process'

class index extends Component {
    state = {
        tab: "new"
    }
 
    render() {
        const { tab } = this.state
        return (
            <div className="orders">
                <Header />
                <Navbar />
                <div className="wrapper">
                    <span>Orders</span>

                    <div className="tab">
                        <div className={ tab === "new" ? "active" : "" } onClick={()=>this.setState({ tab: "new" })}>
                            <span>New</span>
                        </div>
                        <div  className={ tab === "process" ? "active" : "" } onClick={()=>this.setState({ tab: "process" })}>
                            <span>Process</span>
                        </div>
                        <div  className={ tab === "shipping" ? "active" : "" } onClick={()=>this.setState({ tab: "shipping" })}>
                            <span>Shipping</span>
                        </div>
                        <div  className={ tab === "success" ? "active" : "" } onClick={()=>this.setState({ tab: "success" })}>
                            <span>Success</span>
                        </div>
                    </div>

                    <div className="list-orders">
                    {
                        tab === "new" && <New />
                    }
                    {
                        tab === "process" && <Process />
                    }
                    {
                        tab === "shipping" && <Shipping />
                    }
                    {
                        tab === "success" && <Success />
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default index;
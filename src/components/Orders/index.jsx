import React, { Component } from 'react';
import './orders.scss'
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'

import Header from '../Header'
import Navbar from '../Navbar'
import New from './New';
import Shipping from './Shipping'

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
                        tab === "shipping" && <Shipping />
                    }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        user : state.userReducer
    })
}

export default connect(mapStateToProps)(index);
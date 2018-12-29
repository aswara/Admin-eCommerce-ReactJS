import React, { Component } from 'react';
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'
import _ from 'lodash'
import './new.scss'
import Order from './Order'

class Shipping extends Component {
    state = {
        orders: [],
        loading: true,
        detail: false
    }

    componentDidMount(){
        this.fetchOrdersUnconfirmed()
    }

    fetchOrdersUnconfirmed(){
        let orders = localStorage.getItem('shippingorders') 
        if(orders){
            this.setState({ orders: JSON.parse(orders), loading: false })
        }
        let token = this.props.user.token
        axios.get( url + "/order/shipping" , headers(token) )
        .then( res => {
            if(_.isArray(res.data.data)){
                localStorage.setItem("shippingorders", JSON.stringify(res.data.data))
                this.setState({ orders: res.data.data, loading: false })
            }
        })
    }

    render() {
        const { orders, loading } = this.state
        return (
            <div className="new-order">

                { loading ? <div class="load"><div></div><div></div><div></div></div> :
                    <div> { orders.length < 1 && <div>Empty</div> } {
                    orders.length > 0 && orders.map(order => 
                        <Order key={order.order_id} status="shipping" order={order} />
                        )
                    }</div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        user : state.userReducer
    })
}

export default connect(mapStateToProps)(Shipping);
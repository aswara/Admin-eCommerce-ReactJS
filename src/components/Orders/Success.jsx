import React, { Component } from 'react';
import axios from 'axios'
import { url, headers, price } from '../../config'
import { connect } from 'react-redux'
import _ from 'lodash'
import './new.scss'
import Order from './Order'

class Success extends Component {
    state = {
        orders: [],
        loading: true,
    }

    componentDidMount(){
        this.fetchOrdersUnconfirmed()
    }

    fetchOrdersUnconfirmed(){
        let orders = localStorage.getItem('shippingsuccess') 
        if(orders){
            this.setState({ orders: JSON.parse(orders), loading: false })
        }
        let token = this.props.user.token
        axios.get( url + "/order/show-success" , headers(token) )
        .then( res => {
            if(_.isArray(res.data.data)){
                localStorage.setItem("shippingsuccess", JSON.stringify(res.data.data))
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
                        <Order key={order.order_id} status="success" order={order} />
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

export default connect(mapStateToProps)(Success);
import React, { Component } from 'react';
import axios from 'axios'
import { url, headers} from '../../config'
import _ from 'lodash'
import { connect } from 'react-redux'
import './new.scss'

import Order from './Order'

class New extends Component {
    state = {
        orders: [],
        loading: true,
        message: '',
    }

    componentDidMount(){
        this.fetchOrdersUnconfirmed()
    }

    fetchOrdersUnconfirmed(){
        let orders = localStorage.getItem('neworders') 
        if(orders){
            this.setState({ orders: JSON.parse(orders), loading: false })
        }
        let token = this.props.user.token
        axios.get( url + "/order/unconfirmed" , headers(token) )
        .then( res => {
            if(_.isArray(res.data.data)){
                localStorage.setItem("neworders", JSON.stringify(res.data.data))
                this.setState({ orders: res.data.data, loading: false })
            }
        })
    }

    confirm = (id) => {
        this.setState({ loading: true })
        let token = this.props.user.token
        axios.get( url + "/order/confirm?order_id=" + id ,  headers(token) )
        .then(res=>{
            this.setState({ message: 'Success confirm order', loading: false })
            this.fetchOrdersUnconfirmed()
        })
        .catch(err=>{
            this.setState({ message: 'Failed confirm order', loading: false })
        })
    }

    render() {
        const { orders, loading, message } = this.state
        return (
            <div className="new-order">
                <span style={{ color: 'red' }}>{message}</span>
                { loading ? <div class="load"><div></div><div></div><div></div></div> :
                    <div> { orders.length < 1 && <div>Empty</div> } {
                    orders.length > 0 && orders.map(order => 
                            <Order key={order.order_id} status="new" order={order} confirm={this.confirm} />
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

export default connect(mapStateToProps)(New);
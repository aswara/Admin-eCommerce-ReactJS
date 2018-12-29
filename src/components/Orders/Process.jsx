import React, { Component } from 'react';
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'
import _ from 'lodash'
import './new.scss'
import Order from './Order'

class Process extends Component {
    state = {
        orders: [],
        loading: true,
        detail: false,
        message: ''
    }

    componentDidMount(){
        this.fetchOrdersProcess()
    }

    fetchOrdersProcess(){
        let orders = localStorage.getItem('orderprocess') 
        if(orders){
            this.setState({ orders: JSON.parse(orders), loading: false })
        }
        let token = this.props.user.token
        axios.get( url + "/order/waiting-shipping" , headers(token) )
        .then( res => {
            if(_.isArray(res.data.data)){
                localStorage.setItem("orderprocess", JSON.stringify(res.data.data))
                this.setState({ orders: res.data.data, loading: false })
            }
        })
    }

    sendAwb = (order_id, awb) => {
        const token = this.props.user.token

        if( awb && order_id ){
            this.setState({loading: true})
            axios.post( url + "/order/confirm-shipping?order_id="+order_id, { awb } , headers(token) )
            .then(res=>{
                this.setState({ message: 'Success confirm process shipping', loading: false })
                this.fetchOrdersProcess()
            })
            .catch(err=>{
                this.setState({ message: 'Failed confirm process shipping', loading: false })
            })
        }
    }

    render() {
        const { orders, loading, message } = this.state
        return (
            <div className="new-order">
                <span>{message}</span>
                { loading ? <div class="load"><div></div><div></div><div></div></div> :
                    <div> { orders.length < 1 && <div>Empty</div> } {
                    orders.length > 0 && orders.map(order => 
                        <Order key={order.order_id} status="process" order={order} sendAwb={this.sendAwb} />
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

export default connect(mapStateToProps)(Process);
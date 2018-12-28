import React, { Component } from 'react';
import _ from 'lodash'
import axios from 'axios'
import { price, url, headers } from '../../config'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Order extends Component {
    state = {
        detail: false
    }

    confirm(id){
        this.props.confirm(id)
    }

    render() {
        const { detail } = this.state
        const { order, status } = this.props
        return (
            <div className="order">
            {
                detail ? 
                <div onClick={()=>this.setState({ detail: false })}>
                    { status === "new" && <div onClick={()=> this.confirm(order.order_id)} className="confirm">Confirm</div> }
                    <span>Detail Order</span>
                    <div className="shipping">
                        <div  className="detail">
                            <div>
                                Received Name
                                <span>{order.shipping_info.received_name}</span>
                            </div>
                            <div>
                                Phone
                                <span>{order.shipping_info.phone}</span>
                            </div>
                            <div>
                                Province
                                <span>{order.shipping_info.province_name}</span>
                            </div>
                            <div>
                                City
                                <span>{order.shipping_info.city_name}</span>
                            </div>
                            <div>
                                Postal Code
                                <span>{order.shipping_info.zip}</span>
                            </div>
                            <div>
                                Address
                                <span>{order.shipping_info.address}</span>
                            </div>
                        </div>
                        <div className="payment">
                            <div>
                                Status
                                <span>{order.status}</span>
                            </div>
                            <div>
                                Date
                                <span>{order.due_date}</span>
                            </div>
                            <div>
                                Invoice
                                <span>{order.invoice}</span>  
                            </div>
                            <div>
                                Amount
                                <span>Rp {price(order.amount)}</span>  
                            </div>
                            <div>
                                Shipping Cost
                                <span>Rp {price(order.shipping_cost)}</span>  
                            </div>
                            <div>
                                Total Payment
                                <span>Rp {price(order.total_payment)}</span>  
                            </div>
                        </div>
                    </div>

                    <div className="product-shipping">
                    <span>Products</span>
                    {
                        _.isArray(order.order_detail) && order.order_detail.map( product => 
                            <Link style={{textDecoration: 'none'}} to={"/product/"+product.product_id} >
                            <div className="product" key={product.order_detail_id} >
                                <div>{product.product_name}</div>
                                <div>Size {product.size}</div>
                                <div>Rp { price(product.price) }</div>
                            </div>
                            </Link>
                            )
                    }
                    </div>
                </div>
                :

                <div onClick={()=>this.setState({ detail: true })} className="hide">
                    <span>{order.shipping_info.received_name}</span>
                    <span>Total : {order.order_detail.length} product</span>
                    <span>Payment : Rp {price(order.total_payment)}</span>
                    <span>Date : {order.due_date}</span>
                </div>
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

export default connect(mapStateToProps)(Order);
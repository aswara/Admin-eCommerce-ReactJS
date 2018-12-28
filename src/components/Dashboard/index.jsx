import React, { Component } from 'react';
import './dashboard.scss'
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'
import Header from '../Header'
import Navbar from '../Navbar'

class index extends Component {
    state = {
        total : {
            customers: '',
            products: '',
            unconfirmed_orders: ''
        }
    }
    componentDidMount(){
        let total = localStorage.getItem('total')
        if(total){
            this.setState({ total: JSON.parse(total), loading: false })
        }
        
        axios.get( url + "/count" , headers(this.props.user.token) )
        .then(res=>{
            if( res.data )
                localStorage.setItem('total', JSON.stringify(res.data))
                this.setState({ total: res.data, loading: false })
        })
    }

    render() {
        const { total } = this.state
        return (
            <div className="dashboard">
                <Navbar />

                <Header />
                <div className="wrapper">
                    <span>Overview</span>
                    <div className="total">
                        <div onClick={()=>this.props.history.push("/orders")} className="card">
                            <div><i className="demo-icon icon-card">&#xe805;</i></div>
                            <div>
                                <p>Recent Orders</p>
                                <h1>{total.unconfirmed_orders}</h1>
                            </div>
                        </div>
                        <div onClick={()=>this.props.history.push("/products")} className="card">
                            <div><i className="demo-icon icon-cart">&#xe80d;</i></div>
                            <div>
                                <p>Total Products</p>
                                <h1>{total.products}</h1>
                            </div>
                        </div>
                        <div onClick={()=>this.props.history.push("/customers")} className="card">
                            <div><i className="demo-icon icon-costumers">&#xe80a;</i></div>
                            <div>
                                <p>Total Costumers</p>
                                <h1>{total.customers}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        user: state.userReducer
    })
}

export default connect(mapStateToProps)(index);
import React, { Component } from 'react';
import './customers.scss'
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'

import Header from '../Header'
import Navbar from '../Navbar'

class index extends Component {
    state = {
        customers : [1,2,3,4,5,6,7,8,9],
        loading : true,
    }

    componentDidMount() {
        let customers = JSON.parse(localStorage.getItem('customers'))
        if(customers){
            this.setState({ customers, loading: false })
        }
        
        axios.get( url + "/customers" , headers(this.props.user.token) )
        .then(res=>{
            if( res.data.constructor === Array )
                localStorage.setItem('customers', JSON.stringify(res.data))
                this.setState({ customers: res.data, loading: false })
        })
    }

    render() {
        const { customers, loading } = this.state
        return (
            <div className="customers">
                <Header />
                <Navbar />
                <div className="wrapper">
                    <span>Customers</span>

                    {
                       loading ? customers.map((val, i)=> <div className="loading-customers" key={i}></div> ) :
                       customers.map(customer=>{
                            return(
                                <div key={customer.customer_id} className="customer">
                                    <div className="photo">
                                        <img src={customer.photo} alt="photo"/>
                                        <span>{customer.name}</span>
                                    </div>
                                    <span>{customer.phone}</span>
                                    <span>{customer.email}</span>
                                </div>
                            )
                        })     
                    }

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
import React, { Component } from 'react';
import './customers.scss'
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'

import Header from '../Header'
import Navbar from '../Navbar'

class index extends Component {
    state = {
        customers : []
    }

    componentDidMount() {
        axios.get( url + "/customers" , headers(this.props.user.token) )
        .then(res=>{
            if( res.data.constructor === Array )
                this.setState({ customers: res.data })
        })
        .catch(err=>{
            console.log(err.response)
        })
    }

    render() {
        const { customers } = this.state
        console.log(customers)
        return (
            <div className="customers">
                <Header />
                <Navbar />
                <div className="wrapper">
                    <span>Customers</span>

                    {
                        customers.map(customer=>{
                            return(
                                <div key={customer.customer_id} className="customer">
                                    <div className="photo">
                                        <img src={customer.photo} alt="photo"/>
                                    </div>
                                    <div>
                                        <span>{customer.name}</span>
                                    </div>
                                    <span>Tulungagung</span>
                                    <span>email.gmail.com</span>
                                    <span>098389372772</span>
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
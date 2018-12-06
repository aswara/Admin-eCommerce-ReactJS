import React, { Component } from 'react';
import './customers.scss'
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'

import Header from '../Header'
import Navbar from '../Navbar'

class index extends Component {

    componentDidMount() {
        axios.get( url + "/customers" , headers(this.props.user.token) )
        .then(res=>{
            console.log(res.data)
        })
        .catch(err=>{
            console.log(err.response)
        })
    }

    render() {
        return (
            <div className="costumers">
                <Header />
                <Navbar />
                <div className="wrapper">
                    <span>Costumers</span>

                    <div className="costumer">
                        <div className="photo">
                            
                        </div>
                        <div>
                            <span> Adi Aswara</span>
                        </div>
                        <span>Tulungagung</span>
                        <span>email.gmail.com</span>
                        <span>098389372772</span>
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
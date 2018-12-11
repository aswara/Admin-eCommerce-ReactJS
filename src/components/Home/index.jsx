import React, { Component } from 'react';
import './home.scss'
import { userAction } from '../../actions'
import { connect } from 'react-redux'
import { url, headers } from '../../config'
import axios from 'axios'

import logo from '../../assets/logo.svg'

class index extends Component {
    state = {
        message: ''
    }
    
    componentWillMount() {
        let token = this.props.user.token
        axios.get( url + "/admin/profile" , headers(token) )
        .then(res=>{
            if(res.data){
                this.props.userAction(res.data.data, true, token)
                this.props.history.push("/dashboard")
            }
        })
        .catch(err=>{
            localStorage.removeItem('token')
            console.log(err)
            if(err.response){
                this.props.userAction(null , false, null)
                this.props.history.push("/login")
            } else {
                this.props.userAction(null , false)
                this.setState({ message: 'Failed connect server' })
            }
        })

    }

    render() {
        const { message } = this.state
        return (
            <div className="home">
                <img src={logo} alt="logo"/>
                <h1>e-Commerce</h1>
                <span>{message}</span>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        user: state.userReducer
    })
}

export default connect(mapStateToProps, { userAction }) (index);
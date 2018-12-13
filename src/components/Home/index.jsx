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
        let user = this.props.user
        if(navigator.onLine){
            axios.get( url + "/admin/profile" , headers(token) )
            .then(res=>{
                if(res.data){
                    this.props.userAction(res.data.data, true, token)
                    this.props.history.push("/dashboard")
                }
            })
            .catch(err=>{
                localStorage.removeItem('token')
                if(err.response){
                    this.props.userAction(null , false, null)
                    this.props.history.push("/login")
                } else {
                    this.props.userAction(null , false)
                    this.setState({ message: 'Failed connect server' })
                }
            })
        } else {
            if(user){
                this.props.userAction(user, true, token)
                this.props.history.push("/dashboard")
            }
        }

    }

    render() {
        const { message } = this.state
        console.log(this.props)
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
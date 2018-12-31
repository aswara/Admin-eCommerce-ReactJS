import React, { Component } from 'react';
import './login.scss'
import axios from 'axios'
import { connect } from 'react-redux'
import { url } from '../../config'
import { loginAction } from '../../actions'
import { Redirect } from 'react-router-dom'
import Loading from '../Loading'

import imageform from '../../assets/login-form.svg'
import imgBackground from '../../assets/login-bg.svg'
import imgPerson from '../../assets/login-person.svg'
import screen1 from '../../assets/login-screen1.svg'
import screen2 from '../../assets/login-screen2.svg'
import screen3 from '../../assets/login-screen3.svg'
import imgIcons from '../../assets/login-icons.svg'


class index extends Component {
    state = {
        loading : false,
        error: '',
        username: null,
        password: null,
    }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { username, password, loading } = this.state

        if(!username){ this.setState({ error: 'Enter your username' }) }
        if(!password){ this.setState({ error: 'Enter your password' }) }
        if(!username && !password){ this.setState({ error: 'Enter your username and password' }) }

        let formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        if( password && username ) {
            this.setState({ loading: true })
            this.setState({ error: '' })
            
            axios.post( url + "/admin/login" , formData )
            .then(res=>{
                if(res.data) {
                    this.props.loginAction(res.data.token, res.data.data)
                    localStorage.setItem('token', res.data.token)
                    localStorage.setItem('user', JSON.stringify(res.data.data))
                }
            })
            .catch(err=>{
                if(err.response){
                    this.setState({ loading: false })
                    this.setState({ error: 'Wrong username or password' })
                } else {
                    this.setState({ loading: false })
                    this.setState({ error: 'Failed connect server' })
                }

            })
        }
    }

    render() {
        const { loading, error } = this.state
        return (
            <div className="login">

                { loading ? <Loading /> : '' }
                { this.props.user.login ? <Redirect to="/dashboard" /> : '' }

                <div className="left">
                    <img className="background" src={imgBackground} alt="imgBackground"/>
                    <img className="person" src={imgPerson} alt="imgPerson"/>
                    <img className="screen1" src={screen1} alt="screen1"/>
                    <img className="screen2" src={screen2} alt="screen2"/>
                    <img className="screen3" src={screen3} alt="screen3"/>
                    <img className="icons" src={imgIcons} alt="imgIcons"/>
                </div>
                <div className="wrapper">
                    <img src={imageform} alt="imageform"/>
                    <form onSubmit={this.handleSubmit}>
                        <h2>Login Admin</h2>

                        <p className="error"> {error} </p>

                        <label style={{ top: '50px' }} htmlFor="username">Username</label>
                        <br/>
                        <input onChange={this.handleChange} name="username" id="username" type="text"/>
                        <br/>
                        <label style={{ top: '120px' }} className="password" htmlFor="password">Password</label>
                        <br/>
                        <input onChange={this.handleChange} name="password" id="password" type="password"/>
                        <br/>
                        <button type="submit">Login</button> 
                    </form>
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

export default connect(mapStateToProps, {loginAction})(index);
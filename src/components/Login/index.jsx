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
        login: false,
        error: '',
        username: null,
        password: null
    }

    componentDidMount() {
        if(localStorage.getItem('token') !== null){
            this.setState({ login: true })
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { username, password, loading } = this.state

        if(!username){ this.setState({ error: 'Username tidak boleh kosong' }) }
        if(!password){ this.setState({ error: 'Password tidak boleh kosong' }) }
        if(!username && !password){ this.setState({ error: 'Username dan password tidak boleh kosong' }) }

        let formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)

        if( password && username ) {
            this.setState({ loading: true })
            this.setState({ error: '' })
            axios.post( url + "/admin/login" , formData )
            .then(res=>{
                this.props.loginAction(res.data.token)
                this.setState({ login: true })
            })
            .catch(err=>{
                this.setState({ loading: false })
                this.setState({ error: 'Username dan password tidak cocok' })
            })
        }
    }

    render() {
        const { login, loading, error } = this.state
        return (
            <div className="login">

                { loading ? <Loading /> : '' }
                { login ? <Redirect to="/dashboard" /> : '' }

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

                        <label id="username" htmlFor="username">Username</label>
                        <br/>
                        <input onChange={this.handleChange} name="username" id="username" type="text"/>
                        <br/>
                        <label className="password" htmlFor="password">Password</label>
                        <br/>
                        <input onChange={this.handleChange} name="password" id="password" type="text"/>
                        <br/>
                        <button type="submit">Login</button> 
                    </form>
                </div>
            </div>
        );
    }
}


export default connect(null, {loginAction})(index);
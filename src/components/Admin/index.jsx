import React, { Component } from 'react';
import './admin.scss'
import { connect } from 'react-redux'
import axios from 'axios'
import { url, headers } from '../../config'
import  { userAction } from '../../actions'
import Header from '../Header'
import Navbar from '../Navbar'
import Loading from '../Loading'


class index extends Component {
    state={
        edit: false,
        username: '',
        photo: '',
        name: '',
        email: '',
        image: '',
        file: null,
        message: '',
        loading: false,
        change: false,
        current_password: '',
        new_password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value 
        })
    }

    componentDidMount(){
        let data = this.props.user.data
        if(data){
            const { username, email, photo, name } = data
            this.setState({ username, email, photo, name })
        }
    }

    handleImage = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            this.setState({
                file: file,
                image: reader.result
            })
        }
    }

    saveProfile = (e) => {
        e.preventDefault()
        this.setState({ loading: true })
        let token = this.props.user.token
        const { username, name, email, photo, file } = this.state
        if(file && username && name && email){
            let formData = new FormData()
            formData.append('image' , file)
            axios.post( url + "/admin/profile/upload-image", formData ,headers(token) )
            .then( res => {
                let data =  { username, name, email, photo: res.data.url }
                axios.put( url + "/admin/profile" , data, headers(token) )
                .then( res=>{
                    if(res.data.success){
                        this.props.userAction(res.data.profile, true, token)
                        const { name, email, username, photo } = res.data.profile
                        this.setState({ message: "Success update profile", loading: false, edit: false, name, email, username, photo })
                    }
                })
                .catch(err=>{
                    this.setState({ message: "Failed update profile", loading: false, edit: false })
                })
            })
            .catch(err=>{
                this.setState({ message: "Failed Update", loading: false, edit: false })
            })
        }

        if( username && name && email ) {
            let data =  { username, name, email, photo }
            axios.put( url + "/admin/profile" , data, headers(token) )
            .then( res=>{
                console.log(res)
                if(res.data.success){
                    this.props.userAction(res.data.profile, true, token)
                    this.setState({ message: "Success update profile", loading: false, edit: false })
                }
                
            })
            .catch(err=>{
                this.setState({ message: "Failed update profile", loading: false, edit: false })
            })
        }
    }

    changePassword = (e) => {
        e.preventDefault()
        const { new_password, current_password } = this.state
        let token = this.props.user.token
        if(new_password && current_password){
            axios.put( url + "/admin/profile/change-password" , { current_password, new_password } , headers(token) )
            .then(res => {
                this.setState({ change: false, message: 'Success change password' })
            })
            .catch(err => {
                this.setState({ change: false, message: 'Failed change password' })                
            })
        } else {
            this.setState({ change: false, message: 'Failed change password' })                
        }
    }

    render() {
        const { change, username, email, photo, name , edit, image, loading, message } = this.state
        console.log(this.state)
        return (
            <div className="account">
                <Header />
                <Navbar />
                <div className="wrapper">
                { loading ? <Loading /> : '' }

                { !change ? '' : 
                    <div className="change">
                        <form onSubmit={this.changePassword}>
                            <div onClick={()=> this.setState({ change: false })} className="edit">
                                <i class="demo-icon icon-cancel">&#xe80f;</i>
                            </div>
                            <h2>Change Password</h2>
                            <label htmlFor="">Current Password</label>
                            <input onChange={(e)=>{this.setState({ current_password: e.target.value })}} type="password"/>
                            <label htmlFor="">New Password</label>
                            <input onChange={(e)=>{this.setState({ new_password: e.target.value })}} type="password"/>
                            <button type="submit">save</button>
                        </form>
                    </div>
                }

                {
                    edit ?
                    <div className="profile">
                        { message ? <span style={{ color: 'red' }}>{message}</span> : '' }
                        <div onClick={()=> this.setState({ edit: false })} className="edit">
                            <i class="demo-icon icon-cancel">&#xe80f;</i>
                        </div>
                        <div className="photo">
                            <img src={image ? image : photo } alt="admin"/>
                        </div>
                        <input onChange={this.handleImage} type="file" accept="image/x-png,image/gif,image/jpeg" />
                        <div className="username">
                            <span>Username</span><input value={username} name="username" onChange={this.handleChange} type="text"/>
                        </div>
                        <div className="name">
                            <span>Name</span><input value={name} name="name" onChange={this.handleChange} type="text"/>
                        </div>
                        <div className="email">
                            <span>Email</span><input value={email} name="email" onChange={this.handleChange} type="text"/>
                        </div>
                        <div className="email">
                            <span></span><button onClick={this.saveProfile}>Save</button>
                        </div>
                    </div> 
                    :
                    <div className="profile">
                        { message ? <span style={{ color: 'red' }}>{message}</span> : '' }
                        <div onClick={()=> this.setState({ edit: true })} className="edit">
                            <i className="demo-icon icon-cog">&#xe81a;</i>
                        </div>
                        <div className="photo">
                            <img src={photo} alt="admin"/>
                        </div>
                        <div className="username">
                            <span>Username</span><span>{username}</span>
                        </div>
                        <div className="name">
                            <span>Name</span><span>{name}</span>
                        </div>
                        <div className="email">
                            <span>Email</span><span>{email}</span>
                        </div>
                        <div className="email">
                            <span>Password</span><button onClick={()=>this.setState({ change: true })} >change</button>
                        </div>
                    </div>
                }

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer
    }
}

export default  connect(mapStateToProps,{ userAction })(index);       
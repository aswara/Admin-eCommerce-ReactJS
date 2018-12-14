import React, { Component } from 'react';
import './header.scss'
import { connect } from 'react-redux'
import  { logoutAction } from '../../actions'

class index extends Component {
    state={
        dropdown: true,
        data: {
            user: '',
            photo: '',
            name: '',
            email: ''
        }
    }

    componentDidMount(){
        let data = this.props.user.data
        if(data){
            this.setState({ data })
        }
    }

    dropDown = () => {
        this.setState({ dropdown: !this.state.dropdown })
    }

    render() {
        const { dropdown, data } = this.state
        return (
            <div className="header">
                <div className="title">
                    <span>e-Commerce</span>
                </div>
                <div className="admin">
                    <span onClick={this.dropDown}>Admin <i className="demo-icon icon-down-circle">&#xe810;</i></span>

                    <div className={`dropdown ${ dropdown ? `hide` : ``}`}>
                        <img src={data.photo} alt="photo"/>
                        <span className="name">{data.name}</span>
                        <span className="email">{data.email}</span>
                        <span onClick={()=>this.props.logoutAction() } className="logout"><i className="demo-icon icon-power">&#xe80e;</i> Logout</span>
                    </div>
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

export default  connect(mapStateToProps,{ logoutAction })(index);       
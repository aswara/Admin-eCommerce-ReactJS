import React, { Component } from 'react';
import './header.scss'
import { connect } from 'react-redux'

import logo from '../../assets/logo.svg'

class index extends Component {
    state={
        dropdown: true
    }

    dropDown = () => {
        this.setState({ dropdown: !this.state.dropdown })
    }

    render() {
        const { dropdown } = this.state
        return (
            <div className="header">
                <div className="title">
                    <span>e-Commerce</span>
                </div>
                <div className="admin">
                    <span onClick={this.dropDown}>Admin <i className="demo-icon icon-down-circle">&#xe810;</i></span>

                    <div className={`dropdown ${ dropdown ? `hide` : ``}`}>
                        <span><i className="demo-icon icon-power">&#xe80e;</i> Logout</span>
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

export default  connect(mapStateToProps)(index);       
import React, { Component } from 'react';
import './header.scss'

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
                    <span onClick={this.dropDown}>Admin</span>

                    <div className={`dropdown ${ dropdown ? `hide` : ``}`}>
                        <span>Logout</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default index;       
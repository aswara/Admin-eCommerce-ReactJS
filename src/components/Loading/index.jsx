import React, { Component } from 'react';
import './loading.scss'

import logo from '../../assets/logo.svg'

class index extends Component {
    render() {
        return (
            <div className="loading">
                <img src={logo} alt="logo"/>
                <h1>loading</h1>
            </div>
        );
    }
}

export default index;
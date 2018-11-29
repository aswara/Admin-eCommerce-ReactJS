import React, { Component } from 'react';
import logo from '../../assets/logo.svg'

class index extends Component {
    render() {
        return (
            <div>
                <img src={logo} alt="logo"/>
                <h1>Loading</h1>
                <ion-icon name="heart"></ion-icon>
            </div>
        );
    }
}

export default index;
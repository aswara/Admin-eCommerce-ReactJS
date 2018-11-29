import React, { Component } from 'react';
import './login.scss'
import imageform from '../../assets/login-form.svg'
import imgBackground from '../../assets/login-bg.svg'
import imgPerson from '../../assets/login-person.svg'
import screen1 from '../../assets/login-screen1.svg'
import screen2 from '../../assets/login-screen2.svg'
import screen3 from '../../assets/login-screen3.svg'
import imgIcons from '../../assets/login-icons.svg'


class index extends Component {
    render() {
        return (
            <div className="login">
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
                    <form>
                        <h2>Login Admin</h2>
                        <label for="username">Username</label>
                        <br/>
                        <input name="username" id="username" type="text"/>
                        <br/>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default index;
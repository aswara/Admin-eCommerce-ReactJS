import React, { Component } from 'react';
import './costumers.scss'

import Header from '../Header'
import Navbar from '../Navbar'

class index extends Component {
    render() {
        return (
            <div className="costumers">
                <Header />
                <Navbar />
                <div className="wrapper">
                    <span>Costumers</span>

                    <div className="costumer">
                        <div className="photo">
                            
                        </div>
                        <div>
                            <span> Adi Aswara</span>
                        </div>
                        <span>Tulungagung</span>
                        <span>email.gmail.com</span>
                        <span>098389372772</span>
                    </div>

                </div>
            </div>
        );
    }
}

export default index;
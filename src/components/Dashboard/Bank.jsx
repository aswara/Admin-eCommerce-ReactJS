import React, { Component } from 'react';
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'

class Bank extends Component {
    state = {
        action : false,
    }

    deleteBank = (id) => {
        this.props.update(id)
    }

    render() {
        const { action } = this.state
        const { bank } = this.props
        return (
            <div className="bank">
                <div className="action">
                    <span onClick={()=>this.setState({action: !action})}>...</span>
                    {
                        action && 
                        <div>
                            <button onClick={()=>this.deleteBank(bank.bank_id)} style={{backgroundColor: "#ED515E"}}>Delete</button>
                        </div>
                    }
                </div>
                <div>
                    Bank name
                    <span>{bank.bank_name}</span>
                </div>
                <div style={{ borderBottom: '1px solid lightblue', borderTop: '1px solid lightblue'   }}>
                    Account name
                    <span>{bank.account_name}</span>
                </div>
                <div style={{ borderBottom: '1px solid lightblue' }}>
                    Account number
                    <span>{bank.account_number}</span>
                </div>
                <div>
                    Description
                    <span>{bank.description}</span>
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

export default connect(mapStateToProps)(Bank);
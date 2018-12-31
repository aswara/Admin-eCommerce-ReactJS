import React, { Component } from 'react';
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'

class Bank extends Component {
    state = {
        action : false,
        edit: false,
        message: ''
    }

    componentDidMount(){
        const { bank } = this.props
        this.setState({
            account_name : bank.account_name,
            account_number: bank.account_number,
            bank_name: bank.bank_name,
            bank_id: bank.bank_id
        })
    }

    deleteBank = (id) => {
        this.props.update(id)
        this.setState({
            action: false
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {account_name, account_number, bank_name, bank_id} = this.state
        if(account_name && account_number && bank_name){
            const data = {
                account_name,
                account_number,
                bank_name
            }
            axios.put( url + "/bank/" + bank_id , data , headers(this.props.user.token) )
            .then(res =>{
                this.setState({ message: "Success update Bank", edit: false, action: false })
                this.props.update()
            })
            .catch(err =>{
                this.setState({ message: "Failed update Bank", edit: false, action: false })
            })
        }
    }

    render() {
        const { message, action, edit, account_name, account_number, bank_name } = this.state
        const { bank } = this.props
        return (
            <div>
            {
                edit ? 
                <div className="bank">
                    <span>Edit Bank</span><button style={{marginLeft: '10px'}} onClick={()=>this.setState({edit: false})}>Close</button>
                    <form className="form-bank" onSubmit={this.handleSubmit}>
                        <input value={bank_name} onChange={this.handleChange} name="bank_name" placeholder="Bank name" type="text"/>
                        <input value={account_number} onChange={this.handleChange} name="account_number" placeholder="Account number" type="text"/>
                        <input value={account_name} onChange={this.handleChange} name="account_name" placeholder="Account name" type="text"/>
                        <button type="submit">Save</button>
                    </form>
                </div>
                :
                <div className="bank">
                <div className="action">
                    <span onClick={()=>this.setState({action: !action})}>...</span>
                    {
                        action && 
                        <div>
                            <button onClick={()=>this.deleteBank(bank.bank_id)} style={{backgroundColor: "#ED515E"}}>Delete</button>
                            <button onClick={()=>this.setState({ edit: true })} style={{backgroundColor: "#4694FC", top: "50px"}}>Edit</button>
                        </div>
                    }
                </div>
                <span style={{color: 'red'}}>{message}</span>
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
            }
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
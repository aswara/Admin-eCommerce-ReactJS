import React, { Component } from 'react';
import './dashboard.scss'
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'
import Header from '../Header'
import Navbar from '../Navbar'
import Bank from './Bank'

class index extends Component {
    state = {
        total : {
            customers: '',
            products: '',
            unconfirmed_orders: ''
        },
        banks : [],
        loading: true,
        add: false,
        bank_name: '',
        account_name: '',
        account_number: '',
        message: '' 
    }

    componentDidMount(){
        this.fetchTotal()
        this.fetchBank()
    }

    fetchTotal = () => {
        let total = localStorage.getItem('total')
        if(total){
            this.setState({ total: JSON.parse(total), loading: false })
        }
        
        axios.get( url + "/count" , headers(this.props.user.token) )
        .then(res=>{
            if( res.data )
                localStorage.setItem('total', JSON.stringify(res.data))
                this.setState({ total: res.data, loading: false })
        })
    }

    fetchBank = () => {
        let banks = localStorage.getItem('banks')
        if(banks){
            this.setState({ banks: JSON.parse(banks), loading: false })
        }

        axios.get( url + "/bank" , headers(this.props.user.token) )
        .then(res=>{
            if( res.data )
                localStorage.setItem('banks', JSON.stringify(res.data))
                this.setState({ banks: res.data, loading: false })
        })
    }

    updateBank = (id) => {
        if(id){
            axios.delete( url + "/bank/" + id , headers(this.props.user.token) )
            .then(res=>{
                this.fetchBank()
                this.setState({ message: "Success delete Bank" })
            })
            .catch(err=>{
                this.setState({ message: "Failed delete Bank" })
            })
        } else {
            this.fetchBank()
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {account_name, account_number, bank_name} = this.state
        if(account_name && account_number && bank_name){
            const data = {
                account_name,
                account_number,
                bank_name
            }
            axios.post( url + "/bank" , data , headers(this.props.user.token) )
            .then(res =>{
                this.setState({ message: "Success add Bank", add: false })
                this.fetchBank()
            })
            .catch(err =>{
                this.setState({ message: "Failed add Bank", add: false })
            })
        }
    }

    render() {
        const { total, banks, loading, add, message } = this.state
        return (
            <div className="dashboard">
                <Navbar />
                <Header />

                <div className="wrapper">
                    <span>Overview</span>
                    <div className="total">
                        <div onClick={()=>this.props.history.push("/orders")} className="card">
                            <div><i className="demo-icon icon-card">&#xe805;</i></div>
                            <div>
                                <p>Recent Orders</p>
                                <h1>{total.unconfirmed_orders}</h1>
                            </div>
                        </div>
                        <div onClick={()=>this.props.history.push("/products")} className="card">
                            <div><i className="demo-icon icon-cart">&#xe80d;</i></div>
                            <div>
                                <p>Total Products</p>
                                <h1>{total.products}</h1>
                            </div>
                        </div>
                        <div onClick={()=>this.props.history.push("/customers")} className="card">
                            <div><i className="demo-icon icon-costumers">&#xe80a;</i></div>
                            <div>
                                <p>Total Costumers</p>
                                <h1>{total.customers}</h1>
                            </div>
                        </div>
                    </div>
                    <span style={{marginRight: "10px"}}>My Bank</span>
                    { add ? <button onClick={()=>this.setState({ add: false })}>Close</button> : <button onClick={()=>this.setState({ add: true })}>Add</button> }
                    { add && <div>
                        <form className="form-bank" onSubmit={this.handleSubmit}>
                            <input onChange={this.handleChange} name="bank_name" placeholder="Bank name" type="text"/>
                            <input onChange={this.handleChange} name="account_number" placeholder="Account number" type="text"/>
                            <input onChange={this.handleChange} name="account_name" placeholder="Account name" type="text"/>
                            <button type="submit">Save</button>
                        </form>
                    </div> }
                    <div>
                        <span style={{color: 'red'}}>{message}</span>
                        {
                            loading ? <div className="load"><div></div><div></div><div></div></div> :
                            banks.map( bank => 
                                <Bank key={bank.bank_id} bank={bank} update={this.updateBank} />
                            )
                        }
                    </div>
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

export default connect(mapStateToProps)(index);
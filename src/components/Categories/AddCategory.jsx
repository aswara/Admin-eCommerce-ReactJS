import React, { Component } from 'react';
import './add.scss'
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'

class AddCategory extends Component {
    state = {
        name : '',
        message : ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    handleSubmit = (e) => {
        const { name } = this.state        
        e.preventDefault()

        axios.post( url + '/category' , { name } , headers(this.props.user.token)  )
        .then(res=>{
            this.props.update()
            this.setState({ name: '', message: 'Berhasil menambah kategori' })
        })
        .catch(res=>{
            this.setState({ message: 'Gagal menambah kategori' })
        })
    }

    render() {
        const { name, message } = this.state
        return (
            <div>
                <div className="add-category">
                    <form onSubmit={this.handleSubmit}>
                        <input placeholder="Tambah kategori" onChange={this.handleChange} value={name} name="name" type="text"/>
                        <button type="submit">Add</button>
                    </form>
                </div>
                <span className="message">{message}</span>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        user: state.userReducer
    })
}

export default connect(mapStateToProps)(AddCategory);
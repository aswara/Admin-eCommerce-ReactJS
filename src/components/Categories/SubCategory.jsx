import React, { Component } from 'react';
import './subcategory.scss'
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'

class SubCategory extends Component {
    state = {
        open : true,
        comfirm_delete : true,
        name : '',
        message : ''
    }


    deleteCategory(id) {   
        axios.delete( url+ '/subcategory/' + id , headers(this.props.user.token) )
        .then(res=>{
            this.setState({ comfirm_delete: true, message: 'Berhasil menghapus sub kategori' })
            this.props.update()
        })
        .catch(err=>{
            this.setState({ comfirm_delete: true, message: 'Gagal menghapus menghapus sub kategori' })
        })
    }


    openUpdateCategory = (name) =>{
        this.setState({ name, open: !this.state.open, message: '' })
    }

    updateCategory(e, id) {
        e.preventDefault() 
        const data = {
            name: this.state.name,
        }

        axios.put( url + '/subcategory/' + id , data ,headers(this.props.user.token) )
        .then(res=>{ 
            this.setState({ message: 'Berhasil ubah sub kategori', open: true })
            this.props.update()
        })
        .catch(err=>{ this.setState({ message: 'Gagal ubah sub kategori' }) })
    }

    render() {
        const { open, name, comfirm_delete, message } = this.state
        const { data } = this.props
        return (
            <div>
                <span className="message">{message}</span>
                <div className="sub-category">
                    <div>
                        <span>{data.name}</span>
                    </div>
                    <div className="actions">
                        <div onClick={()=>{this.setState({ comfirm_delete : false})}} className="delete">
                            <i className="demo-icon icon-minus">&#xe814;</i>
                        </div>
                        <div onClick={()=>{this.openUpdateCategory(data.name)}} className="update">
                            <i className="demo-icon icon-cog">&#xe81a;</i>
                        </div>
                    </div>
                </div>

                { //open comfirm delete category
                    comfirm_delete ? '' :
                    <div className="comfirm-delete">
                        <div>
                            <h3>Apa anda yakin ingin menghapus?</h3>
                            <button onClick={()=>{this.deleteCategory(data.sub_category_id)}}>Ya</button>
                            <button onClick={()=>{this.setState({ comfirm_delete: true })}}>Tidak</button>
                        </div>
                    </div>
                }
                

                { //open input for update category
                    open ? '' :
                    <div className="add-category">
                        <form onSubmit={(e)=>{ this.updateCategory(e, data.sub_category_id) }}>
                            <input onChange={(e)=>{this.setState({ name: e.target.value })}} value={name} type="text"/>
                            <button type="submit">Save</button>
                        </form>
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

export default connect(mapStateToProps)(SubCategory);
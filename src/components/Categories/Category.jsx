import React, { Component } from 'react';
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'

import SubCategory from './SubCategory'

class Category extends Component {
    state = {
        open_update : true,
        open_add : true,
        comfirm_delete : true,
        name : '',
        message : '',
        sub_categories : [] 
    }

    componentDidMount() {
        this.fetchSubCategories()
    }

    fetchSubCategories = () => {
        axios.get( url + '/subcategory/category/' + this.props.category.category_id )
        .then(res=>{ 
            if(res.data.constructor === Array )
                this.setState({ sub_categories: res.data })
            else
                this.setState({ sub_categories: [] })
         })
        .catch(err=>{ this.setState({ message: 'Gagal menampilkan sub kategori' }) })
    }

    deleteCategory(id) {   
        axios.delete( url+ '/category/' + id , headers(this.props.user.token) )
        .then(res=>{
            this.props.update()
        })
    }


    openUpdateCategory = (name) =>{
        this.setState({ name, open_update: !this.state.open_update, message: '' })
    }

    updateCategory(e, id) {
        e.preventDefault() 
        const data = {
            name: this.state.name,
        }

        axios.put( url + '/category/' + id , data ,headers(this.props.user.token) )
        .then(res=>{ 
            this.setState({ message: 'Berhasil ubah kategori', open_update: true })
            this.props.update()
        })
        .catch(err=>{ this.setState({ message: 'Gagal ubah kategori' }) })
    }

    openAddSubCategory = () =>{
        this.setState({ open_add: !this.state.open_add, message: '' })
        
    }

    addSubCategory(e, id) {
        e.preventDefault()
        const data = {
            name : this.state.name,
            category_id : id
        }
        axios.post( url + '/subcategory', data , headers(this.props.user.token) )
        .then(res=>{
            this.fetchSubCategories()
            this.setState({ message: 'Berhasil tambah sub kategori', open_add: true, name: '' })
        })
    }


    render() {
        const { open_update, name, open_add, comfirm_delete, message, sub_categories } = this.state
        const { category } = this.props
        return (
            <div>
                <span className="message">{message}</span>
                <div className="category">
                    <div>
                        <span>{category.name}</span>
                    </div>
                    <div className="actions">
                        <div onClick={()=>{this.setState({ comfirm_delete : false})}} className="delete">
                            <i className="demo-icon icon-minus">&#xe814;</i>
                        </div>
                        <div onClick={()=>{this.openUpdateCategory(category.name)}} className="update">
                            <i className="demo-icon icon-cog">&#xe81a;</i>
                        </div>
                        <div onClick={this.openAddSubCategory} className="add">
                            {
                                open_add ?  <i className="demo-icon icon-plus">&#xe808;</i> : <i className="demo-icon icon-cancel">&#xe80f;</i>
                            }
                        </div>
                    </div>
                </div>
                
                { //open comfirm delete category
                    comfirm_delete ? '' :
                    <div className="comfirm-delete">
                        <div>
                            <h3>Apa anda yakin ingin menghapus?</h3>
                            <button onClick={()=>{this.deleteCategory(category.category_id)}}>Ya</button>
                            <button onClick={()=>{this.setState({ comfirm_delete: true })}}>Tidak</button>
                        </div>
                    </div>
                }
                

                { //open input for update category
                    open_update ? '' :
                    <div className="add-category">
                        <form onSubmit={(e)=>{ this.updateCategory(e, category.category_id) }}>
                            <input onChange={(e)=>{this.setState({ name: e.target.value })}} value={name} type="text"/>
                            <button type="submit">Save</button>
                        </form>
                    </div>
                }


                { //open input for add subcategory
                    open_add ? '' :
                    <div className="add-category">
                        <form onSubmit={(e)=>{ this.addSubCategory(e, category.category_id) }}>
                            <input placeholder="Tambah sub kategori" onChange={(e)=>{this.setState({ name: e.target.value })}} type="text"/>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                }

                { //list sub categories
                    sub_categories.map(sub_category=>{
                        return(
                            <SubCategory key={sub_category.sub_category_id} update={this.fetchSubCategories} data={sub_category} />
                        )
                   })
                }

            </div>

        );
    }
}

const mapStateToProp = (state) => {
    return({
        user: state.userReducer
    })
}

export default connect(mapStateToProp)(Category);
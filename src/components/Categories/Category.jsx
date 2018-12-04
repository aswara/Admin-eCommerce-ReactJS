import React, { Component } from 'react';
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'

class Category extends Component {
    state = {
        open : true,
        input : true,
        comfirm_delete : true,
        name: ''
    }

    deleteCategory (id) {   
        axios.delete( url+ '/category/' + id , headers(this.props.user.token) )
        .then(res=>{
            this.props.update()
        })
    }

    openCategory = (name) =>{
        this.setState({ name, open: !this.state.open })
    }

    handleUpdate(e, id) {
        e.preventDefault() 
        const data = {
            name: this.state.name,
            id
        }
        console.log(data)
        axios.put( url + '/category' + id , data ,headers(this.props.user.token) )
    }

    addSubCategory = () =>{
        this.setState({ input: !this.state.input })
        
    }

    handleAdd(e, id) {
        e.preventDefault()
        console.log(id)
    }


    render() {
        const { open, name, input, comfirm_delete } = this.state
        const { category } = this.props
        console.log(this.state)
        return (
            <div>
                <div className="category">
                    <div>
                        <span>{category.name}</span>
                    </div>
                    <div className="actions">
                        <div onClick={()=>{this.setState({ comfirm_delete : false})}} className="delete">
                            <i className="demo-icon icon-minus">&#xe814;</i>
                        </div>
                        <div onClick={()=>{this.openCategory(category.name)}} className="update">
                            <i className="demo-icon icon-cog">&#xe81a;</i>
                        </div>
                        <div className="add">
                            <i onClick={this.addSubCategory} className="demo-icon icon-plus">&#xe808;</i>
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
                    open ? '' :
                    <div className="add-category">
                        <form onSubmit={(e)=>{ this.handleUpdate(e, category.category_id) }}>
                            <input onChange={(e)=>{this.setState({ name: e.target.value })}} value={name} type="text"/>
                            <button type="submit">Save</button>
                        </form>
                    </div>
                }


                { //open input for add subcategory
                    input ? '' :
                    <div className="add-category">
                        <form onSubmit={(e)=>{ this.handleAdd(e, category.category_id) }}>
                            <input placeholder="Tambah sub category" onChange={(e)=>{this.setState({ name: e.target.value })}} type="text"/>
                            <button type="submit">Add</button>
                        </form>
                    </div>
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
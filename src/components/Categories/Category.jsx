import React, { Component } from 'react';
import axios from 'axios'
import { url, headers } from '../../config'
import _ from 'lodash'
import { connect } from 'react-redux'
import Loading from '../Loading'

import SubCategory from './SubCategory'

class Category extends Component {
    state = {
        open_update : true,
        open_add : true,
        comfirm_delete : true,
        name : '',
        message : '',
        sub_categories : [],
        loading: false
    }

    componentDidMount() {
        let sub_categories = this.props.category.subcategories
        if(sub_categories){
            this.setState({ sub_categories })
        }
        this.fetchSubCategories()
    }

    fetchSubCategories = () => {
        axios.get( url + '/subcategory/category/' + this.props.category.category_id )
        .then(res=>{ 
            if( _.isArray(res.data.datasub) )
                this.setState({ sub_categories: res.data.datasub })
            else
                this.setState({ sub_categories: [] })
         })
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
            this.setState({ message: 'Success update category', open_update: true })
            this.props.update()
        })
        .catch(err=>{ this.setState({ message: 'Failed update category' }) })
    }

    openAddSubCategory = () =>{
        this.setState({ open_add: !this.state.open_add, message: '' })
        
    }

    handleImage = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            this.setState({
                file: file,
                image: reader.result
            })
        }
    }

    addSubCategory(e, id) {
        e.preventDefault()
        const { name, file } = this.state
        this.setState({ loading: true })
        let formData = new FormData()
        formData.append('image', file)

        axios.post( url + "/subcategory/upload-image", formData )
        .then(res=>{
            const data = {
                name : name,
                image : res.data.url,
                category_id : id
            }
            axios.post( url + '/subcategory', data , headers(this.props.user.token) )
            .then(res=>{
                
                this.fetchSubCategories()
                this.setState({ message: 'Success add subcategory', open_add: true, name: '', image: null, loading: false })
            })
            .catch(err=>{
                this.setState({ message: 'Failed add subcategory', loading: false })
            })
        })
        .catch(err=>{
           this.setState({ message: 'Failed upload image', loading: false})
        })
    }


    render() {
        const { loading, image, open_update, name, open_add, comfirm_delete, message, sub_categories } = this.state
        const { category } = this.props
        return (
            <div>
                { loading && <Loading /> }

                <span className="message">{message}</span>
                <div className="category">
                    <div>
                        <span>{category.category_name}</span>
                    </div>
                    <div className="actions">
                        <div onClick={()=>{this.setState({ comfirm_delete : false})}} className="delete">
                            <i className="demo-icon icon-minus">&#xe814;</i>
                        </div>
                        <div onClick={()=>{this.openUpdateCategory(category.category_name)}} className="update">
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
                            <h3>Are you sure want to delete?</h3>
                            <button onClick={()=>{this.deleteCategory(category.category_id)}}>Yes</button>
                            <button onClick={()=>{this.setState({ comfirm_delete: true })}}>No</button>
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

                { image ? <img src={image} alt="image"/> : '' }


                { //open input for add subcategory
                    open_add ? '' :
                    <div className="add-subcategory">
                        <form onSubmit={(e)=>{ this.addSubCategory(e, category.category_id) }}>
                            <input onChange={this.handleImage}  type="file" accept="image/x-png,image/gif,image/jpeg"/>
                            <input placeholder="Name subcategory" onChange={(e)=>{this.setState({ name: e.target.value })}} type="text"/>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                }
                <div className="list-sub">
                { //list sub categories
                    sub_categories.map(sub_category=>{
                        return(
                            <SubCategory key={sub_category.sub_category_id} update={this.fetchSubCategories} data={sub_category} />
                        )
                   })
                }
                </div>

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
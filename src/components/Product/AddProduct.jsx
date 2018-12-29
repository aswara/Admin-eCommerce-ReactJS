import React, { Component } from 'react';
import './addproduct.scss'
import axios from 'axios'
import ReactQuill from 'react-quill'
import { Link } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import { url, headers } from '../../config'
import { connect } from 'react-redux'
import _ from 'lodash'

import Header from '../Header'
import Navbar from '../Navbar'
import Loading from '../Loading'

class AddProduct extends Component {
    state = {
        categories: [],
        subcategories: [],
        imagePreview : '',
        message : '',
        messageadd: '',
        allinput: [],
        allsize: [],
        allstock: [],
        size: '',
        stock: '',
        description: '',
        success: false,
        loading: false,
    }

    componentDidMount(){
        let categories = this.props.categories.data
        if(_.isArray(categories)){
            this.setState({ categories })
        }
    }

    selectCategory = (e) => {
        this.setState({
            category_id : e.target.value
        })

        let categories = this.state.categories
        let selectcategories = categories.filter((el)=>{
            return(
                el.category_id == e.target.value
            )
        })

        if(!_.isUndefined(selectcategories[0])){
            this.setState({ subcategories: selectcategories[0].subcategories })
        } else {
            this.setState({ subcategories: [] })
        }
    }

    addSize = () => {
        const { allinput, allsize, size, allstock, stock } = this.state

        if(size && stock){
            let input = allinput
            let num = allinput.length
            input.push(num)
            
            let sizes = allsize
            sizes.push(size)
    
            let stocks = allstock
            stocks.push(stock)
    
            this.setState({
                allinput : input,
                allsize : sizes,
                allstock : stocks,
                size: '',
                stock : '',
                messageadd: ''
            })
        } else {
            this.setState({ messageadd: 'Submit size and stock' })
        }
    }

    deleteSizes (i) {
        let allsize = this.state.allsize
        let allstock = this.state.allstock 
        let allinput = this.state.allinput   
        

        allsize.splice(i,1)
        allstock.splice(i,1)
        allinput.splice(i,1)

        this.setState({
            allsize,
            allstock,
            allinput
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleImage = (e) => {
        let file = e.target.files[0]
        let reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreview: reader.result
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { imagePreview, file, allinput, allsize, allstock, name, code, category_id, sub_category_id, price, weight, description } = this.state
        const token = this.props.user.token
        
        if(!description) this.setState({ message: 'Submit description' })        
        if(allsize.length<1) this.setState({ message: 'Click add size and stock' })
        if(!weight) this.setState({ message: 'Submit weight' })
        if(!price) this.setState({ message: 'Submit price' })
        if(!sub_category_id) this.setState({ message: 'Select subcategory' })
        if(!category_id) this.setState({ message: 'Select category' })
        if(!code) this.setState({ message: 'Submit code' })
        if(!name) this.setState({ message: 'Submit name' })
        if(!imagePreview) this.setState({ message: 'Submit image' })

        this.setState({ messageadd: '' })

        if(imagePreview && name && code && category_id && sub_category_id && price && weight && allsize && allstock && description ) {
            this.setState({ loading: true })
            let data = new FormData()
            data.append('image', file )
            axios.post( url + "/product/upload-image" , data , headers(token) )
            .then(res=>{
               
                let data = new FormData()
        
                allsize.map((v , i) => {        
                    data.append("size[]", allsize[i])
                    data.append("stock[]", allstock[i])
                })
                
                data.append("image", res.data.url)
                data.append("name", name)
                data.append("code", code)
                data.append("category_id", category_id)
                data.append("sub_category_id", sub_category_id)
                data.append("price", price)
                data.append("weight", weight)
                data.append("description", description)
        
                axios.post( url + "/product" , data, headers(token) )
                .then(res=>{
                    this.setState({ 
                        loading: false,
                        success: true, 
                        message: '',
                        imagePreview: '',
                        name: '',
                        code: '',
                        category_id: '',
                        allsize : [],
                        allstock : [],
                        sub_category_id: '',
                        price: '',
                        weight: '',
                        description: '',
                        file: null
                    })
                    setTimeout(() => {
                        this.setState({ success: false })
                    }, 2000);
                })
                .catch(err=>{
                    this.setState({ message: 'Failed add product', loading: false })
                })

            })
            .catch(err=>{
                this.setState({ message: 'Failed connect server', loading: false })
            })

        } 
        
    }

    render() {
        const { categories, subcategories, loading, imagePreview, allsize, allstock, name, code, size, stock, category_id, sub_category_id, price, weight, description, message, messageadd, success } = this.state
        return (
            <div className="add-wrapper">
                <Header />
                <Navbar />
                <Link to='/products'>
                    <div className="cancel"><i className="demo-icon icon-cancel">&#xe80f;</i></div>
                </Link>
                { loading ? <Loading /> : '' }

                <div className="add-product">
                    <h1>Add Product</h1>
                    { success ? <div className="success"><div>Success</div></div> : "" }

                    <div className="photo">
                        <div className="image">
                            { imagePreview ? <img src={imagePreview} alt="imagePreview"/> : <div></div> } 
                        </div>
                        <label htmlFor="photo">Image  <i className="demo-icon icon-picture">&#xe812;</i></label><br/>
                        <input onChange={this.handleImage} id="photo" type="file" accept="image/x-png,image/gif,image/jpeg"/>
                    </div>

                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="">Name</label>
                        <input value={name} onChange={this.handleChange} name="name" type="text"/>
                        <label htmlFor="">Code</label>
                        <input value={code} onChange={this.handleChange} name="code" type="text"/>
                        <label htmlFor="">Category</label>
                        <select value={category_id} onChange={this.selectCategory} name="category_id" id="category">
                            <option value="">select</option>
                            {
                                categories.map(category=>{
                                    return(
                                        <option key={category.category_id} value={category.category_id}>{category.category_name}</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor="">Subcategory</label>
                        <select value={sub_category_id} onChange={this.handleChange} name="sub_category_id" id="sub_category">
                            <option value="">select</option>
                            {
                                subcategories.map(subcategory=>{
                                    return(
                                        <option key={subcategory.sub_category_id} value={subcategory.sub_category_id}>{subcategory.name}</option>
                                    )
                                })
                            }
                        </select>
                        <label htmlFor="">Price</label>
                        <input value={price} placeholder="Rp" onChange={this.handleChange} name="price" type="text"/>
                        <label htmlFor="">Weight</label>
                        <input value={weight} placeholder="gram"  onChange={this.handleChange} name="weight" type="text"/>
                        
                        <label htmlFor="">Size and Stock</label>

                        <div className="size-stock">
                            <div>
                                <span>Size</span><br/>
                                <hr/>
                                {
                                    allsize.map((size, i)=>{
                                        return(
                                                <div className="size" key={i}>
                                                    {size}
                                                    <hr/>
                                                </div>
                                        )
                                    })
                                }
                                <input placeholder="Input size" onChange={this.handleChange} value={size} name="size" type="text"/>
                            </div>
                            <div>
                                <span>Stock</span><br/>
                                <hr/>
                                {
                                    allstock.map((stock, i)=>{
                                        return(
                                                <div className="stock" key={i}>
                                                    {stock} <span onClick={()=>this.deleteSizes(i)}><i className="demo-icon icon-minus">&#xe814;</i></span>
                                                    <hr/>
                                                </div>
                                        )
                                    })
                                }
                                <input placeholder="Input stock" onChange={this.handleChange} value={stock} name="stock" type="text"/>
                            </div>
                        
                        </div>
                        <span className="message">{messageadd}</span>
                        <span className="add" onClick={this.addSize}>Add size</span>

                        <label htmlFor="description">Description</label>

                        <ReactQuill className="description" value={description} onChange={ (value)=>this.setState({ description: value }) } id="description"/>

                        <span className="message">{message}</span>
                        <button type="submit">Save</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        categories : state.categoriesReducer,
        user : state.userReducer
    })
}

export default connect(mapStateToProps )(AddProduct);
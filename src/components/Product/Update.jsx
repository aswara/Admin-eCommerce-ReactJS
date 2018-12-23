import React, { Component } from 'react';
import './update.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { url, headers } from '../../config'
import { connect } from 'react-redux'
import _ from 'lodash'

import Header from '../Header'
import Navbar from '../Navbar'
import Loading from '../Loading'

class UpdateProduct extends Component {
    state = {
        product: this.props.location.state.product,
        imagePreview : '',
        message : '',
        messageadd: '',
        sizes: [],
        stocks: [],
        sizeinput: '',
        stockinput: '',
        description: '',
        success: false,
        loading: false,
        categories: [],
        subcategories: [],
    }

    componentDidMount() {
        let categories = this.props.categories.data
        if(_.isArray(categories)){
            this.setState({ categories })
        }
        this.fetchProduct()
    }

    fetchProduct() {
        if(this.props.location.state.product){
            const { product_id, name, code, category_id, sub_category_id, price, weight, description, image, sizes, stocks } = this.props.location.state.product
            this.setState({
                sizes,
                stocks,
                name,
                code, 
                category_id, 
                sub_category_id, 
                price, 
                weight, 
                description, 
                image,
                product_id
            })
        } else {
            let id = this.props.match.params.id
            axios( url + "/product/" + id )
            .then(res=>{
                if(res.data){
    
                    const { product_id, name, code, category_id, sub_category_id, price, weight, description, image, sizes, stocks } = res.data
                    this.setState({
                        sizes,
                        stocks,
                        name,
                        code, 
                        category_id, 
                        sub_category_id, 
                        price, 
                        weight, 
                        description, 
                        image,
                        product_id
                    })
                }
            })
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
        const { sizes, inputsize, stocks, inputstock } = this.state

        if(inputsize && inputstock){
            
            let size = sizes
            size.push(inputsize)
    
            let stock = stocks
            stock.push(inputstock)
    
            this.setState({
                sizes : size,
                stocks : stock,
                inputsize: '',
                inputstock : '',
                messageadd: ''
            })
        } else {
            this.setState({ messageadd: 'Submit size and stock' })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    changeSize (e, i) {
        let all = this.state.sizes
        all[i] = e.target.value
        this.setState({
            sizes: all
        })
    }

    changeStock (e, i) {
        let all = this.state.stocks
        all[i] = e.target.value
        this.setState({
            stocks: all
        })
    }

    deleteSizes (i) {
        let allsizes = this.state.sizes
        let allstocks = this.state.stocks    
        
        allsizes.splice(i,1)
        allstocks.splice(i,1)

        this.setState({
            sizes: allsizes,
            stocks: allstocks
        })
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

    handleSubmit = (e) => {
        e.preventDefault()
        const { image, file, sizes, stocks, name, code, category_id, sub_category_id, price, weight, description, product_id } = this.state
        const token = this.props.user.token
        
        if(!description) this.setState({ message: 'Submit description' })        
        if(sizes.length<1) this.setState({ message: 'Click add size and stock' })
        if(!weight) this.setState({ message: 'Submit weight' })
        if(!price) this.setState({ message: 'Submit price' })
        if(!sub_category_id) this.setState({ message: 'Select subcategory' })
        if(!category_id) this.setState({ message: 'Select category' })
        if(!code) this.setState({ message: 'Submit code' })
        if(!name) this.setState({ message: 'Submit name' })
        if(!image) this.setState({ message: 'Submit image' })

        this.setState({ messageadd: '', loading: true })

        //post data if no change image
        if(!file && image && name && code && category_id && sub_category_id && price && weight && sizes && stocks && description) {

            let data = { name, code, category_id, sub_category_id, price, weight, description, image, size: sizes, stock: stocks }
    
            axios.put( url + "/product/" + product_id , data, headers(token) )
            .then(res=>{
                this.setState({ 
                    loading: false,
                    success: true, 
                    message: '',
                    file: null
                })
                setTimeout(() => {
                    this.setState({ success: false, product: null })
                }, 2000);
            })
            .catch(err=>{
                this.setState({ message: 'Failed add product', loading: false })
            })
        }

        //Post data if change image
        if(file && name && code && category_id && sub_category_id && price && weight && sizes && stocks && description ) {
            let data = new FormData()
            data.append('image', file )
            axios.post( url + "/product/upload-image" , data , headers(token) )
            .then(res=>{

                let data = { name, code, category_id, sub_category_id, price, weight, description, image: res.data.url, size: sizes, stock: stocks }
        
                axios.put( url + "/product/" + product_id , data, headers(token) )
                .then(res=>{
                    this.setState({ 
                        loading: false,
                        success: true, 
                        message: '',
                        file: null
                    })
                    setTimeout(() => {
                        this.setState({ success: false, product: null })
                    }, 3000);
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
        const { product, product_id, categories, subcategories, loading, inputsize, inputstock, sizes, stocks, message, messageadd, success, name, code, category_id, sub_category_id, price, weight, description, image } = this.state
        return (
            <div className="update-product">
                <Header />
                <Navbar />

                <Link to={{ pathname:`/product/${product_id}`, state: product }}>
                    <div className="cancel"><i className="demo-icon icon-cancel">&#xe80f;</i></div>
                </Link>
                
                { loading ? <Loading /> : '' }

                <div className="add-product">
                    <h1>Update Product</h1>
                    { success ? <div className="success"><div>Success</div></div> : "" }

                    <div className="photo">
                        <div className="image">
                            <img src={image} alt="imagePreview"/> 
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
                                   _.isArray(sizes) && sizes.map((size, i)=>{
                                        return(
                                                <div className="size" key={i}>
                                                    <input value={size} onChange={ (e)=>this.changeSize(e, i) } type="text"/>
                                                    <hr/>
                                                </div>
                                        )
                                    })
                                }
                                <input placeholder="Input size" onChange={(e)=>this.setState({ inputsize: e.target.value })} value={inputsize} name="size" type="text"/>
                            </div>
                            <div>
                                <span>Stock</span><br/>
                                <hr/>
                                {
                                   _.isArray(stocks) && stocks.map((stock, i)=>{
                                        return(
                                                <div className="stock" key={i}>
                                                    <input onChange={(e)=>this.changeStock(e,i)} value={stock} type="text"/> <span onClick={()=>this.deleteSizes(i)}><i className="demo-icon icon-minus">&#xe814;</i></span>
                                                    <hr/>
                                                </div>
                                        )
                                    })
                                }
                                <input placeholder="Input stock" onChange={(e)=> this.setState({ inputstock: e.target.value })} value={inputstock} name="inputstock" type="text"/>
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

export default connect(mapStateToProps )(UpdateProduct);
import React, { Component } from 'react';
import './products.scss'
import axios from 'axios'
import { url } from '../../config'
import { connect } from 'react-redux'
import { categoryAction } from '../../actions'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import Product from './Product'
import Header from '../Header'
import Navbar from '../Navbar'

class index extends Component {
    state = {
        show: 'card',
        loading : true,
        products : [1,2,3,4,5,6,7,8,9,10],
        categories : [],
        subcategories : [],
        category_id : 0,
        sub_category_id: 0
    }


    componentDidMount(){
        this.fetchProducts()
        let category = localStorage.getItem('categories')
        if(_.isString(category)){
            let categories = JSON.parse(category)
            if(_.isArray(categories))
                this.setState({ categories, loading: false })
        }
        this.fetchCategories()
    }

    fetchCategories = () => {
        axios.get( url + '/category' )
        .then(res=>{
            if(_.isArray(res.data.data)){
                this.props.categoryAction(res.data.data)
                this.setState({ categories: res.data.data, loading: false })
            }
        })
    }

    

    fetchProducts = () => {
        let products = JSON.parse(localStorage.getItem('products'))
        if(_.isArray(products)){
            this.setState({ products, loading: false })
        }
        axios.get( url + "/product" )
        .then(res=>{
            if( _.isArray(res.data) )
                this.setState({ products: res.data, loading: false })
                localStorage.setItem('products', JSON.stringify(res.data))
        })
    }

    selectCategory = (e) => {
        let id = e.target.value

        this.setState({ category_id: id, sub_category_id: 0 })
        if(id <= 0){
            this.fetchProducts()
        } else {
            this.fetchProductsCategory(id)
        }

        let categories = this.state.categories
        let selectcategories = categories.filter((el)=>{
            return(
                el.category_id == id
            )
        })

        if(!_.isUndefined(selectcategories[0])){
            this.setState({ subcategories: selectcategories[0].subcategories })
        } else {
            this.setState({ subcategories: [] })
        }
    }

    fetchProductsCategory(id){
        let products = JSON.parse(localStorage.getItem(`category${id}`))
        if(_.isArray(products)){
            this.setState({ products, loading: false })
        }

        axios.get( url + "/product/category/" + id )
        .then(res=>{
            if(_.isArray(res.data)){
                localStorage.setItem(`category${id}`, JSON.stringify(res.data))
                this.setState({ products: res.data, loading: false })
            }
        })
    }

    selectSubcategory = (e) => {
        let id = e.target.value
        let category = this.state.category_id
        this.setState({ sub_category_id: id })
        if(id <= 0){
            this.fetchProductsCategory(category)
        } else {
            let products = JSON.parse(localStorage.getItem(`category${category}${id}`))
            if(_.isArray(products)){
                this.setState({ products, loading: false })
            }

            axios.get( url + "/product/category/" + category + "?idSub=" + id )
            .then( res => {
                if(_.isArray(res.data)){
                    localStorage.setItem(`category${category}${id}`, JSON.stringify(res.data))
                    this.setState({ products: res.data, loading: false })
                }
            } )
        }
    }

    render() {
        const { loading, products, show, categories, subcategories, sub_category_id, category_id } = this.state
        return (
            <div className="products">
                <Header />
                <Navbar />

                <div className="wrapper">
                    <Link to="/addproduct">
                    <div className="new">
                        <i className="demo-icon icon-plus">&#xe808;</i>
                    </div>
                    </Link>
                    <span>Products</span>
                    <div className="show">
                        <div className={ show === 'card' ? 'active' : '' } onClick={()=> this.setState({ show: 'card' })}>
                            <span>cards</span>
                        </div>
                        <div className={ show === 'table' ? 'active' : '' }  onClick={()=> this.setState({ show: 'table' })} >
                            <span>table</span>
                        </div>
                    </div>

                    <div className="wrapper-search">
                        <div className="search">
                            <label htmlFor="category">Category</label>
                            <select value={category_id} onChange={this.selectCategory} name="category" id="category">
                                <option value="0">All</option>
                                {
                                categories && categories.map( category => <option value={category.category_id}>{category.category_name}</option> )
                                }
                            </select>
                        </div>

                        <div className="search">
                            <label htmlFor="category">Subcategory</label>
                            <select value={sub_category_id} onChange={this.selectSubcategory} name="category" id="category">
                                <option value="0">All</option>
                                {
                                subcategories && subcategories.map( category => <option value={category.sub_category_id}>{category.name}</option> )
                                }
                            </select>
                        </div>
                    </div>

                    { // loading product
                        loading ? <div className={show}>{ products.map(num=> <div key={num} className="loading-list"><div></div><div></div><div></div></div> ) }</div> :
                        <div className={show}>
                            { //list all products 
                                products.map(product=> <Product key={product.product_id} product={product} /> )
                            }
                        </div>
                    }

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

export default connect(mapStateToProps , { categoryAction })(index);
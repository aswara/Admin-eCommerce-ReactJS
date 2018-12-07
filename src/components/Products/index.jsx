import React, { Component } from 'react';
import './products.scss'
import AddProduct from './AddProduct'
import axios from 'axios'
import { url } from '../../config'
import { connect } from 'react-redux'
import { categoriesAction, subcategoriesAction } from '../../actions'

import Product from './Product'
import Header from '../Header'
import Navbar from '../Navbar'

class index extends Component {
    state = {
        open_add : false,
        products : []
    }

    componentDidMount() {
        this.props.categoriesAction()
        this.fetchProducts()
    }

    fetchProducts = () => {
        axios.get( url + "/product" )
        .then(res=>{
            if( res.data.constructor === Array )
                this.setState({ products: res.data })
        })
    }

    render() {
        const { open_add, products } = this.state
        const { categories, subcategories, subcategoriesAction } = this.props
        console.log(this.props)
        return (
            <div className="products">
                <Header />
                <Navbar />

                <div className="wrapper">
                    <div onClick={()=>{this.setState({ open_add : !open_add })}} className="new">
                        { open_add ? <i className="demo-icon icon-cancel">&#xe80f;</i> : <i className="demo-icon icon-plus">&#xe808;</i> }
                    </div>

                    <span>Products</span>

                    { // open add product
                        open_add ? <AddProduct categories={categories.data} subcategories={subcategories.data} subcategoriesAction={subcategoriesAction} /> :
                        <div className="card">
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
        subcategories : state.subcategoriesReducer
    })
}

export default connect(mapStateToProps , { categoriesAction, subcategoriesAction })(index);
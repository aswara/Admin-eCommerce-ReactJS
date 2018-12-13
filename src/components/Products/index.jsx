import React, { Component } from 'react';
import './products.scss'
import axios from 'axios'
import { url } from '../../config'
import { connect } from 'react-redux'
import { categoriesAction, subcategoriesAction } from '../../actions'
import { Link } from 'react-router-dom'

import Product from './Product'
import Header from '../Header'
import Navbar from '../Navbar'

class index extends Component {
    state = {
        show: 'card',
        loading : true,
        products : [1,2,3,4,5,6,7,8,9,10]
    }

    componentDidMount() {
        this.props.categoriesAction()
        this.fetchProducts()
    }

    fetchProducts = () => {
        let products = JSON.parse(localStorage.getItem('products'))
        if(products){
            this.setState({ products, loading: false })
        }
        axios.get( url + "/product" )
        .then(res=>{
            if( res.data.constructor === Array )
                this.setState({ products: res.data, loading: false })
                localStorage.setItem('products', JSON.stringify(res.data))
        })
    }

    render() {
        const { loading, products, show } = this.state
        const { categories, subcategories, subcategoriesAction, user } = this.props
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

                    <div className="search">

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
        subcategories : state.subcategoriesReducer,
        user : state.userReducer
    })
}

export default connect(mapStateToProps , { categoriesAction, subcategoriesAction })(index);
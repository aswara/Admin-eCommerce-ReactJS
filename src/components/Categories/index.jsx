import React, { Component } from 'react';
import './categories.scss'
import axios from 'axios'
import { url, headers } from '../../config'

import Header from '../Header'
import Navbar from '../Navbar'
import AddCategory from './AddCategory'
import Category from './Category'

class index extends Component {
    state = {
        new_category: true,
        categories: [1,2,3,4,5,6,7,8,9,10,11],
        loading: true
    }
    
    componentDidMount(){
        this.fetchCategories()
    }

    fetchCategories = () => {
        axios.get( url + '/category' )
        .then(res=>{
            this.setState({ categories: res.data, loading: false })
        })
        .catch(res=>{
            this.setState({ loading: true })
        })
    }

    newCategory = () => {
        this.setState({ new_category: !this.state.new_category })
    }

    render() {
        const { new_category, categories, loading } = this.state
        return (
            <div className="categories">
                <Header />
                <Navbar />

                { //loading fect data categories
                    loading ? <div className="wrapper">{ categories.map(category=>{ return(<div key={category} className="category loading-list"></div>) }) }</div> :
                

                <div className="wrapper">
                    <span>Categories</span>

                    {/* Button for add category */}
                    <div onClick={this.newCategory} className="new">
                       { !new_category ? <i className="demo-icon icon-cancel">&#xe80f;</i> : <i className="demo-icon icon-plus">&#xe808;</i> } 
                    </div>

                    {/* Component for input new category */}
                    { new_category ? '' : <AddCategory update={this.fetchCategories} />  }

                    {/* List all categories */}
                    {
                        categories.map(category=>{
                            return(
                                <Category key={category.category_id} update={this.fetchCategories} category={category} />
                            )
                        })
                    }

                </div>

                }

            </div>
        );
    }
}

export default index;
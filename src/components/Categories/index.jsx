import React, { Component } from 'react';
import './categories.scss'

import Header from '../Header'
import Navbar from '../Navbar'
import AddCategory from './AddCategory'

class index extends Component {
    state = {
        new_category: true
    }

    newCategory = () => {
        this.setState({ new_category: !this.state.new_category })
    }

    render() {
        const { new_category } = this.state
        return (
            <div className="categories">
                <Header />
                <Navbar />
                <div className="wrapper">
                    <span>Categories</span>

                    <div onClick={this.newCategory} className="new">
                       { !new_category ? <i class="demo-icon icon-cancel">&#xe80f;</i> : <i class="demo-icon icon-plus">&#xe808;</i> } 
                    </div>

                    {/* Component for input new category */}
                    { new_category ? '' : <AddCategory />  }

                    <div className="category">
                        <div>
                            <span>Pakaian Anak</span>
                        </div>
                        <div className="actions">
                            <div className="delete">
                                <i class="demo-icon icon-minus">&#xe814;</i>
                            </div>
                            <div className="update">
                                <i class="demo-icon icon-cog">&#xe81a;</i>
                            </div>
                            <div className="add">
                                <i class="demo-icon icon-plus">&#xe808;</i>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default index;
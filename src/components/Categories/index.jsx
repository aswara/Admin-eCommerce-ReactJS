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
                    
                    </div>

                    {/* Component for input new category */}
                    { new_category ? '' : <AddCategory />  }

                    <div className="category">
                        <div>
                            <span>Pakaian Anak</span>
                        </div>
                        <div className="actions">
                            <div className="delete">
                            
                            </div>
                            <div className="update">
                            
                            </div>
                            <div className="add">
                            
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        );
    }
}

export default index;
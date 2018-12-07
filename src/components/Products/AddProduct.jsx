import React, { Component } from 'react';
import './addproduct.scss'

class AddProduct extends Component {
    componentDidMount(){
        this.props.subcategoriesAction(1)
    }

    selectCategory = (e) => {
        this.props.subcategoriesAction(e.target.value)
        this.setState({
            category_id : e.target.value,
            sub_category_id : ""
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
        const { categories, subcategories } = this.props
        console.log(this.state)
        return (
            <div className="add-product">
                <span>New Product</span>
                <form action="">
                    <label htmlFor="">Name</label>
                    <input onChange={this.handleChange} name="name" type="text"/>
                    <label htmlFor="">Code</label>
                    <input  onChange={this.handleChange} name="code" type="text"/>
                    <label htmlFor="">Category</label>
                    <select onChange={this.selectCategory} name="category_id" id="category">
                        <option value="">select</option>
                        {
                            categories.map(category=>{
                                return(
                                    <option key={category.category_id} value={category.category_id}>{category.name}</option>
                                )
                            })
                        }
                    </select>
                    <label htmlFor="">Subcategory</label>
                    <select  onChange={this.handleChange} name="sub_category_id" id="sub_category">
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
                    <input onChange={this.handleChange} name="price" type="text"/>
                    <label htmlFor="">Weight</label>
                    <input  onChange={this.handleChange} name="weight" type="text"/>
                    
                    <input onChange={this.handleChange} name="size[]" type="text"/>
                    <input onChange={this.handleChange} name="stock[]" type="text"/>

                    <label htmlFor="">Description</label>
                    <input  onChange={this.handleChange} name="description" type="text"/>
                </form>
            </div>
        );
    }
}

export default AddProduct;
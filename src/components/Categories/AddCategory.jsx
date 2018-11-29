import React, { Component } from 'react';
import './add.scss'

class AddCategory extends Component {
    render() {
        return (
            <div className="add-category">
                <form action="">
                    <input type="text"/>
                    <button>Add</button>
                </form>
            </div>
        );
    }
}

export default AddCategory;
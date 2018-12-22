import React, { Component } from 'react';
import './subcategory.scss'
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'

class SubCategory extends Component {
    state = {
        open : true,
        comfirm_delete : true,
        name : '',
        message : ''
    }


    deleteCategory(id) {   
        axios.delete( url+ '/subcategory/' + id , headers(this.props.user.token) )
        .then(res=>{
            this.setState({ comfirm_delete: true, message: 'Success delete subcategory' })
            this.props.update()
        })
        .catch(err=>{
            this.setState({ comfirm_delete: true, message: 'Failed delete subcategory' })
        })
    }


    openUpdateCategory = (name) =>{
        this.setState({ name, open: !this.state.open, message: '' })
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

    updateCategory(e, id) {
        e.preventDefault()
        const { name, file, image } = this.state 
        let formData = new FormData()
        formData.append('image', file)

        //post data if no change image
        if(name && !file){
            let data = {
                name,
                image: this.props.data.icon,
                category_id: this.props.data.category_id 
            }
            axios.put( url + '/subcategory/' + id , data ,headers(this.props.user.token) )
            .then(res=>{ 
                this.setState({ message: 'Success update subcategory', open: true })
                this.props.update()
            })
            .catch(err=>{ this.setState({ message: 'Failed update subcategory' }) })
        }

        //post data if change image
        if(name && file){
            axios.post( url + "/subcategory/upload-image", formData )
            .then(res=>{
                let data = {
                    name,
                    image: res.data.url,
                    category_id: this.props.data.category_id 
                }
                axios.put( url + '/subcategory/' + id , data ,headers(this.props.user.token) )
                .then(res=>{ 
                    this.setState({ message: 'Success update subcategory', open: true })
                    this.props.update()
                })
                .catch(err=>{ this.setState({ message: 'Failed update subcategory' }) })
            })
        }


    }

    render() {
        const { open, name, comfirm_delete, message, image } = this.state
        const { data } = this.props
        return (
            <div>
                <span className="message">{message}</span>
                <div className="sub-category">
                    <div className="photo">
                        { image ? <img src={image} alt="image"/> : <img src={data.icon} alt="image"/> }
                    </div>
                    <div className="name">
                        <span>{data.name}</span>
                    </div>
                    <div className="actions">
                        <div onClick={()=>{this.setState({ comfirm_delete : false})}} className="delete">
                            <i className="demo-icon icon-minus">&#xe814;</i>delete
                        </div>
                        <div onClick={()=>{this.openUpdateCategory(data.name)}} className="update">
                            <i className="demo-icon icon-cog">&#xe81a;</i>edit
                        </div>
                    </div>
                </div>

                { //open comfirm delete category
                    comfirm_delete ? '' :
                    <div className="comfirm-delete">
                        <div>
                            <h3>Are you sure want to delete?</h3>
                            <button onClick={()=>{this.deleteCategory(data.sub_category_id)}}>Yes</button>
                            <button onClick={()=>{this.setState({ comfirm_delete: true })}}>No</button>
                        </div>
                    </div>
                }
                

                { //open input for update category
                    open ? '' :
                    <div className="update-subcategory">
                        <input onChange={this.handleImage} type="file" accept="image/x-png,image/gif,image/jpeg"/>
                        <form onSubmit={(e)=>{ this.updateCategory(e, data.sub_category_id) }}>
                            <input onChange={(e)=>{this.setState({ name: e.target.value })}} value={name} type="text" />
                            <button type="submit">Save</button>
                        </form>
                    </div>
                }

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return({
        user: state.userReducer
    })
}

export default connect(mapStateToProps)(SubCategory);
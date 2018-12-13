import React, { Component } from 'react';
import './product.scss'
import axios from 'axios'
import { url, headers } from '../../config'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Header from '../Header'
import Navbar from '../Navbar'
import  Loading from '../Loading'

class index extends Component {
    state = {
        product : '',
        size: [],
        stock: [],
        comfirm_delete: true,
        message: '',
        loading: true
    }

    deleteProduct(id) {   
        axios.delete( url+ '/product/' + id , headers(this.props.user.token) )
        .then(res=>{
            this.props.history.push("/products")
        })
        .catch(err=>{
            this.setState({ message: 'Failed delete', comfirm_delete: false })
        })
    }

    componentWillMount(){
        let id = this.props.match.params.id
        axios( url + "/product/" + id )
        .then(res=>{
            if(res.data){
                let sizes = res.data.sizes
                let size = []
                let stock = []
                if(sizes){
                    for (const key in sizes) {
                        if (sizes.hasOwnProperty(key)) {
                            const element = sizes[key];
                            size.push(key)
                            stock.push(element)
                        }
                    }
                }
                this.setState({
                    product: res.data,
                    size,
                    stock,
                    loading: false
                })
            }
        })
    }

    render() {
        const { product, size, stock, comfirm_delete, message, loading } = this.state
        return (
            <div className="detail-product">
                <Header />
                <Navbar />

                { //open comfirm delete category
                    comfirm_delete ? '' :
                    <div className="comfirm-delete">
                        <div>
                            <h3>Are you sure want to delete?</h3>
                            <button onClick={()=>{this.deleteProduct(product.product_id)}}>Yes</button>
                            <button onClick={()=>{this.setState({ comfirm_delete: true })}}>No</button>
                        </div>
                    </div>
                }

                <div>
                    <div className="wrapper">
                        <div className="image">
                           { loading ? <div className="load"></div> :  <img src={product.image} alt=""/> }
                        </div>
                        <div className="detail">
                            <span className="message">{message}</span>

                            <div onClick={()=>{this.setState({ comfirm_delete: false })}} className="delete">
                                <i  className="demo-icon icon-minus">&#xe814;</i><span>delete</span>
                            </div>
                            <Link to={`/updateproduct/${product.product_id}`}>
                            <div className="update">
                                <i className="demo-icon icon-cog">&#xe81a;</i><span>edit</span>
                            </div>
                            </Link>

                            <div className="box">
                            <div className="name">
                                { loading ? <div className="load"></div> : <span>{product.name}</span> }
                            </div>
                            <div className="code">
                                Code Product <br/>
                                { loading ? <div className="load"></div> : <span>{product.code}</span> }
                            </div>
                            <div className="category">
                                <div>
                                    Category <br/>
                                    { loading ? <div className="load"></div> :  <span>{product.category_name}</span> }
                                </div>
                                <div>
                                    Subcategory <br/>
                                    { loading ? <div className="load"></div> :  <span>{product.sub_category_name}</span> }
                                </div>
                            </div>
                            <div className="weight">
                                Weight <br/>
                                { loading ? <div className="load"></div> :  <span>{product.weight}</span> }                               
                            </div>
                            <div className="sizes">
                                <div className="size-stock">
                                    <div>
                                        <span>Size</span>
                                        <hr/>
                                        {
                                            size.map( (x,i) => <div key={i} className="size">{x} <hr/></div> )
                                        }
                                    </div>
                                    <div>
                                        <span>Stock</span>
                                        <hr/>
                                        {
                                            stock.map( (x,i) => <div key={i} className="stock">{x} <hr/></div> )
                                        }
                                    </div>
                                </div>
                            </div>
                            </div>

                            <div className="price">
                                Price <br/>
                                { loading ? <div className="load"></div> : <span>Rp {product.price}</span> }
                            </div>
                        </div>
                    </div>
                    <div className="description">
                        Description <br/>
                        <div dangerouslySetInnerHTML={{__html:product.description}}></div>                      
                    </div>
                </div>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return({
        user: state.userReducer
    })
}

export default connect(mapStateToProps)(index);
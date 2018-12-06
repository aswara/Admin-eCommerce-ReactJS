import React from 'react';
import './navbar.scss'
import { NavLink } from 'react-router-dom'

export default function index(props) {
    return (
        <div className="navbar">
            <NavLink className="link" to="/dashboard" activeClassName="active" > <i className="demo-icon icon-th-large-outline">&#xe807;</i><span> Dashboard</span> </NavLink>
            <NavLink className="link" to="/orders" activeClassName="active" > <i className="demo-icon icon-credit-card">&#xf283;</i><span> Orders</span> </NavLink>
            <NavLink className="link" to="/products" activeClassName="active" > <i className="demo-icon icon-shopping-bag">&#xf290;</i><span> Products</span> </NavLink>
            <NavLink className="link" to="/customers" activeClassName="active" > <i className="demo-icon icon-users-1">&#xf064;</i><span> Customers</span> </NavLink>
            <NavLink className="link" to="/categories" activeClassName="active" > <i className="demo-icon icon-tags">&#xe816;</i><span> Categories</span> </NavLink>
        </div>
    );
}
import React from 'react';
import './navbar.scss'
import { NavLink } from 'react-router-dom'

export default function index(props) {
    return (
        <div className="navbar">
            <NavLink className="link" to="/dashboard" activeClassName="active" > <span>Dashboard</span> </NavLink>
            <NavLink className="link" to="/orders" activeClassName="active" > <span>Orders</span> </NavLink>
            <NavLink className="link" to="/products" activeClassName="active" > <span>Products</span> </NavLink>
            <NavLink className="link" to="/costumers" activeClassName="active" > <span>Costumers</span> </NavLink>
            <NavLink className="link" to="/categories" activeClassName="active" > <span>Categories</span> </NavLink>
        </div>
    );
}
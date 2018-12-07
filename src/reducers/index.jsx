import { combineReducers } from 'redux'
import { LOGIN } from '../types'               
import { categoriesReducer, subcategoriesReducer }  from './categories'


const initialState = {
    token: localStorage.getItem('token')
}

const userReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case LOGIN:
            return {
                login: true,
                token: action.token
            }
        default:
            return state
    }
}

export default combineReducers({ userReducer, categoriesReducer, subcategoriesReducer })
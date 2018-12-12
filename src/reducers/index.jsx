import { combineReducers } from 'redux'             
import { categoriesReducer, subcategoriesReducer }  from './categories'
import { userReducer } from './user'



export default combineReducers({ userReducer, categoriesReducer, subcategoriesReducer })
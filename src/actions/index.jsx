import { LOGIN, FETCH_CATEGORIES, FETCH_SUBCATEGORIES } from '../types'
import axios from 'axios'
import { url } from '../config'

export const loginAction = (token) => {
    return (dispatch) => {
        localStorage.setItem('token', token)
        dispatch({
            type: LOGIN,
            token : token,
        })
    }
}

export const categoriesAction = () => {
    return (dispatch) => {
        axios.get( url + "/category" )
        .then(res=>{
            if(res.data.constructor === Array)
                dispatch({
                    type: FETCH_CATEGORIES,
                    payload: res.data
                })
            else
                dispatch({
                    type: FETCH_CATEGORIES,
                    payload: []
                })
        })
        .catch(err=>{
            dispatch({
                type: FETCH_CATEGORIES,
                payload: []
            })
        })

    }
}

export const subcategoriesAction = (id) => {
    return (dispatch) => {
        axios.get( url + "/subcategory/category/" + id )
        .then(res=>{
            if(res.data.constructor === Array)
                dispatch({
                    type: FETCH_SUBCATEGORIES,
                    payload: res.data
                })
            else
                dispatch({
                    type: FETCH_SUBCATEGORIES,
                    payload: []
                })
        })
        .catch(err=>{
            dispatch({
                type: FETCH_SUBCATEGORIES,
                payload: []
            })
        })

    }
}
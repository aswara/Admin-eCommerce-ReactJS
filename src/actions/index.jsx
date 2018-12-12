import { LOGIN,LOGOUT, FETCH_CATEGORIES, FETCH_SUBCATEGORIES } from '../types'
import axios from 'axios'
import { url } from '../config'

export const userAction = (payload, login, token) => {
    return(dispatch) => {
        dispatch ({
            type: LOGIN,
            payload,
            login,
            token
        })
    }
}

export const loginAction = (token, payload) => {
    return (dispatch) => {
        localStorage.setItem('token', token)
        dispatch({
            type: LOGIN,
            token : token,
            login : true,
            payload
        })
    }
}

export const logoutAction = () => {
    return (dispatch) => {
        localStorage.removeItem('token')
        dispatch({
            type: LOGOUT,
            token : null,
            login : false,
            payload: null
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
            if(res.data.datasub.constructor === Array)
                dispatch({
                    type: FETCH_SUBCATEGORIES,
                    payload: res.data.datasub
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
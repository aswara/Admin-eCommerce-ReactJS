import { LOGIN,LOGOUT, FETCH_CATEGORIES } from '../types'
import axios from 'axios'
import { url } from '../config'

export const userAction = (payload, login, token) => {
    return(dispatch) => {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(payload))
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
        localStorage.setItem('user', JSON.stringify(payload))
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
        localStorage.removeItem('user')
        dispatch({
            type: LOGOUT,
            token : null,
            login : false,
            payload: null
        })
    }
}

export const categoryAction = (payload) => {
    return (dispatch) => {
        localStorage.setItem('categories', JSON.stringify(payload) )
        dispatch({
            type: FETCH_CATEGORIES,
            payload
        })

    }
}

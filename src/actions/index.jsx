import { LOGIN } from '../types'

export const loginAction = (token) => {
    return (dispatch) => {
        localStorage.setItem('token', token)
        dispatch({
            type: LOGIN,
            token
        })
    }
}
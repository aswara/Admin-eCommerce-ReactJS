import { LOGIN } from '../types'  

const initialState = {
    token: localStorage.getItem('token'),
}

export const userReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case LOGIN:
            return {
                token: action.token,
                data: action.payload,
                login: action.login
            }
        default:
            return state
    }
}

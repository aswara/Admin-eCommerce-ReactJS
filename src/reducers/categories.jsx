import { FETCH_CATEGORIES } from '../types'

const initialState = {
    data: []
}

export const categoriesReducer = ( state = initialState, action ) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
                data: action.payload
            }
        default:
            return state
    }
}




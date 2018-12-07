import { FETCH_CATEGORIES, FETCH_SUBCATEGORIES } from '../types'


export const categoriesReducer = ( state = { data: [] }, action ) => {
    switch (action.type) {
        case FETCH_CATEGORIES:
            return {
                data: action.payload
            }
        default:
            return state
    }
}

export const subcategoriesReducer = ( state = { data: [] }, action ) => {
    switch (action.type) {
        case FETCH_SUBCATEGORIES:
            return {
                data: action.payload
            }
        default:
            return state
    }
}


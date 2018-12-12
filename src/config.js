export const url = "https://e-commerce-rest-api.herokuapp.com"

export function headers(token) {
    return(
        {   
            headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
            }
        }
    )
}
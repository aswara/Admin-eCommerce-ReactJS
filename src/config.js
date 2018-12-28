import _ from 'lodash'

//endpoint
export const url = "https://e-commerce-rest-api.herokuapp.com"

//headers
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

//convert price
export function price(number){
    if(_.isNumber(number)){
    let reverse = number.toString().split('').reverse().join(''),
    thousand = reverse.match(/\d{1,3}/g);
    thousand = thousand.join('.').split('').reverse().join('');
    return thousand + ",-";
    } else {
        return number
    }
}
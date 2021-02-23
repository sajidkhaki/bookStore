import { API } from '../Config'

export const SignupData = (userData) => {
    console.log("Data", userData)
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    })
        .then(response => {
            console.log("Response", response)
            return response.json()
        }).catch(err => {
            console.log("Error", err)
        })
}

export const SigninData = (user) => {
    //console.log("Data", user)
    return fetch(`${API}/signin`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(response => {
           // console.log("Response", response)
            return response.json()
        }).catch(err => {
            console.log("Error", err)
        })
}

export const authenticate = (data, next) => { // store token in local sorage
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data)) // key and then value
        next()
    }
}

export const signout = (next) => {

    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt') // Remove token from local storage
        next()
        return fetch(`${API}/signout`, {
            method: "GET"
        })
            .then(response => {
                //console.log("Signout Response", response)
            }).catch(err => {
                console.log("Error", err)
            })
    }
}

export const isAuthenticated = () => { // for hiding and showing sign in, signout links
    if (typeof window == "undefined") {
        return false
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'))
    } else {
        return false
    }
}
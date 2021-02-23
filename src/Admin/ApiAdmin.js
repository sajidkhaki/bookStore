import { API } from '../Config'

export const addAdminCategory = (userId, token, category) => {
    console.log("Data", category)
    return fetch(`${API}/category/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            'x-access-token' : token,
        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json()
        }).catch(err => {
            console.log("Error", err)
        })
}


export const createProduct = (userId, token, product) => {
    console.log("Data", product)
    return fetch(`${API}/product/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'x-access-token': token,
        },
        body: product
    })
        .then(response => {
            return response.json()
        }).catch(err => {
            console.log("Error", err)
        })
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: "GET",
    })
        .then(response => {
            return response.json()
        }).catch(err => {
            console.log("Error", err)
        })
}

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'x-access-token': token,
        },
    })
        .then(response => {
            return response.json()
        }).catch(err => {
            console.log("Error", err)
        })
}

export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/shippingStatus/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'x-access-token': token,
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {

    console.log("userId", userId)
    console.log("orderId", orderId)
    console.log("token", token)
    return fetch(`${API}/order/${orderId}/updateStatus/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status, orderId })
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};



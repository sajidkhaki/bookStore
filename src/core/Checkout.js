import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { getBraintreeToken, processPayment, createOrder } from './ApiCore'
import { emptyCart } from './CartHelper'
import { isAuthenticated } from '../Auth/index'
import { useEffect } from 'react';
import 'braintree-web'
import DropIn from "braintree-web-drop-in-react";
import { Redirect } from 'react-router-dom'

const Checkout = ({ products, setRun = f => f, run = undefined }) => {

    console.log("checkout", run)

    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
        address: ''
    })
    const [redirection, setRedirect] = useState(false);

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token) => {
        getBraintreeToken(userId, token)
            .then(data => {
                console.log("response", data)
                if (data.error && data.code) {
                    setRedirect(true)
                }
                else if (data.error) {
                    setData({ ...data, error: data.error })
                } else {
                    setData({ clientToken: data.clientToken })
                }
            })
    }
    useEffect(() => {
        getToken(userId, token)
    }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            console.log("Reducer", currentValue)
            console.log("NextValue", nextValue)
            return currentValue + nextValue.count * nextValue.price
        }, 0)
    }
    const handleAddress = event => {
        setData({ ...data, address: event.target.value });
    };


    const redirectUser = () => {
        if (redirection) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('jwt') // Remove token from local storage
                return <Redirect to="/sessionExpired" />
            }
        }
    }

    let deliveryAddress = data.address;

    const buy = () => {
        setData({ loading: true });
        // send the nonce to your server
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                console.log("data", data);
                nonce = data.nonce;
                // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
                // and also total to be charged
                console.log(
                    "send nonce and total to process: ",
                    nonce,
                    getTotal(products)
                );
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(products)
                };
                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log("payment", response);
                        // create order
                        const createOrderData = {
                            products: products,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };

                        console.log("FInal products", createOrderData)
                        createOrder(userId, token, createOrderData)
                        // empty cart
                            .then(response => {
                                emptyCart(() => {
                                    setRun(!run); // run useEffect in parent Cart
                                    console.log('payment success and empty cart');
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                })
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading =>
        loading && <h2 className="text-danger">Loading...</h2>;

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Delivery address:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.address}
                            placeholder="Type your delivery address here..."
                        />
                    </div>

                    <DropIn options={{
                        authorization: data.clientToken,
                        paypal: {
                            flow: 'vault'
                        }
                    }} onInstance={instance => (data.instance = instance)} />
                    <button onClick={buy} className="btn btn-success">Pay</button>
                </div>
            ) : null}
        </div>
    )

    const showCheckout = () => {
        {
            return isAuthenticated() ? (

                    <div>{showDropIn()}</div>
                )
                : <Link to="/signin">
                    <button className="btn btn-primary">Sign In</button>
                </Link>
        }
    }

    return (
        <div>
            <h2>Total ₹ : {getTotal()} </h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
            {redirectUser()}
        </div>
    )
}

export default Checkout
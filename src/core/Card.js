import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage'
import moment from "moment"
import { addItem, updateItem, removeCartItem } from './CartHelper'
import {isAuthenticated} from "../Auth";

const Card = ({
                  product, showViewProductButton = true,
                  showAddToCartButton = true,
                  cartUpdate = false,
                  showRemoveProductButton = false,
                  setRun = f => f,
                  run = undefined
              }) => {

    const [redirect, setRedirect] = useState(false)

    const [count, setCount] = useState(product.count);  // getting from home page

    console.log('Count',count)

    const showViewButton = (showViewProductButton) => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`} className="mr-2">
                    <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                        View Products
                    </button>
                </Link>
            )
        )
    }

    const addToCart = () => {
        addItem(product,product._id, () => {
            setRedirect(true)
        })
    }
    const { user } = isAuthenticated()

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }



    const showCartButton = (quantity, showAddToCartButton) => {

        //Authenticate here to see admin or user, if user let him show this buton

        return quantity > 0 && showAddToCartButton &&  user && user.role ===0  ? (

            <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                Add to cart
            </button>
        ) : (
            <span></span>
        );
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => {
                        removeCartItem(product._id);
                        setRun(!run); // run useEffect in parent Cart
                    }}
                    className="btn btn-outline-danger mt-2 mb-2"
                >
                    Remove Product
                </button>
            )
        );
    };

    const handleChange = productId => event => {

        console.log("updating item count", event.target.value,   product.count)
        setRun(!run);           // run useEffect in parent Cart
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1 && event.target.value<=product.quantity) {
            updateItem(productId, event.target.value);
        }else{
            alert("Please check stock ")
            setCount(0)
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Adjust Quantity</span>
                        </div>
                        <input type="number" className="form-control" value={count}
                               onChange={handleChange(product._id)} />
                    </div>
                </div>
            )
        );
    };
    const showStock = quantity => {
        return quantity >0 ? (
            <span className="badge badge-primary badge-pill">In Stock {product.quantity} </span>
        ) : (
            <span className="badge badge-primary badge-pill">Out of Stock </span>
        );
    };
    return (
        <div className="card">
            <div className="card-header name">{product.name}</div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="products" />
                <p className="lead mt-2">{product.description.substring(0, 100)}
                </p>

                <p className="black-10"> ₹ : {product.price}
                </p>

                <p className="black-9">
                    Category: {product.category && product.category.name}
                </p>

                <p className="black-8">
                    Added on: {moment(product.createdAt).fromNow()}
                </p>
                <p className="black-9">
                    Seller: {product.seller}
                </p>

                {showStock(product.quantity)}
                <br />

                {showViewButton(showViewProductButton)}

                {showCartButton(product.quantity, showAddToCartButton)}

                {showRemoveButton(showRemoveProductButton)}

                {showCartUpdateOptions(cartUpdate)}
            </div>
        </div>
    )
}

export default Card;
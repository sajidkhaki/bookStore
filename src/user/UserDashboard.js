import React, { useState, useEffect } from "react";
import Layout from '../core/Layout'
import { isAuthenticated } from '../Auth/index'
import { Link } from 'react-router-dom';
import { getPurchaseHistory } from "../core/ApiUser";
import moment from "moment";

const Dashboard = () => {

    const { user: { _id, name, email, role } } = isAuthenticated()


    const token = isAuthenticated().token;

    const [history, setHistory] = useState([]);


    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);
    const userLinks = () => {
        return (
            <div className="card">
                <h4 className="card-header"> User Links </h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/cart">My Cart</Link>
                    </li>
                </ul>
            </div>
        )
    }

    const userInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">User Information</h3>
                <ul className="list-group">
                    <li className="list-group-item">Name : {name}</li>
                    <li className="list-group-item">Email : {email}</li>
                    <li className="list-group-item">Role : {role === 1 ? "Admin" : "Customer"}</li>
                </ul>
            </div>
        )
    }

    const purchaseHistory = history => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Purchase history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product Name:  {p.name}</h6>
                                                <h6 style={{color : 'red'}}>
                                                    Shipping Status:  {h.status}
                                                </h6>
                                                <h6>
                                                    Product Price: ₹ {p.price}
                                                </h6>
                                                <h6>
                                                    Purchased Date: {" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };



    return (
        <Layout title="User Dashboard" description={`Welcome : ${name.toUpperCase()}`}
                className="container-fluid">
            <div className="row">
                <div className="col-3">
                    {userLinks()}
                </div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>
    )
}

export default Dashboard
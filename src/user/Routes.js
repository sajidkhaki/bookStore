import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Signup from './Signup'
import Signin from './Signin'
import Home from '../core/Home'
import PrivateRoute from '../Auth/PrivateRoute'
import AdminRoute from '../Auth/AdminRoute'
import Dashboard from '../user/UserDashboard'
import AdminDashboard from '../user/AdminDashboard'
import AddCategory from '../Admin/AddCategory'
import AddProduct from '../Admin/AddProduct'
import Orders from '../Admin/Orders'
import Shop from '../core/Shop'
import Product from '../core/Product'
import Cart from '../core/Cart'
import sessionExpired from '../user/SessionExpired'


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/sessionExpired" exact component={sessionExpired} />

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/orders" exact component={Orders} />

                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
}
export default Routes
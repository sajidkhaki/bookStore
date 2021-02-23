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
// import Profile from '../user/Profile'
// import ManageProducts from '../admin/ManageProducts'
// import ManageCategories from '../admin/ManageCategory'
// import UpdateProduct from '../admin/UpdateProduct';
// import UpdateCategory from '../admin/UpdateCategory';
import sessionExpired from '../user/SessionExpired'



const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <Route path="/cart" exact component={Cart} />

                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/create/product" exact component={AddProduct} />
                <AdminRoute path="/admin/orders" exact component={Orders} />

                <Route path="/product/:productId" exact component={Product} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/sessionExpired" exact component={sessionExpired} />

                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />

                {/**/}
                {/*<Route path="/signin" exact component={Signin} />*/}
                {/*<Route path="/signup" exact component={Signup} />*/}
                {/*<Route path="/sessionExpired" exact component={sessionExpired} />*/}

                {/*<PrivateRoute path="/user/dashboard" exact component={Dashboard} />*/}
                {/*<PrivateRoute path="/profile/:userId" exact component={Profile} />*/}

                {/*<AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />*/}
                {/*<AdminRoute path="/create/category" exact component={AddCategory} />*/}
                {/*<AdminRoute path="/create/product" exact component={AddProduct} />*/}
                {/*<AdminRoute path="/admin/orders" exact component={Orders} />*/}
                {/*<AdminRoute path="/admin/products" exact component={ManageProducts} />*/}
                {/*<AdminRoute path="/admin/categories" exact component={ManageCategories} />*/}
                {/*<AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct} />*/}
                {/*<AdminRoute path="/admin/category/update/:categoryId" exact component={UpdateCategory} />*/}

                {/*<Route path="/product/:productId" exact component={Product} />*/}
            </Switch>
        </BrowserRouter>
    )
}
export default Routes
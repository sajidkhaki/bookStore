import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout'
import { isAuthenticated } from '../Auth/index'
import { createProduct, getCategories } from '../Admin/ApiAdmin'
import { Redirect } from 'react-router-dom'
import toaster from 'toasted-notes'
// import 'toasted-notes/src/styles.css'; // optional styles


const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        seller:'',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const { user, token } = isAuthenticated()
    const {
        name,
        description,
        price,
        categories,
        quantity,
        loading,
        error,
        redirectToProfile,
        seller,
        createdProduct,
        formData
    } = values;

    // load categories and set from data

    const init = () => {
        getCategories().then(data => {
            console.log("category data", data)
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        console.log("use effect called")
        init()
    }, [])


    //useEffect(init(), [])
    const handleChange = (name) => event => {
        setValues({ ...values, error: "" });
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };


    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
        createProduct(user._id, token, formData).then(data => {
            console.log("Response from create product", data)
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                toaster.notify(`${data.name} is created successfully`, {
                    duration: 2000
                })
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    category: '',
                    shipping: '',
                    error: '',
                    seller:'',
                    redirectToProfile: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} type="text" className="form-control" value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input onChange={handleChange('price')} type="number" className="form-control" value={price} />
            </div>

            <div className="form-group">
                <label className="text-muted">Category</label>
                <select onChange={handleChange('category')} className="form-control">
                    <option>Please select</option>
                    {categories &&
                    categories.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Seller</label>
                <input onChange={handleChange('seller')} type="text" className="form-control" value={seller} />
            </div>

            <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select onChange={handleChange('shipping')} className="form-control">
                    <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );



    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => {
        if (!error) {
            toaster.notify(`${createdProduct}is created successfully`, {
                duration: 2000
            })
        }
    };


    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Add new product" description={`Welcome :  ${user.name.toUpperCase()}`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddProduct
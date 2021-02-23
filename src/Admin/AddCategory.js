import React, { useState } from 'react';
import Layout from '../core/Layout'
import { isAuthenticated } from '../Auth/index'
import { Link } from 'react-router-dom';
import { addAdminCategory } from '../Admin/ApiAdmin'
import { Toast } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'

const AddCategory = () => {

    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [toaster, setToaster] = useState(false)
    const [showtoaster, setShowtoaster] = useState(true);
    const [redirection, setRedirect] = useState(false);

    // destruct user and token from local storage

    const { user, token } = isAuthenticated()


    const handleChange = e => {
        setError('')
        setSuccess('')
        setToaster('')
        setName(e.target.value)
    }

    const clickSubmit = event => {
        event.preventDefault()
        setShowtoaster(true)
        if (name.length > 2) {
            setError('')
            setSuccess(false)
            // make request to API
            addAdminCategory(user._id, token, { name })
                .then(data => {
                    if (data.error && data.code) {
                        setRedirect(true)
                    }
                    else if (data.error) {
                        setToaster(data.error)
                        setRedirect(false)
                    } else {
                        setError('')
                        setSuccess(true)
                        setRedirect(false)
                    }
                }).catch((error) => {
                console.log("error", error)
                setRedirect(false)
            })
        } else {
            setToaster(true)
            setToaster('Length should be greater than 2')
        }
    }

    const showSuccess = () => {
        if (success) {
            return (
                <Toast show={showtoaster} onClose={toggleShowToaster} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>{name} is created successfully</Toast.Body>
                </Toast>
            )
        }
    }
    const toggleShowToaster = () => {
        setShowtoaster(!showtoaster);
        setError('')
        setSuccess('')
        setName('')
    }

    const showToaster = () => {
        if (toaster) {
            return (
                <Toast show={showtoaster} onClose={toggleShowToaster} delay={3000} autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                        <strong className="mr-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body>{toaster}</Toast.Body>
                </Toast>
            )
        }
    }
    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">Dashboard</Link>
        </div>
    )

    const redirectUser = () => {
        if (redirection) {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('jwt')        // Remove token from local storage
                alert("Session Timeoout!!!! Invalid Authorization")
                return <Redirect to="/" />
            }
        }
    }


    const newCategoryForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Category Name</label>
                <input onChange={handleChange} type="name" className="form-control"
                       value={name} autoFocus required />
            </div>
            <button className="btn btn-outline-primary" onClick={clickSubmit} >
                Create Category
            </button>
        </form>
    )

    return (
        <Layout title="Add new category" description={`Welcome : ${user.name}`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showToaster()}
                    {goBack()}
                    {redirectUser()}
                    {showSuccess()}
                    {newCategoryForm()}
                </div>
            </div>
        </Layout>
    )
}

export default AddCategory
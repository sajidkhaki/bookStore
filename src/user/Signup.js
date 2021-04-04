import React, { useState } from 'react';
import Layout from '../core/Layout'
import { SignupData } from '../Auth/index'
import { Link } from 'react-router-dom'
const Signup = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        // role: "", // for admin or for customer
        success: false
    })

    // const { name, email, password, error, role, success } = values
    const { name, email, password, error, success } = values

    const handleChange = name => event => {

        console.log("signup values", event.target.value)
        setValues({
            ...values, error: false, [name]: event.target.value
        })
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: false })
        console.log({ name: name, email: email, password: password })
        SignupData({ name: name, email: email, password: password })
            //SignupData({ name: name, email: email, password: password, role: role })
            .then(data => {
                console.log("Response from server end", data)
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else if (data.err) {
                    setValues({ ...values, error: data.err, success: false })
                }
                else {
                    setValues({ ...values, name: "", email: "", password: "", error: "", success: true })
                }
            })
    }

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange("name")} type="text" className="form-control"
                    value={name} />
            </div>

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange("email")} type="email" className="form-control"
                    value={email} />
            </div>

            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange("password")} type="password" className="form-control"
                    value={password} />
            </div>
            {/* 
            <div className="form-group">
                <label className="text-muted">Role</label>
                <select onChange={handleChange('role')} className="form-control">
                    <option>Please select</option>
                    <option value='1'>Admin</option>
                    <option value='0'>User</option>
                    ))}
                </select>
            </div> */}

            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? "" : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? "" : 'none' }}>
            New Account is Created.Please <Link to="/signin">  Sign in </Link>
        </div>
    )
    return (
        <Layout title="Sign up" description="Welcome Guest! Please Register"
            className="container col-md-8 offset-md-2" >

            { showSuccess()}

            { showError()}

            { signUpForm()}
        </Layout >
    )
}


export default Signup;
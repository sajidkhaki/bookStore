import React from 'react';
import Layout from '../core/Layout'

const sessionExpired = () => {
    return (
        <Layout
            title="Session Expired"
            description="Session Timeout"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h3> Session Expired! Please Login</h3>
                </div>
            </div>
        </Layout>
    )
}

export default sessionExpired
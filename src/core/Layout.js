import React from 'react';
import Menu from '../core/Menu'
import Footer from '../core/Footer'
import "../style.css"

const Layout = ({ title = "Title", description = "Description", className, children }) => (
    <div>
        <Menu />
        <div className="jumbotron">
            <h2>{title}</h2>
            <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>

        <Footer/>
    </div>


)

export default Layout;
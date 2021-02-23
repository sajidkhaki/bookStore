import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../Auth/index'
 // import { itemTotal } from './cartHelpers'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    } else {
        return { color: '#ffffff' }
    }
}

const Menu = ({ history }) => (
    <div>
        <ul className='nav nav-tabs bg-primary'>
            <li className='nav-items'>
                <Link className='nav-link' style={isActive(history, '/')} to='/'> Home </Link>
            </li>

            {/*Shop view Only to customer*/}

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className='nav-items'>
                <Link className='nav-link' style={isActive(history, '/shop')} to='/shop'> Shop </Link>
            </li>
            )}


            {/*{isAuthenticated() && isAuthenticated().user.role === 0 && (*/}
            {/*    <li className='nav-items'>*/}

            {/*        <Link className='nav-link' style={isActive(history, '/cart')} to='/cart'>*/}
            {/*            Cart {""}*/}
            {/*            <sup>*/}
            {/*                <small className="cart-badge">{itemTotal()}</small>*/}
            {/*            </sup>*/}
            {/*        </Link>*/}
            {/*    </li>*/}
            {/*)}*/}


            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className='nav-items'>
                    <Link className='nav-link' style={isActive(history, '/user/dashboard')} to='/user/dashboard'> Dashboard </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className='nav-items'>
                    <Link className='nav-link' style={isActive(history, '/admin/dashboard')} to='/admin/dashboard'> Dashboard </Link>
                </li>
            )}

            {!isAuthenticated() && (
                <Fragment>
                    <li className='nav-items'>
                        <Link className='nav-link' style={isActive(history, '/Signin')} to='/Signin'> Sign In </Link>
                    </li >
                    <li className='nav-items'>
                        <Link className='nav-link' style={isActive(history, '/Signup')} to='/Signup'> Sign Up </Link>
                    </li >
                </Fragment>
            )}

            {isAuthenticated() && (
                <li className='nav-items'>
                    <span className='nav-link' style={{ cursor: 'pointer', color: '#ffffff' }}
                          onClick={() => signout(() => {
                              history.push("/")
                          })}> Sign Out </span>
                </li>
            )}
        </ul >
    </div >
)

export default withRouter(Menu)

import React, { useState, useEffect } from 'react'
import "./Navbar.css"
import { Link, useNavigate, useLocation } from "react-router-dom"
import * as actionType from '../../constants/actionTypes';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
function Navbar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useNavigate();


    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        setUser(null);
        history('/');
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <nav className="navo ">
            <div className="full">

                <div className="wogo">
                    <div className="w">
                        <a component={Link} to="/" class="navLogo" >
                            <Link to="/"> <span className='logoo'>
                                ReviewMyDorm
                                </span></Link>
                        </a>
                    </div>

                    <div className="sign">
                        {user ? (
                            <>
                                {/* <a className="link" href='/'>
                                    <span className="sign" style={{ color: '#fdf2d1 ' }}> Dashboard</span>
                                </a> */}

                                {user.result.email ==="wafic@hotmail.com" && user.result.verified===true ? (
                                    <>
                                        <a className="link" component={Link} to="/admin" >
                                            <Link to="/Admin/Dorms">    <span className="sign bbl" style={{ color: '#fdf2d1 ' }}> Admin</span></Link> 
                                        </a>
                                    </>
                                ):(
                                    <></>
                                )}
                                <a className="link" href='/' onClick={logout}>
                                    <span className="sign" style={{ color: '#fdf2d1 ' }}> Logout</span>
                                </a>
                            </>

                        ) : (
                            <a className="link" component={Link} to="/auth">
                                <Link to="/auth"> <span className="sign" style={{ color: '#fdf2d1 ' }}> Sign in</span></Link>
                            </a>
                        )}

                    </div>
                </div>
            </div>




        </nav>
    )
}

export default Navbar

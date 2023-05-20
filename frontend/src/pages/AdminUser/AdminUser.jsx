import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom"
import * as actionType from '../../constants/actionTypes';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { getAllReviews } from '../../actions/reviews';
import decode from 'jwt-decode';
import { allusers } from '../../actions/users';
import Navbar from '../../components/navbar/Navbar'
import '../Admin/Admin.css'
export default function AdminRev() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useNavigate();
    const users = useSelector((state) => state.users)
    console.log(users)

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        setUser(null);
        history.push('/auth');
    };

    useEffect(() => {
        if (!user || user.result.email !== "wafic@hotmail.com") {
            history('/auth')
        }

        dispatch(allusers());
    }, [location]);
    let ii = 0;
    const handlebutt = () => {
        history(`/Admin/Dorms`)
    }
    const handlebuttt = () => {
        history(`/Admin/Reviews`)
    }
    const handlebutttt = () => {
        history(`/Admin/Users`)
    }
    const [currentPage, setCurrentPage] = useState(1);
    const ROWS_PER_PAGE = 10;
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;
    // Render only the rows for the current page
    const dormsTodoDisplay = users.slice(startIndex, endIndex);

    

    // Function to handle "Next" button click
    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    // Function to handle "Previous" button click
    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);
    };


    return (
        <div>

            <Navbar />

            {user.result.email === "wafic@hotmail.com" && user.result.verified === true ? (
                <>
                    
                    <div className='Appp'>
                        <div className='navnav'>
                            <div className='titt'>Admin Dashboard</div>
                            <div className="butt1">
                                <button className='butty' onClick={() =>
                                    handlebutt()}>Dorms</button>
                            </div>
                            <div className="butt1">
                                <button className='butty' onClick={() =>
                                    handlebuttt()}>Reviews</button>
                            </div>
                            <div className="butt1">
                                <button className='butty' onClick={() =>
                                    handlebutttt()}>Users</button>
                            </div>
                            {/* <p>Get Users (delete users)</p>
                        <p>Get Dorms (display dorms that are not yet approved) you can delete or update/approve a dorm</p>
                        <p>Get all schools get all dorms then filter to get the unapproved</p>
                        <p>Get Reviews (get all not approved reviews) delete or approve/update </p>
                         */}


                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dormsTodoDisplay.map((value,index) => {
                                        {/* ii = ii + 1; */}
                                        const ii = startIndex + index + 1;

                                        return (
                                            <tr key={ii}>
                                                <td>{ii}</td>
                                                <td>{value._id}</td>
                                                <td>{value.name}</td>
                                                <td>{value.email}</td>

                                                {/* <td>{value.User}</td>
                                                <td>{value.Dorm}</td>
                                                <td className='smallcol'>{value.Review}rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</td>
                                                <td><button className="approve-button">Approve</button><button className="delete-button">Delete</button></td> */}
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                            <div className='buttcen'>
                                <span className="buttri">
                                    {currentPage > 1 && (
                                        <button onClick={handlePrevious} className='butbut'>Previous</button>
                                    )}</span>
                                {/* Render "Next" button if there are more rows */}
                                {endIndex < users.length && (
                                    <button onClick={handleNext} className='butbut'>Next</button>
                                )}
                            </div>
                        </div>



                    </div>
                </>
            ) : (<>
                <center><h1>This Page does not exist</h1></center>
            </>)}



        </div>
    )
}

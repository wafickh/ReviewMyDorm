import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom"
import * as actionType from '../../constants/actionTypes';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { getAllReviews } from '../../actions/reviews';
import decode from 'jwt-decode';
import Navbar from '../../components/navbar/Navbar'
import '../Admin/Admin.css'
import './AdminRev.css'
import { updatereview } from '../../actions/approvereview';
import { deleteReview } from '../../actions/deletereview';
export default function AdminRev() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useNavigate();
    const reviews = useSelector((state) => state.reviews)
    console.log(reviews)


    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        setUser(null);
        history.push('/auth');
    };

    useEffect(() => {
        if (!user || user.result.email !== "wafic@hotmail.com") {
            history('/auth')
        }

        dispatch(getAllReviews());
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
    const ROWS_PER_PAGE = 6;
    const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
    const endIndex = startIndex + ROWS_PER_PAGE;

    // Render only the rows for the current page
    const dormsTodoDisplay = reviews.slice(startIndex, endIndex);

    // Function to handle "Next" button click
    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    // Function to handle "Previous" button click
    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);
    };

    const updatebutt = async (id,dormid) => {
        try {
            await dispatch(updatereview(id,dormid))
          
           window.location.reload();

        } catch (error) {
            console.error('Error updating dorm:', error);
        }
    }
    
    const deletebutt = async (schoolid, dormid, userid) => {
        console.log(schoolid)
        console.log(dormid)
        console.log(userid)
        try {
            await dispatch(deleteReview(schoolid, dormid, userid))
            window.location.reload();

        } catch (error) {
            console.error('Error deleting Review:', error);

        }
    }


    return (
        <div>

            <Navbar />

            {user.result.email === "wafic@hotmail.com" && user.result.verified === true ? (
                <>
                    {/* <div className='Appp'>
                            <SideMenu />
                            <PageContent />
                    </div> */}
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
                                        <th>User</th>
                                        <th>Dorm</th>
                                        <th>Rating</th>
                                        <th className='smallcoll'>Review</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dormsTodoDisplay.map((value, index) => {
                                        {/* ii = ii + 1; */ }
                                        const ii = startIndex + index + 1;

                                        return (
                                            <tr key={ii}>
                                                <td>{ii}</td>
                                                <td>{value.User}</td>
                                                <td>{value.Dorm}</td>
                                                <td>{value.Rating}</td>
                                                <td className='smallcol'>{value.Review}</td>
                                                <td><button className="approve-button" onClick={() =>
                                                    updatebutt(value._id, value.Dorm)}>Approve</button><button className="delete-button" onClick={() =>
                                                        deletebutt(value.Dorm, value._id, value._id)}>Delete</button></td>
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
                                {endIndex < reviews.length && (
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

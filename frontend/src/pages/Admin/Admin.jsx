import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom"
import * as actionType from '../../constants/actionTypes';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { getAllDorms } from '../../actions/dormss';
import Navbar from '../../components/navbar/Navbar'
import './Admin.css'
import { UpdateDorm } from '../../actions/approvedorm';
import { DeleteDorm } from '../../actions/deletedorm';
export default function Admin() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useNavigate();
    const dormss = useSelector((state) => state.dormss)
    console.log(dormss)

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        setUser(null);
        history.push('/auth');
    };

    useEffect(() => {
        if (!user || user.result.email !== "wafic@hotmail.com") {
            history('/auth')
        }
        dispatch(getAllDorms());




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
    const dormsTodoDisplay = dormss.slice(startIndex, endIndex);

    // Function to handle "Next" button click
    const handleNext = () => {
        setCurrentPage(currentPage + 1);
    };

    // Function to handle "Previous" button click
    const handlePrevious = () => {
        setCurrentPage(currentPage - 1);
    };
    const updatebutt = async (id) => {
        try {
            await dispatch(UpdateDorm(id))
            console.log(id)
            window.location.reload();
            
        } catch (error) {
            console.error('Error updating dorm:', error);
        }
    }
    const deletebutt=async (schoolid,dormid,userid)=>{
        console.log(schoolid)
        console.log(dormid)
        console.log(userid)
        try {
            await dispatch(DeleteDorm(schoolid,dormid,userid)) 
            window.location.reload();

        } catch (error) {
            
        }
    }


    return (
        <div>

            <Navbar />

            {user.result.email === "wafic@hotmail.com" && user.result.verified===true ? (
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
                           


                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Deposit</th>
                                        <th>Dorm Type</th>
                                        <th>image</th>
                                        <th>author</th>
                                        <th>School</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dormsTodoDisplay.map((value, index) => {
                                        //  ii = ii + 1;
                                        const ii = startIndex + index + 1;
                                        return (
                                            <tr key={ii}>
                                                <td>{ii}</td>
                                                <td className='wosipa'>{value.Name}</td>
                                                <td>{value.contractInformation.Price}</td>
                                                <td>{value.contractInformation.Deposit}</td>
                                                <td>{value.contractInformation.DormType[0]}</td>
                                                <td><a target="_blank" href={value.images}>image url</a> </td>
                                                <td>{value.Author}</td>
                                                <td>{value.Schools}</td>
                                                <td><button className="approve-button" onClick={() =>
                                                    updatebutt(value._id)}>Approve</button><button className="delete-button" onClick={() =>
                                                        deletebutt(value.Schools[0],value._id,value.Author)}>Delete</button></td>
                                            </tr>
                                        )
                                    })}

                                </tbody>
                            </table>
                            {/* Render "Previous" button if not on the first page */}
                            <div className='buttcen'>
                                <span className="buttri">
                                    {currentPage > 1 && (
                                        <button onClick={handlePrevious} className='butbut'>Previous</button>
                                    )}</span>
                                {/* Render "Next" button if there are more rows */}
                                {endIndex < dormss.length && (
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

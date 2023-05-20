import React, { useState, useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getDormById } from '../../actions/dorms';
import { useForm } from "react-hook-form";

import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

import { Rating } from '@material-ui/lab/';
import "./AddReview.css"
import { BsFillStarFill } from "react-icons/bs";
import { createReview } from '../../actions/review';

import Footer from '../../components/footer/Footer';


const schema = yup.object().shape({
  messagee: yup.string().required("This field is required").min(100).max(500),
})



function AddReview() {
  const navigate = useNavigate();
  const location = useLocation();

  let { id } = useParams();
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);

  const dorm = useSelector((state) => state.dorms)

  if (dorm == null) {
    navigate(`/`)
  }
  

  if (id.length > 24 || id.length < 24) {
    navigate(`/error`)
  }

  if (id != dorm?._id) {
    navigate(`/error`)
  }

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleButtback = () => {
    navigate(`/reviews/${dorm._id}/${dorm.Coordinates.long}/${dorm.Coordinates.lag}`)
  }

  const SubmitForm = (data) => {
    const Rating = (value + value1 + value2 + value3) / 4

    // console.log(data.messagee)
    const userid = user.result._id
    const dormid = dorm._id


    const obj = {
      Rating: Rating,
      Review: data.messagee,
      Dorm: dormid,
      User: userid
    }

    dispatch(createReview(obj))

    navigate(`/reviews/${dorm._id}/${dorm.Coordinates.long}/${dorm.Coordinates.lag}`)

  }

  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate.push('/auth');
    setUser(null);
  };

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }

    dispatch(getDormById(id));
  }, [dispatch, location]);
  const handleit = () => {
    navigate(`/`)
  }



  return (
    <div>
      <Navbar />
      {dorm?.length != 0 ? (<>
        <center className='reviewcen'>
          <h2>Review {dorm.Name}</h2>

        </center>
        <div className="bodd">
          <div className=' card7 card3'>
            <form action="" onSubmit={handleSubmit(SubmitForm)} encType="multipart/form-data">
              <div className="RateRoom">
                <h3>Rate the <span className='titi'>room</span></h3>
                <p>Consider room size, cleanliness, and natural light access when evaluating.</p>
                <Rating name="simple-controlled"
                  size="large"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}

                />
                {/* <input type="hidden" name="value" value={value} /> */}

              </div>
              <div className="RateRoom">
                <h3>Rate the <span className='titi'>building</span></h3>
                <p>One may consider the facilities, hygienic standards, and age of the edifice.</p>
                <Rating
                  name="simple-controlled1"
                  size="large"
                  value={value1}
                  onChange={(event, newValue) => {
                    setValue1(newValue);
                  }}
                />

              </div>
              <div className="RateRoom">
                <h3>Rate the <span className='titi'>bathroom</span> </h3>
                <p>To assess the bathroom, consider its cleanliness, modernity, and features.</p>
                <Rating name="simple-controlled3"
                  size="large"
                  value={value2}
                  onChange={(event, newValue) => {
                    setValue2(newValue);
                  }}
                />

              </div>
              <div className="RateRoom">
                <h3>Rate the <span className='titi'>location</span> </h3>
                <p>When evaluating the site, one should take into account
                  its level of accessibility and security.</p>
                <Rating name="simple-controlled4"
                  size="large"
                  value={value3}
                  onChange={(event, newValue) => {
                    setValue3(newValue);
                  }}
                />
              </div>
              {value && value1 && value2 && value3 ? (<>
                <center>
                  <div className='finrate'><div className='ratefinfin'>Your Rating: </div>  <div className='ratefin'>  {(value + value1 + value2 + value3) / 4}/5 </div> <div className='svgstar'><BsFillStarFill /></div> </div>

                </center>
              </>) : (<>
                <div className='mome'>

                </div>
              </>)}
              {/* <span className='error'>{NoValue1}</span> */}

              <div className='revieww'>
                <h3>Write a <span className='titi'>comment</span></h3>

                <textarea type="text" id="messagee" name="messagee" rows="7" cols="60" style={{ padding: 10, fontSize: 15 }} placeholder="Please write a helpful comment with at least 100 characters for assistance." ref={register} >

                </textarea>
              </div>
              <span className='err'>{errors.messagee?.message ? "Minimum 100 characters required for your review." : ""}</span>
              <div className="dsi">

                *All Reviews are screened by moderaters for approval before being displayed*
              </div>
              <div className="dsi">
                *For any updates or changes to your review, kindly reach out to the administrator at <u><a href="mailto:wafic.khalife@lau.edu">wafic.khalife@lau.edu</a></u>  for assistance.*
              </div>
              <center className='margintopi'>
                <button className='backrev' onClick={handleButtback}>Back</button>
                <button type='submit' className='submitreview' >Submit</button>
              </center>
            </form>
          </div>

        </div>
      </>) : (<>

        <center className='centerdorm'><h2>Dorm does not exist</h2></center>
        <center><button className='backhome bbc' onClick={() => handleit()}>Go back Home</button></center>

      </>)}




      <Footer />





    </div>
  )
}

export default AddReview

import React, { useEffect, useRef, useState } from 'react'


import Navbar from '../../components/navbar/Navbar'
import './Dorms.css';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from "react-router-dom";
import { getDormById } from '../../actions/dorms';
import mapboxgl from "mapbox-gl";
import { BsHouseFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import '../School/stars.css'
import Footer from '../../components/footer/Footer';
import { number } from 'yup';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Rating } from '@material-ui/lab/';
import { MdVerified } from "react-icons/md";
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';
import { DeleteDorm } from '../../actions/deletedorm';
import { deleteReview } from '../../actions/deletereview';

mapboxgl.accessToken = "pk.eyJ1Ijoid2FmaWNraCIsImEiOiJjbGNuZ2ttcnoxMm83M25zOTM0cGpkanlmIn0.8U0pDk8RKlhvQrxzgWsbxQ"

function Dorms() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  let { id, longg, latt } = useParams();
  const dorm = useSelector((state) => state.dorms)
  if (dorm == null) {
    navigate(`/error`)
  }
  if (id != dorm?._id || longg != dorm?.Coordinates?.long || latt != dorm?.Coordinates?.lag) {
    navigate('/error')
  }

  let long = dorm?.Coordinates?.long
  console.log(dorm)
  const mapContainerRef = useRef(null);
  let nso = dorm?.Schools?.[0].Name.replaceAll(' ', '_');
  const profile = JSON.parse(window.localStorage.getItem('profile'))
  useEffect(() => {


    if (id.length > 24 || id.length < 24) {
      navigate(`/error`)
    }



    dispatch(getDormById(id));

    if (longg < 36 && latt < 36 && longg > 31 && latt > 31) {

      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11?optimize=true",
        center: [longg, latt],
        zoom: 15.9,
        maxZoom: 19,
        pitch: 60
      })
      if (mapContainerRef.current.style.visibility === true) map.resize();
      const marker = new mapboxgl.Marker({ color: "#562F4A" });
      marker.setLngLat({ lat: latt, lng: longg }).addTo(map)
    }
    else {
      navigate(`/error`)
    }
  }, [dispatch]);
  const handlebuttt = () => {
    navigate(`/AddReview/${dorm._id}`)
  }

  const handleit = () => {
    navigate(`/`)
  }
  let app = [];
  for (let i = dorm?.Reviews?.length - 1; i >= 0; i--) {
    console.log(i);
    if (dorm.Reviews[i].approved === true) {
      app.push(dorm.Reviews[i]);
    }
  }

  let ii = 0;

  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 7;
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  // Render only the rows for the current page
  const dormsTodoDisplay = app.slice(startIndex, endIndex);

  // Function to handle "Next" button click
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  // Function to handle "Previous" button click
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };
  const dormDate = new Date(dorm?.createdAt?.slice(0, 10));
  const formattedDate = dormDate.toLocaleDateString('en-US');
  const deletebutt = async (schoolid, dormid, userid) => {

    try {
      await dispatch(DeleteDorm(schoolid, dormid, userid))
      navigate(`/`)
      window.location.reload();


    } catch (error) {

    }
  }
  const deletebuttt = async (dormid, userid, reviewid) => {
    
    try {
      await dispatch(deleteReview(dormid, userid, reviewid))
      window.location.reload();

    } catch (error) {
      console.error('Error deleting Review:', error);

    }
  }



  return (

    <div>
      <Navbar />

      {dorm?.length != 0 ? (<>
        <div className='flexxy'>
          <div className='headersi'><h1><BsHouseFill style={{ width: "30px", color: "#562F4A" }} /><span className='boldu'>  {dorm?.Name}</span> reviews</h1></div>
          <div className='hhe'><button className='buttrev'
            onClick={() =>
              handlebuttt()}
          >Write a review <BiEditAlt /></button></div>
        </div>

        <div className='headersi'><a href={`/dorms/${nso}`} > <AiOutlineArrowLeft /> All {dorm?.Schools?.[0].Name} Dorms</a></div>

      </>) : (<>

        {/* 
        <center className='bb'><h1>Dorm Does not exist</h1></center>
        <center><button className='backhome' onClick={() => handleit()}>Go back Home</button></center> */}


      </>)}
      <div className="Flexing">
        <div className="sectionA">
          {dorm?.length != 0 ? (<>
            <img src={dorm?.images} alt="" />
          </>) : (<>
            <img src={dorm?.images} alt="" />
          </>)}

          <div className="sa2">
            {dorm?.length != 0 ? (<>
              <div className="rate">
                <h3>Overall Rating</h3>
                <p class="starability-result" data-rating={Math.round(dorm.Rating)}>
                </p> </div>
              <div className="Prices">
                <p>{
                  formattedDate}</p>
              </div>
              <div className="Prices">
                <h3>Price</h3>
                <p>{dorm?.contractInformation?.Price}$ per month</p>
              </div>

              <div className="Prices">
                <h3>Contact Information</h3>
                <p>{dorm?.ContactUs}</p>
              </div>
              {dorm?.contractInformation?.Deposit ? (
                <>
                  <div className="depos">
                    <h3>Deposit</h3>
                    <p>{dorm?.contractInformation?.Deposit}$</p>
                  </div>
                </>
              ) : <>

              </>}
              {dorm?.contractInformation?.ContractLength ? (
                <>
                  <div className="depos">
                    <h3>Contract length</h3>
                    <p>{dorm?.contractInformation?.ContractLength} month/s</p>
                  </div>

                </>
              ) : <>


              </>}

              <div className="Type">
                <h3>Dorm Type</h3>

                {dorm?.contractInformation?.DormType?.map((value, key) => {
                  return (
                    <span className=' wab rounded-4' key={value.id}>{value}</span>
                  )
                })}
              </div>
              <div className="Amenitiess">
                {dorm.contractInformation.Amenities.length > 0 ? (<>
                  <h3>Amenities</h3>

                </>) : (<>


                </>)}
                <div className='filterss'>
                  {dorm?.contractInformation?.Amenities?.map((value, key) => {
                    return (
                      <span className=' wab rounded-4' key={value.id}>{value}</span>
                    )
                  })}

                </div>
              </div>
            </>
            ) : (<>



            </>)}
            {dorm.contractInformation?.AdditionalInfo ? (<>

              <div className="Addinf">
                <h3>Additional information</h3>
                <p>{dorm.contractInformation?.AdditionalInfo}</p>
              </div>
            </>) : (<>


            </>)}

            {dorm?.length != 0 ? (<>

              <h3 className='loll'>Location<MdLocationOn style={{ color: "aliceblue" }} /></h3>

            </>) : (<>


            </>)}
            <div className="Map" ref={mapContainerRef} > </div>
            <div className="thingysqqqqqqq">
              {dorm?.Author?.email == profile?.result?.email || profile?.result?.verified == true ? (
                <center><button className="delete-button amin" onClick={() =>
                  deletebutt(dorm?.Schools[0]._id, dorm?._id, dorm?.Author?._id)}>Delete</button></center>) : (<></>)
              }

            </div>



          </div>
        </div>
        <div className="sectionB">
          {dormsTodoDisplay.map((value, index) => {
            let x = value.User?.email?.slice(-3)
            const ii = startIndex + index + 1;
            const ReviewDate = new Date(value?.createdAt?.slice(0, 10));
            const formattedDatee = ReviewDate.toLocaleDateString('en-US');



            return (
              <div className="card sosi" key={ii}>
                <div className="flexoz">
                  <div className="nb">{value.Rating} </div>
                  <Rating name="read-only" value={Math.round(value.Rating)} readOnly
                    precision={0.5}
                  />
                  {x == "edu" ? (
                    <><div className="verified">Verified Student <MdVerified /> </div></>
                  ) : (
                    <>

                    </>
                  )}
                </div>


                <div className="nbb">{formattedDatee} </div>

                <div className="tex">
                  {value.Review}
                </div>
                {value?.User?.email === profile?.result?.email || profile?.result?.verified == true ? (<>
                  <div className="nb">
                    <button className="delete-button amino" onClick={() =>
                      deletebuttt( dorm?._id, value.User._id,value._id)}>Delete</button>
                  </div>
                </>) : (<>

                </>)}


              </div>
            )
          })}
          {dorm?.Reviews?.length === 0 ? (
            <center><h4>No reviews have been added to this dorm</h4> </center>
          ) : (
            <>


            </>
          )}
          <div className='buttcen'>
            <span className="buttri">
              {currentPage > 1 && (
                <center> <button onClick={handlePrevious} className='butbut bibi'>⇦ Previous</button></center>
              )}</span>
            {/* Render "Next" button if there are more rows */}
            {endIndex < app.length && (
              <center><button onClick={handleNext} className='butbut bibi'>Next ⇨</button></center>
            )}
          </div>
        </div>




      </div>


      <Footer />
    </div>


  )
}
export default Dorms

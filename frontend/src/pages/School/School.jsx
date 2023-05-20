import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import './School.css';
import { useSelector, useDispatch } from 'react-redux'

import './stars.css';
import Footer from "../../components/footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { getSchoolByName } from '../../actions/school'

import { MdLocationOn } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md"
function School() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  let { id } = useParams();
  console.log(id)
  let nso = id.replaceAll('_', ' ')
  console.log(nso)
  const school = useSelector((state) => state.school)
  let longg;
  console.log(school)
  const externalImage =
    'https://res.cloudinary.com/do0puhubq/image/upload/v1674985967/Schools/AUBhome_gvbnvj.jpg';
  const handlebutt = (long, lat) => {
    navigate(`/AddDorm/${id}/${long}/${lat}`)
  }

  useEffect(() => {
    dispatch(getSchoolByName(id));
  }, [dispatch]);

  
  const handleit = () => {
    navigate(`/`)
  }
  let ao = [];
  for (let i = school?.Dorms?.length - 1; i >= 0; i--) {
    console.log(i);
    if (school.Dorms[i].approved === true) {
      ao.push(school.Dorms[i]);
    }
  }
  console.log(ao)
  console.log("akxnasjansdkasdnadknadakjndajsdnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")
  let ii = 0;

  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 10;
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;

  // Render only the rows for the current page
  const dormsTodoDisplay = ao.slice(startIndex, endIndex);

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
      {school ? (
        <>
          <p>
            <center>
              <h2><span className='tit'>{nso}</span>  Dorms</h2>
              <p className="loco"><MdLocationOn style={{ color: "#562F4A" }} /> {school.City}</p>
              <img className='imageflu' src={school.Image} />
              <button className='buttadd' onClick={() =>
                handlebutt(school.Coordinates.long, school.Coordinates.lag)}>Add a Dorm <MdLibraryAdd /></button>
            </center>
          </p>
          {ao.length > 0 ? (
            <>
              <div className="browse">
                <h2>Browse reviews from {
                  ao.length} dorm/s</h2>
                {/* <label for="sort" id='lwek'>Sort by:</label>
            <select name="Sort" id="sort">
              <option value="Name">Name</option>
              <option value="Price">Price</option>
              <option value="Rating">Rating</option>
            </select> */}
              </div>
            </>
          ) : (<>
            <div className="browse">
              <center>   <h2> No Dorms have been added for this School</h2></center>
            </div>
          </>)}

          <div className="flexc">
            {dormsTodoDisplay.map((value, key) => {
              return (
                <div className='fil'>
                  <a href={`/reviews/${value._id}/${value?.Coordinates?.long}/${value.Coordinates?.lag}`}>
                    <div className='imgo'>
                      <img src={value.images} alt="SOSO" />
                    </div>
                    <div className='thingyss'>
                      <h2>{value.Name}</h2>
                      <p class="starability-result" data-rating={Math.round(value.Rating)}>
                      </p>
                      <div className='flo'>
                        <p className='prr'> {value.contractInformation.Price}$ per month</p>
                        <p className='rev'>{value.contractInformation.DormType[0]} </p>
                      </div>
                    </div>
                  </a>

                </div>
              )
            })}


          </div>
          <center className='sadkj'><div className='buttcen'>
            <span className="buttri">
              {currentPage > 1 && (
                <button onClick={handlePrevious} style={{ fontSize: 'larger' }} className='butbut minmin'>Previous</button>
              )}</span>

            {endIndex < ao.length && (
              <button onClick={handleNext} style={{ fontSize: 'larger' }} className='butbut minmin'>Next</button>
            )}
          </div> </center>



          <Footer />
        </>
      ) : (
        <div className='didib'><center> <h1>School does not exist</h1></center>
          <center><button className='backhome' onClick={() => handleit()}>Go back Home</button></center>

        </div>
      )}
    </div>
  )
}

export default School

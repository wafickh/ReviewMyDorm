import React,{useEffect} from 'react'
import "./home.css";
import {useSelector} from 'react-redux'
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar"
import HomeBody from '../../components/HomeBody/HomeBody';
import HomeEnd from '../../components/HomeEnd/HomeEnd';
function Home() {
  const schools=useSelector((state)=>state.schools)
  console.log(schools)

  return (
    <div>
      <Navbar />
        <SearchBar placeholder="Search for your School..." data={schools} />
      <HomeBody />
      <HomeEnd data={schools}/>
      <Footer />
    </div>
    
  )
}

export default Home

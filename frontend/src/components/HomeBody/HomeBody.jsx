import React, { useEffect, useState } from 'react'
import "./HomeBody.css"
import HeroSection from './HeroSection';
import { FaUniversity } from "react-icons/fa";

import { homeObjThree, homeObjTwo } from './Data';
function HomeBody() {

    const [showLink, setShowLink] = useState(false);
    useEffect(() => {
        if (window.matchMedia("(max-width: 600px)").matches) {
            setShowLink(false);
            // alert("matches");
        } else {
            setShowLink(true);
        }
    }, []);

    return (
        <div className="fullthing">
            <div className="firsttext">
            
                <center>
                    <FaUniversity style={showLink ? {} : { display: "none" }} />
                    ReviewMyDorm is the place for dorm reviews
                    created for you and written by you
                    <FaUniversity style={showLink ? {} : { display: "none" }} />
                </center>
            </div>

            <HeroSection {...homeObjTwo} />
            <HeroSection {...homeObjThree} />

        </div>
    )
}

export default HomeBody

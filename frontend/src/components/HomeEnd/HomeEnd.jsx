import React, { Fragment, useState } from 'react'
import "./HomeEnd.css"
import { BsHouseFill } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
const HomeEnd = ({ data }) => {
    console.log(data)
    const PopSchools = [];
    data.map((value, key) => {
        if (value.Name == "Lebanese American University") {
            PopSchools.push(value)
        }
        if (value.Name == "American University of Beirut") {
            PopSchools.push(value)
        }
        if (value.Name == "Saint Joseph University") {
            PopSchools.push(value)
        }

    })

 


    return (
        <>
            <span className='HeadUni'>
                <h1>
                    Popular Universities
                </h1>
            </span>
            <div className='flexx'>
                {PopSchools.map((value, key) => {
                    let nso = value.Name.replaceAll(' ', '_')
                    let x=0;
                    return (
                        <div className='card cardo'>
                            <a href={`dorms/${nso}`}>
                                <div className='img'>
                                    <img src={value.Image} />
                                </div>
                                <h2 className='title'>{value.Name}</h2>
                                <div className="locnb">
                                    <div className='DormNb'> <BsHouseFill style={{ width: "19px", color: "#562F4A" }} /> {
                                        value.Dorms.map((valuee)=>{
                                           if( valuee.approved==true){
                                                x=x+1
                                           }
                                        })?(<>
                                            {x}
                                        </>):(<>

                                        </>)
                                        
                                        } Dorms</div>
                                    <div className="loc"><MdLocationOn style={{ color: "#562F4A" }} /> {value.City}</div>
                                </div>
                            </a>

                        </div>
                    )

                })}


            </div>



        </>
    )
}

export default HomeEnd

import React, { useRef, useEffect, useCallback, useState } from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import "./AddDorm.css"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";

import * as actionType from '../../constants/actionTypes';
import decode from 'jwt-decode';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { getSchoolByName } from '../../actions/school'
import { createDorm } from '../../actions/dorm';

import mapboxgl from "mapbox-gl";
const schema = yup.object().shape({
    DormName: yup.string().required('This field is required').min(3).max(50),
    Price: yup.number().required().test(
        'no-leading-zero',
        'Leading zero is not allowed',
        (value, context) => {
            return context.originalValue && !context.originalValue.startsWith('0');
        }
    ),
    ContactUs: yup.string().required('This field is required').min(10).max(100)
})


mapboxgl.accessToken = "pk.eyJ1Ijoid2FmaWNraCIsImEiOiJjbGNuZ2ttcnoxMm83M25zOTM0cGpkanlmIn0.8U0pDk8RKlhvQrxzgWsbxQ"
function AddDorm() {
    const location = useLocation();

    const [productImg, setProductImg] = useState("");

    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];

        TransformFileData(file);
        console.log(file)
    };

    const TransformFileData = (file) => {
        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProductImg(reader.result);
            };
        } else {
            setProductImg("");
        }
    };

    let { id, longg, latt } = useParams();


    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const [NoImage, setNoImage] = useState("");
    const [NoCoordinates, setNoCoordinates] = useState("");
    const [NoType, setNoType] = useState("");

    const lat = useRef(null);

    const long = useRef(null);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const history = useNavigate();
    const submitForm = (data) => {
        if (data.Deposit === "") {
            delete data.Deposit;
        }
        if (data.length === "") {
            delete data.length;
        }
        console.log(data.ContactUs)

        let fincheck = [];
        for (let i = 0; i < checkboxs.length; i++) {
            if (checkboxs[i]?.check === true) {
                fincheck.push(checkboxs[i].name)
            }
        }
        let finchecktype = [];
        for (let i = 0; i < checkboxstype.length; i++) {
            if (checkboxstype[i].check === true) {
                finchecktype.push(checkboxstype[i].name)
            }
        }
        if (message.length > 0) {
            data = { ...data, addinfo: message }
        }
        const Name = data.DormName
        const Coordinates = {
            lag: lat.current,
            long: long.current,
        }
        const contractInformation = {
            Deposit: data.Deposit,
            Price: data.Price,
            ContractLength: data.length,
            DormType: finchecktype,
            Amenities: fincheck,
            AdditionalInfo: data.addinfo
        }
        const schooll = school._id
        const us = user.result._id
        const obj = {
            Name,
            contractInformation: contractInformation,
            images: productImg,
            ContactUs: data.ContactUs,
            Coordinates,
            Schools: schooll,
            Author: us
        }
        if (!productImg) {
            setNoImage("sdcsdc")
        }
        else if (finchecktype.length == 0) {
            setNoType("DaBaby")
        }
        else if (Coordinates.lag == null) {
            setNoCoordinates("yeetus")
        }
        else {
            dispatch(createDorm(obj))
            history(`/dorms/${id}`);

            console.log(obj);
        }
    };
    const [Long, setLong] = useState("");
    const [Lat, setLat] = useState("");


    const mapContainerRef = useRef(null);

    const dispatch = useDispatch()
    console.log(id)
    let nso = id.replaceAll('_', ' ')

    const school = useSelector((state) => state.school)
    console.log(school)

    if (!school || longg != school.Coordinates?.long || latt != school.Coordinates?.lag) {
        history('/error')
    }

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
        history.push('/auth');
        setUser(null);
    };

    useEffect(() => {

        if (!user) {
            history('/auth');
        }
        else {
            setUser(JSON.parse(localStorage.getItem('profile')));
            const token = user?.token;

            if (token) {
                const decodedToken = decode(token);
                if (decodedToken.exp * 1000 < new Date().getTime()) logout();
            }
            const wa = dispatch(getSchoolByName(id));

            if (longg < 36 && latt < 36 && longg > 31 && latt > 31) {
                const map = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    style: "mapbox://styles/mapbox/streets-v11?optimize=true",
                    //long then lat
                    center: [longg, latt],
                    zoom: 15.9,
                    maxZoom: 19,
                    pitch: 40
                });


                if (mapContainerRef.current.style.visibility === true) map.resize();

                let mapMarkers = []

                map.on('click', (e) => {
                    mapMarkers.forEach((marker) => marker.remove())
                    const marker = new mapboxgl.Marker({ color: "#562F4A" });
                    marker.setLngLat(e.lngLat).addTo(map);
                    console.log(e.lngLat)
                    mapMarkers.push(marker)
                    console.log("lng:" + marker._lngLat.lng + "Lat:" + marker._lngLat.lat);
                    long.current = marker._lngLat.lng
                    lat.current = marker._lngLat.lat

                    console.log(lat)
                });
            }
            else {
                history('/')

            }
        }



    }, [dispatch, location]);
    const [checkboxstype, setCheckboxstype] = useState([
        {
            id: 70,
            name: 'Single',
            check: false
        }, {
            id: 71,
            name: 'Double shared',
            check: false
        }, {
            id: 72,
            name: 'Triple shared',
            check: false
        }

    ])

    const [checkboxs, setCheckboxs] = useState([
        {
            id: 13,
            name: 'AC',
            check: false

        }, {
            id: 1,
            name: 'Cleaning service',
            check: false
        }, {
            id: 14,
            name: 'Chauffage',
            check: false

        }, {
            id: 2,
            name: 'Unlimited Wifi',
            check: false

        }, {
            id: 3,
            name: 'Shared lounge',
            check: false
        }, {
            id: 4,
            name: 'Hot water',
            check: false

        }, {
            id: 5,
            name: 'Hygiene Hose (shattafe)',
            check: false
        }, {
            id: 6,
            name: 'Joint kitchen',
            check: false

        }, {
            id: 7,
            name: 'Guests allowed',
            check: false
        }, {
            id: 8,
            name: 'Sleepovers',
            check: false

        }, {
            id: 9,
            name: 'Pet friendly',
            check: false

        }, , {
            id: 11,
            name: 'Laundry',
            check: false

        },
        {
            id: 12,
            name: 'Electricity 24/7',
            check: false

        },
        {
            id: 16,
            name: 'Electricity 10+ hours',
            check: false

        }, {
            id: 10,
            name: '24/7 security',
            check: false

        }

    ]);
    const handleCheck = (id) => {
        setCheckboxs((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    return { ...item, check: !item.check };
                } else {
                    return { ...item };
                }
            });
        });
    };
    const handleChecktype = (id) => {
        setCheckboxstype((prev) => {
            return prev.map((item) => {
                if (item.id === id) {
                    return { ...item, check: !item.check };
                } else {
                    return { ...item };
                }
            });
        });
    };
    const rendertype = () => {
        return checkboxstype.map(item => (
            <div className='pr chich inpt'>
                <div className="inppr" key={item.id} onClick={() => handleChecktype(item.id)} >
                    <input type="checkbox" name={item.name} id={item.id} value={item.check} />
                    {item.check && (<>
                        <div className="before"></div>
                        <div className="after">✔</div>

                    </>
                    )}
                </div>
                <label htmlFor={item.id}>{item.name}</label>
            </div>
        ));

    }
    const renderCheckboxs = () => {
        return checkboxs.map(item => (
            <div className='pr chich inpt'>
                <div className="inppr" key={item.id} onClick={() => handleCheck(item.id)} >
                    <input type="checkbox" name={item.name} id={item.id} value={item.check} />
                    {item.check && (<>
                        <div className="before"></div>
                        <div className="after">✔</div>
                    </>
                    )}
                </div>
                <label htmlFor={item.id}>{item.name}</label>
            </div>
        ));
    };
    const renderfilterstype = () => {
        return checkboxstype.map((item) => {
            if (item.check) {
                { console.log(item.check) }
                return (
                    <span className='sax rounded-3' key={item.id} onClick={() => handleChecktype(item.id)}>{item.name}  ✘</span>
                );
            } else {
                return null;
            }
        })
    }

    const renderfilters = () => {
        return checkboxs.map((item) => {
            if (item.check) {
                { console.log(item.check) }
                return (

                    <span className='sax rounded-3' key={item.id} onClick={() => handleCheck(item.id)}>{item.name}  ✘</span>
                );
            } else {
                return null;
            }
        })
    }
    const [message, setMessage] = useState('');

    const handleMessageChange = event => {
        setMessage(event.target.value);
    };

    const handleit = () => {
        history(`/dorms/${id}`)
    }

    return (

        <span className='bud'>
            <Navbar />
            {!user ? (<>
                <center> You are not authorized to do that</center>
            </>) : (<>
                {school && typeof longg != 'number' ? (<>
                    <div className="bod">
                        <div className='card card7'>
                            <form action="" onSubmit={handleSubmit(submitForm)} encType="multipart/form-data">
                                <center> <div className='head'>
                                    <h1>Add a dorm</h1>
                                </div></center>
                                <div className="inp headm">
                                    <h4>Dorm name</h4>
                                    <input type="text" autocomplete="off" name="DormName" id="Dormname" placeholder='Dorm name' className='form-control form-input shadow-none rounded-3 pad' ref={register} />
                                    <span className='error'>{errors.DormName?.message}</span>
                                </div>
                                <div className="contractInfo">
                                    <h3>Contract Information</h3>
                                    <div className="flexxx">
                                        <div className="inp prices1">
                                            <h4>Rent per month ($) </h4>
                                            <input type="text" name="Price" autocomplete="off" placeholder='$' id="Price" className='form-control form-input shadow-none rounded-3 pad' ref={register} />
                                            <span className='error'>{errors.Price?.message ? "Price must be a valid Number" : ""}</span>
                                        </div>
                                        <div className="inp prices1">
                                            <h4>Deposit ($) </h4>
                                            <input type="text" name="Deposit" autocomplete="off" placeholder='$' id="Price" className='form-control form-input shadow-none rounded-3 pad' ref={register} />
                                        </div>
                                    </div>
                                    <div className="inp prices1">
                                        <h4>Contract length (in months) </h4>
                                        <input type="text" name="length" autocomplete="off" placeholder='' id="Price" className='form-control form-input shadow-none rounded-3 pad' ref={register} />
                                    </div>
                                    <div className="inpt in">
                                        <h4>Dorm Type</h4>
                                        <span className="filters">
                                            {renderfilterstype
                                                ()}
                                        </span>
                                        <span className='error'>{NoType ? "Dorm Type is required" : ""}</span>
                                        <div className='thingy'> {rendertype()}</div>


                                    </div>
                                    <div className="addinfo ">
                                        <h4>Amenities (features)</h4>
                                        <div className="filters">
                                            {renderfilters
                                                ()}
                                        </div>
                                        <div className="Check">
                                            {renderCheckboxs()}
                                        </div>
                                    </div>

                                    <div className="addinfo inp prices1">

                                        <h4>Additional Information (optional) </h4>

                                        <textarea type="text" id="w3review" name="w3review" rows="3" cols="50" style={{ padding: 10, fontSize: 15 }} onChange={handleMessageChange} >

                                        </textarea>
                                    </div>
                                    <div className="addinfo bobobi">
                                        <h4>Owner contact information </h4>
                                        <input type="text" name="ContactUs" autocomplete="off" placeholder="Enter owner's phone number, Email..." id="Price" className='form-control form-input shadow-none rounded-3 pad' ref={register} />
                                        <span className='error'>{errors.ContactUs?.message}</span>

                                    </div>


                                </div>
                                <div className="pics">
                                    <h3>Add pictures of your dorm</h3>
                                    <input
                                        type="file" id="fileInput" name="image" accept="image/*" onChange={handleProductImageUpload}
                                        multiple>
                                    </input>
                                    <span className='error'>{NoImage ? "You must add an image" : ""}</span>


                                </div>

                                <div className="location">
                                    <h4>Please Select the exact location of your dorm.</h4>
                                    <div className="Map" ref={mapContainerRef} >

                                    </div>
                                    <span className='error'>{NoCoordinates ? "Location is required" : ""}</span>
                                </div>
                                <div className="Disc">

                                    *All Dorms are screened by moderaters before upload*
                                </div>
                                    <div className="Disc">

                                        *For any updates or changes to your dorm information, kindly reach out to the administrator at <u><a href="mailto:wafic.khalife@lau.edu">wafic.khalife@lau.edu</a></u>  for assistance.*
                                    </div>

                                <input type="hidden" id="long" name="long" value={long.current} />
                                <input type="hidden" id="Lat" name="Lat" value={lat.current} />
                                <div className="buttons">
                                    <button className='back' onClick={() => handleit()}>&laquo; Back</button>
                                    {longg == school.Coordinates?.long || latt == school.Coordinates?.lag ? (<>
                                        <button type='submit' className='continue'>Submit &raquo;</button>
                                    </>) : (<>


                                    </>)}

                                </div>
                            </form>
                        </div>
                    </div>
                </>) : (<>
                    <center>School Not Found</center>

                </>)}


            </>)}



        </span>
    )
}

export default AddDorm

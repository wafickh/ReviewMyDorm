import React, { useEffect } from "react";

import { useDispatch } from 'react-redux'
import { getSchools } from './actions/schools'


import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import Home from "./pages/home/Home";
import AddDorm from "./pages/AddDorm/AddDorm";
import School from "./pages/School/School";
import Auth from "./components/Auth/Auth";
import Admin from "./pages/Admin/Admin";
import Dorm from "./pages/Dorm/Dorm";
import AddReview from "./pages/AddReview/AddReview"
import AdminUser from "./pages/AdminUser/AdminUser"
import Error404 from "./pages/error/Error404";
import AdminRev from "./pages/AdminRev/AdminRev";
import Test from "./pages/test/test";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSchools());

  }, [dispatch]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddReview/:id" element={<AddReview />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/reviews/:id/:longg/:latt" element={<Dorm />} />
        <Route path="/AddDorm/:id/:longg/:latt" element={<AddDorm />} />
        <Route path="/dorms/:id" element={<School />} />
        <Route path="/Admin/Dorms" element={<Admin />} />
        <Route path="/Admin/Reviews" element={<AdminRev />} />
        <Route path="/Admin/Users" element={<AdminUser />} />
        <Route path="/test" element={<Test />} />


        <Route path="/error" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

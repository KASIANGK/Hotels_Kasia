import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from "../Main/Main";
import Home1 from "../Pages/Home1/Home1";

import About from "../Pages/InnerPage/About";
import Room from "../Pages/InnerPage/Room";
import FindRoom from "../Pages/InnerPage/FindRoom";
import RoomDetails from "../Pages/InnerPage/RoomDetails";
import Services from "../Pages/InnerPage/Services";
import ServiceDetails from "../Pages/InnerPage/ServiceDetails";
import Team from "../Pages/InnerPage/Team";
import Pricing from "../Pages/InnerPage/Pricing";
import Blog from "../Pages/InnerPage/Blog";
import BlogDetails from "../Pages/InnerPage/BlogDetails";
import Contact from "../Pages/InnerPage/Contact";
import ErrorPage from "../Shared/ErrorPage/ErrorPage";
import Register from '../BackComponents/BackUser/Action/Register';
import Login from '../BackComponents/BackUser/Action/Login'
import HomeBack from '../BackComponents/HomeBack';
// import HomeBackAdmin from '../BackComponents/BackAdmin/HomeBackAdmin'


// COMPONENT BACK :

import BackHostels from '../BackComponents/BackHostels/BackHostels';
// import HeroBack from '../BackComponents/BackAdmin/HeroBackAdmin';
import HeroUpdate from '../BackComponents/BackSections/HeroUpdate';
import BackAction from '../BackComponents/BackSections/BackAction';

import CreateHostel from '../BackComponents/BackHostels/CreateHostel';
import ManageHostels from '../BackComponents/BackHostels/ManageHostels';
import EditHostel from '../BackComponents/BackHostels/EditHostel';

import BackHostelsDetails from '../BackComponents/BackHostels/BackHostelDetails'
import BackRoomSection from '../BackComponents/BackSections/BackRooms/BackRoomSection'
import BackRoomsSlider from '../BackComponents/BackSections/BackRooms/BackRoomsSlider';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      axios.get("http://127.0.0.1:8000/get_user", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        if (response.data.status === 'success') {
          setUserData(response.data.user_data);
          console.log("User data updated:", response.data.user_data);
        }
      }).catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('access_token');
    console.log('User data reset after logout:', userData);

  };

  return (
    <UserContext.Provider value={{ userData, setUserData, logout }}>
      {children}
    </UserContext.Provider>
  );
};

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<Home1 />} />
        <Route path="register" element={<Register />} />
        <Route path="back" element={<HomeBack />} />
        {/* <Route path="back-admin" element={<HomeBackAdmin />} /> */}


      {/* BACK ROUTES */}

        <Route path='back-hostels' element={<BackHostels />} />
        <Route path='/hero-update/:id' element={<HeroUpdate />} />

        
        <Route path="login" element={<Login />} />
        <Route path="about" element={<About />} />
        <Route path="room" element={<Room />} />
        <Route path="find_room" element={<FindRoom />} />
        <Route path="room_details" element={<RoomDetails />} />
        <Route path="services" element={<Services />} />
        <Route path="service_details" element={<ServiceDetails />} />
        <Route path="our_team" element={<Team />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog_details" element={<BlogDetails />} />
        <Route path="contact" element={<Contact />} />
        <Route path="back-action" element={<BackAction />} />


        <Route path="/manage-hostels" element={<ManageHostels />} />
        <Route path="/create-hostel" element={<CreateHostel />} />
        <Route path="/edit-hostel/:id" element={<EditHostel />} />
        <Route path='/back-room-section' element={<BackRoomSection/>} />
        <Route path='/back-rooms-slider' element={<BackRoomsSlider/>} />

        <Route path="/backhostelsdetails/:id" element={<BackHostelsDetails />} /> {/* Ajoutez cette ligne pour la page BackHostelsDetails */}

      </Route>
    </Routes>
  </Router>
);

export { UserContext, UserProvider, AppRouter };



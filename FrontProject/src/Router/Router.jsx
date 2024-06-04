import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importez tous les composants nécessaires pour vos routes
import Main from "../Main/Main";
import Home1 from "../Pages/Home1/Home1";
import Main2 from "../Main/Main2";
import Home2 from "../Pages/Home2/Home2";
import Main3 from "../Main/Main3";
import Home3 from "../Pages/Home3/Home3";
import Main4 from "../Main/Main4";
import Home4 from "../Pages/Home4/Home4";
import Home5 from "../Pages/Home5/Home5";
import Main5 from "../Main/Main5";
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
import Register from "../BackComponents/User/Action/Register";
import Login from "../BackComponents/User/Action/Login";
import HomeBack from "../BackComponents/BackUser/HomeBack";
import HomeBackAmin from '../BackComponents/BackAmin/HomeBackAmin'


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
        <Route path="back-amin" element={<HomeBackAmin />} />

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
      </Route>
      <Route path="home2" element={<Main2 />}>
        <Route index element={<Home2 />} />
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
      </Route>
      <Route path="home3" element={<Main3 />}>
        <Route index element={<Home3 />} />
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
      </Route>
      <Route path="home4" element={<Main4 />}>
        <Route index element={<Home4 />} />
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
      </Route>
      <Route path="home5" element={<Main5 />}>
        <Route index element={<Home5 />} />
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
      </Route>
    </Routes>
  </Router>
);

export { UserContext, UserProvider, AppRouter };



// import { createBrowserRouter } from "react-router-dom";

// // Home And Main Home1
// import Main from "../Main/Main";
// import Home1 from "../Pages/Home1/Home1";
// // Home And Main Home2
// import Main2 from "../Main/Main2";
// import Home2 from "../Pages/Home2/Home2";
// // Home And Main Home3
// import Main3 from "../Main/Main3";
// import Home3 from "../Pages/Home3/Home3";
// // Home And Main Home4
// import Main4 from "../Main/Main4";
// import Home4 from "../Pages/Home4/Home4";
// // Home And Main Home-5
// import Home5 from "../Pages/Home5/Home5";
// import Main5 from "../Main/Main5";

// // All InnerPage
// import About from "../Pages/InnerPage/About";
// import Room from "../Pages/InnerPage/Room";
// import FindRoom from "../Pages/InnerPage/FindRoom";
// import RoomDetails from "../Pages/InnerPage/RoomDetails";
// import Services from "../Pages/InnerPage/Services";
// import ServiceDetails from "../Pages/InnerPage/ServiceDetails";
// import Team from "../Pages/InnerPage/Team";
// import Pricing from "../Pages/InnerPage/Pricing";
// import Blog from "../Pages/InnerPage/Blog";
// import BlogDetails from "../Pages/InnerPage/BlogDetails";
// import Contact from "../Pages/InnerPage/Contact";
// import ErrorPage from "../Shared/ErrorPage/ErrorPage";
// import Register from "../BackComponents/User/Action/Register";
// import Login from "../BackComponents/User/Action/Login";

// import HomeBack from "../BackComponents/HomeBackUser/HomeBack";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Main />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/",
//         element: <Home1 />,
//       },
//       {
//         path: "/register",
//         element: <Register />,
//       },
//       {
//         path: "/back",
//         element: <HomeBack />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "/about",
//         element: <About />,
//       },
//       {
//         path: "/room",
//         element: <Room />,
//       },
//       {
//         path: "/find_room",
//         element: <FindRoom />,
//       },
//       {
//         path: "/room_details",
//         element: <RoomDetails />,
//       },
//       {
//         path: "/services",
//         element: <Services />,
//       },
//       {
//         path: "/service_details",
//         element: <ServiceDetails />,
//       },
//       {
//         path: "/our_team",
//         element: <Team />,
//       },
//       {
//         path: "/pricing",
//         element: <Pricing />,
//       },
//       {
//         path: "/blog",
//         element: <Blog />,
//       },
//       {
//         path: "/blog_details",
//         element: <BlogDetails />,
//       },
//       {
//         path: "/contact",
//         element: <Contact />,
//       },
//       // {
//       //   path: "/register",
//       //   element: <Register />, 
//       // },
//     ],
//   },
//   // second homepage
//   {
//     path: "/home2",
//     element: <Main2 />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/home2",
//         element: <Home2 />,
//       },
//       {
//         path: "/home2/about",
//         element: <About />,
//       },

//       {
//         path: "/home2/room",
//         element: <Room />,
//       },
//       {
//         path: "/home2/find_room",
//         element: <FindRoom />,
//       },
//       {
//         path: "/home2/room_details",
//         element: <RoomDetails />,
//       },
//       {
//         path: "/home2/services",
//         element: <Services />,
//       },
//       {
//         path: "/home2/service_details",
//         element: <ServiceDetails />,
//       },
//       {
//         path: "/home2/our_team",
//         element: <Team />,
//       },
//       {
//         path: "/home2/pricing",
//         element: <Pricing />,
//       },
//       {
//         path: "/home2/blog",
//         element: <Blog />,
//       },
//       {
//         path: "/home2/blog_details",
//         element: <BlogDetails />,
//       },
//       {
//         path: "/home2/contact",
//         element: <Contact />,
//       },
//       // {
//       //   path: "/home2/register",
//       //   element: <Register />, 
//       // },
//     ],
//   },
//   // Third home router
//   {
//     path: "/home3",
//     element: <Main3 />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/home3",
//         element: <Home3 />,
//       },
//       {
//         path: "/home3/about",
//         element: <About />,
//       },
//       {
//         path: "/home3/room",
//         element: <Room />,
//       },
//       {
//         path: "/home3/find_room",
//         element: <FindRoom />,
//       },
//       {
//         path: "/home3/room_details",
//         element: <RoomDetails />,
//       },
//       {
//         path: "/home3/services",
//         element: <Services />,
//       },
//       {
//         path: "/home3/service_details",
//         element: <ServiceDetails />,
//       },
//       {
//         path: "/home3/our_team",
//         element: <Team />,
//       },
//       {
//         path: "/home3/pricing",
//         element: <Pricing />,
//       },
//       {
//         path: "/home3/blog",
//         element: <Blog />,
//       },
//       {
//         path: "/home3/blog_details",
//         element: <BlogDetails />,
//       },
//       {
//         path: "/home3/contact",
//         element: <Contact />,
//       },
//       // {
//       //   path: "/home3/register",
//       //   element: <Register />, 
//       // },
//     ],
//   },
//   // forth home router
//   {
//     path: "/home4",
//     element: <Main4 />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/home4",
//         element: <Home4 />,
//       },
//       {
//         path: "/home4/about",
//         element: <About />,
//       },
//       {
//         path: "/home4/room",
//         element: <Room />,
//       },
//       {
//         path: "/home4/find_room",
//         element: <FindRoom />,
//       },
//       {
//         path: "/home4/room_details",
//         element: <RoomDetails />,
//       },
//       {
//         path: "/home4/services",
//         element: <Services />,
//       },
//       {
//         path: "/home4/service_details",
//         element: <ServiceDetails />,
//       },
//       {
//         path: "/home4/our_team",
//         element: <Team />,
//       },
//       {
//         path: "/home4/pricing",
//         element: <Pricing />,
//       },
//       {
//         path: "/home4/blog",
//         element: <Blog />,
//       },
//       {
//         path: "/home4/blog_details",
//         element: <BlogDetails />,
//       },
//       {
//         path: "/home4/contact",
//         element: <Contact />,
//       },
//       // {
//       //   path: "/home4/register",
//       //   element: <Register />, 
//       // },
//     ],
//   },
//   // five home router
//   {
//     path: "/home5",
//     element: <Main5 />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/home5",
//         element: <Home5 />,
//       },
//       {
//         path: "/home5/about",
//         element: <About />,
//       },
//       {
//         path: "/home5/room",
//         element: <Room />,
//       },
//       {
//         path: "/home5/find_room",
//         element: <FindRoom />,
//       },
//       {
//         path: "/home5/room_details",
//         element: <RoomDetails />,
//       },
//       {
//         path: "/home5/services",
//         element: <Services />,
//       },
//       {
//         path: "/home5/service_details",
//         element: <ServiceDetails />,
//       },
//       {
//         path: "/home5/our_team",
//         element: <Team />,
//       },
//       {
//         path: "/home5/pricing",
//         element: <Pricing />,
//       },
//       {
//         path: "/home5/blog",
//         element: <Blog />,
//       },
//       {
//         path: "/home5/blog_details",
//         element: <BlogDetails />,
//       },
//       {
//         path: "/home5/contact",
//         element: <Contact />,
//       },

//     ],
//   },
// ]);

// export default router;









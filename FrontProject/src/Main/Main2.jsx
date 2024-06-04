import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import ScrollToTop from "../ScrollToTop";
import Footer2 from "../Shared/Footer/Footer2";
import GoToTop from "../Shared/GoToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import HelmetChanger from "../Shared/Helmet/Helmet";
// import Navbar from "../Shared/Navbar/Navbar";


const Main2 = () => {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <HelmetChanger title="Resort" />
      <ScrollToTop />
      <GoToTop />
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer2 />
    </>
  );
};

export default Main2;

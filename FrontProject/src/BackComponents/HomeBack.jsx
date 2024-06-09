import Action from "../Components/CallDoAction/Action";
import Facilities from "../Components/Facilities/Facilities";
import HeroSection from "../Components/HeroSection/HeroSection";
import HotelAndFacilities from "../Components/HotelAndFacilities/HotelAndFacilities";
import HotelAndResort from "../Components/HotelAndResort/HotelAndResort";
import LatestBlog from "../Components/LatestBlog/LatestBlog";
import Offers from "../Components/Offers/Offers";
import Rooms from "../Components/Rooms/Rooms";
import Testimonial from "../Components/Testimonial/Testimonial";


import HeroUpdate from "./BackSections/HeroUpdate";


import Register from "./BackUser/Action/Register";

const HomeBack = () => {
  return (
    <>
      {/* <Register /> */}
      <HeroUpdate />
      <Rooms />
      <HotelAndResort />
      <HotelAndFacilities />
      <Action />
      <Facilities />
      <Offers />
      <Testimonial />
      <LatestBlog />
    </>
  );
};

export default HomeBack;

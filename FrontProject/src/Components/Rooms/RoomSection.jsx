import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import "../../Components/Testimonial/testimonials.css"
import "keen-slider/keen-slider.min.css";
import { UserContext } from '../../../src/Router/Router';
import { Link } from 'react-router-dom';
import '../../style/Components/Rooms/RoomSection.css'


const RoomSection = () => {
  const [roomSectionData, setRoomSectionData] = useState([]);
  const [editButton, setEditButton] = useState(false);
  const { userData } = useContext(UserContext);



  useEffect(() => {
    // Fetch room section data from the API
    axios.get('http://localhost:8000/room-section/')
      .then(response => {
        setRoomSectionData(response.data);
      })
      .catch(error => {
        console.error('Error fetching room section data:', error);
      });
  }, []);

  useEffect(() => {
    if (userData && userData.role === 2) {
      setEditButton(true);
    } else {
      setEditButton(false);
    }
  }, [userData]);


  // Render room section data
  const renderRoomSectionData = () => {
    return roomSectionData.map(room => (
      <div key={room.id}>
        <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-7 sm:leading-8 md:leading-9 lg:leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mb-[6] font-Garamond font-semibold uppercase">
          {room.title}
        </h1>
        <p className="font-Lora leading-[26px] text-gray dark:text-lightGray font-normal text-sm sm:text-base mt-[15px] lg:mt-0">
          {room.description}
        </p>
      </div>
    ));
  };

  return (
    <div className="py-20 2xl:py-[120px] w-full bg-[url('/images/home-1/section-shape2.png')] bg-no-repeat bg-top bg-opacity-[0.07]">
      <div className="Container">
        {/* section heading */}
        <div
          className="text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          {/* Section logo */}
          <div className="flex items-center justify-center space-x-2 mb-4 lg:mb-[20px]">
            <hr className="w-[100px] h-[1px] text-[#dedbd4] dark:text-[#3b3b3b]" />
            <img
              src="/images/home-1/section-shape1.png"
              alt="room_section_logo"
              className="w-[50px] h-[50px]"
            />
            <hr className="w-[100px] h-[1px] text-[#dedbd4] dark:text-[#3b3b3b]" />
          </div>
          {editButton && (
                <Link to={`/back-room-section`}>
              <button className="back-room-btn right-0 m-4 text-white px-4 py-2 rounded font-Garamond">
                Modifier
              </button>
            </Link>
          )}
          {renderRoomSectionData()}
        </div>
      </div>
    </div>
  );
};

export default RoomSection;

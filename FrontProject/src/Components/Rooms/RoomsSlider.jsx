import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import "keen-slider/keen-slider.min.css";
import { FaStar } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import '../../style/Components/Rooms/RoomsSlider.css'
import { UserContext } from '../../../src/Router/Router';

const RoomsSlider = () => {
  const [roomData, setRoomData] = useState([]);
  const [roomImages, setRoomImages] = useState([]);
  const { userData } = useContext(UserContext);
  const [editRoomsButton, setEditRoomsButton] = useState(false);

  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider({
    breakpoints: {
      "(min-width: 320px)": {
        slides: { perView: 1, spacing: 20 },
      },
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 20 },
      },
      "(min-width:992px)": {
        slides: { perView: 3, spacing: 20 },
      },
    },
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      // setLoaded(true);
    },
  });


  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomsResponse = await axios.get('http://localhost:8000/rooms/');
        setRoomData(roomsResponse.data);

        const imagesResponse = await axios.get('http://localhost:8000/rooms-images/');
        setRoomImages(imagesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRoomData();
  }, []);


  useEffect(() => {
    if (userData && userData.role === 2) {
      setEditRoomsButton(true);
    } else {
      setEditRoomsButton(false);
    }
  }, [userData]);

  const getRandomRooms = (data, count) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const getRoomImage = (index) => {
    const image = roomImages.find(img => img.id === index + 1);
    return image ? `http://localhost:8000${image.image}` : '';
  };

  return (
    <div className="rooms-slider relative">
      {editRoomsButton && (
        <Link to={`/back-rooms-slider`}>
          <button className="back-room-btn right-0 m-4 text-white px-4 py-2 rounded font-Garamond">
            Modifier
          </button>
        </Link>
      )}
      <div className="rooms-slider-bis mt-14 2xl:mt-[60px] keen-slider" ref={sliderRef}>
        {getRandomRooms(roomData, 2).map((room, index) => (
          <div key={index} className="keen-slider__slide number-slide1">
            <div data-aos="fade-up-left" data-aos-duration="1000">
              <div className="rooms-slider-card overflow-x-hidden 3xl:w-[410px] group relative">
                {/* Image */}
                <div className="relative">
                  <div className="rooms-cards overflow-hidden">
                    <img
                      src={getRoomImage(index)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
                      alt={room.name}
                    />
                  </div>
                  {/* View Details Button */}
                  <div className="">
                    <Link to={"/room_details"}>
                      <button className="flex items-center justify-center text-[15px] leading-[38px] bg-lightBlack absolute bottom-0 -left-40 px-5 text-white  group-hover:left-0 transition-all duration-300 hover:bg-khaki">
                        View Details <BsArrowRight className="w-4 h-4 ml-2  text-white" />
                      </button>
                    </Link>
                  </div>
                </div>
                {/* Room Details */}
                <div className="font-Garamond">
                  <div className="px-5 3xl:px-6 py-2 inline-flex bg-khaki text-sm  items-center justify-center text-white  absolute top-[10px] right-[10px] font-Lora font-normal leading-[26px]">
                    <span className="">${room.prix}</span>
                    <span className="mx-2">|</span>
                    <span>Night</span>
                  </div>
                  <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242] border-t-0">
                    <div className="py-6 px-[30px]">
                      <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
                        {room.category}
                      </h4>
                      <Link to="/room">
                        <h2 className="text-2xl lg:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
                          {room.name}
                        </h2>
                      </Link>
                      <p className="text-sm font-normal text-gray  dark:text-lightGray font-Lora">
                        {room.m2} SQ.FT/Rooms
                      </p>
                    </div>
                    <div className="  border-t-[1px] border-[#e8e8e8] dark:border-[#424242] py-5">
                      <div className="px-[30px] flex items-center justify-between">
                        <div className="">
                          <span className="font-Lora text-base flex items-center ">
                            <img src="/images/home-1/room-bottom-icon.png" alt="" />
                            <span className="ml-[10px] text-gray dark:text-lightGray">
                              {room.nombre_lits} King Bed
                            </span>
                          </span>
                        </div>
                        <span className="w-[1px] h-[25px] bg-[#ddd] dark:bg-gray"></span>
                        <ul className="flex items-center text-khaki space-x-[5px]">
                          {[...Array(room.rating)].map((star, i) => (
                            <li key={i}><FaStar /></li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Slider Breckpoints */}
      <div className="mx-auto">
        {loaded && instanceRef.current && (
          <div className="dots flex items-center justify-center">
            {instanceRef.current?.details().slides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => {
                  instanceRef.current?.moveToSlide(idx);
                }}
                className={"dot" + (currentSlide === idx ? " active" : "")}
              ></button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsSlider;












// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "keen-slider/keen-slider.min.css";
// import { FaStar } from "react-icons/fa";
// import { BsArrowRight } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import { useKeenSlider } from "keen-slider/react";
// import '../../style/Components/Rooms/RoomsSlider.css'

// const RoomsSlider = () => {
//   const [roomData, setRoomData] = useState([]);
//   const [roomImages, setRoomImages] = useState([]);

//   const [loaded, setLoaded] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [sliderRef, instanceRef] = useKeenSlider({
//     breakpoints: {
//       "(min-width: 320px)": {
//         slides: { perView: 1, spacing: 20 },
//       },
//       "(min-width: 768px)": {
//         slides: { perView: 2, spacing: 20 },
//       },
//       "(min-width:992px)": {
//         slides: { perView: 3, spacing: 20 },
//       },
//     },
//     loop: true,
//     initial: 0,
//     slideChanged(slider) {
//       setCurrentSlide(slider.track.details.rel);
//     },
//     created() {
//       // setLoaded(true);
//     },
//   });

//   useEffect(() => {
//     const fetchRoomData = async () => {
//       try {
//         const roomsResponse = await axios.get('http://localhost:8000/rooms/');
//         setRoomData(roomsResponse.data);

//         const imagesResponse = await axios.get('http://localhost:8000/rooms-images/');
//         setRoomImages(imagesResponse.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchRoomData();
//   }, []);

//   const getRoomImage = (index) => {
//     const image = roomImages.find(img => img.id === index + 1);
//     return image ? `http://localhost:8000${image.image}` : '';
//   };

//   return (
//     <div className="rooms-slider relative">
//       <div className="mt-14 2xl:mt-[60px] keen-slider" ref={sliderRef}>
//         {roomData.map((room, index) => (
//           <div key={index} className="keen-slider__slide number-slide1">
//             <div data-aos="fade-up-left" data-aos-duration="1000">
//               <div className="overflow-x-hidden 3xl:w-[410px] group relative">
//                 {/* Image */}
//                 <div className="relative">
//                   <div className="rooms-cards overflow-hidden">
//                     <img
//                       src={getRoomImage(index)}
//                       className="w-full h-full object-cover group-hover:scale-110 transition-all duration-300"
//                       alt={room.name}
//                     />
//                   </div>
//                   {/* View Details Button */}
//                   <div className="">
//                     <Link to={"/room_details"}>
//                       <button className="flex items-center justify-center text-[15px] leading-[38px] bg-lightBlack absolute bottom-0 -left-40 px-5 text-white  group-hover:left-0 transition-all duration-300 hover:bg-khaki">
//                         View Details <BsArrowRight className="w-4 h-4 ml-2  text-white" />
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//                 {/* Room Details */}
//                 <div className="font-Garamond">
//                   <div className="px-5 3xl:px-6 py-2 inline-flex bg-khaki text-sm  items-center justify-center text-white  absolute top-[10px] right-[10px] font-Lora font-normal leading-[26px]">
//                     <span className="">${room.prix}</span>
//                     <span className="mx-2">|</span>
//                     <span>Night</span>
//                   </div>
//                   <div className=" border-[1px] border-[#e8e8e8] dark:border-[#424242] border-t-0">
//                     <div className="py-6 px-[30px]">
//                       <h4 className="text-sm leading-[26px] text-khaki uppercase font-semibold">
//                         {room.category}
//                       </h4>
//                       <Link to="/room">
//                         <h2 className="text-2xl lg:text-[28px] leading-[26px] font-semibold text-lightBlack dark:text-white py-4">
//                           {room.name}
//                         </h2>
//                       </Link>
//                       <p className="text-sm font-normal text-gray  dark:text-lightGray font-Lora">
//                         {room.m2} SQ.FT/Rooms
//                       </p>
//                     </div>
//                     <div className="  border-t-[1px] border-[#e8e8e8] dark:border-[#424242] py-5">
//                       <div className="px-[30px] flex items-center justify-between">
//                         <div className="">
//                           <span className="font-Lora text-base flex items-center ">
//                             <img src="/images/home-1/room-bottom-icon.png" alt="" />
//                             <span className="ml-[10px] text-gray dark:text-lightGray">
//                               {room.nombre_lits} King Bed
//                             </span>
//                           </span>
//                         </div>
//                         <span className="w-[1px] h-[25px] bg-[#ddd] dark:bg-gray"></span>
//                         <ul className="flex items-center text-khaki space-x-[5px]">
//                           {[...Array(room.rating)].map((star, i) => (
//                             <li key={i}><FaStar /></li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* Slider Breckpoints */}
//       <div className="mx-auto">
//         {loaded && instanceRef.current && (
//           <div className="dots flex items-center justify-center">
//             {instanceRef.current?.details().slides.map((slide, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => {
//                   instanceRef.current?.moveToSlide(idx);
//                 }}
//                 className={"dot" + (currentSlide === idx ? " active" : "")}
//               ></button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RoomsSlider;




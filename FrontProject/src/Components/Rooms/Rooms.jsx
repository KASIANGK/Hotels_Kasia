import { BsArrowRight } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../Components/Testimonial/testimonials.css"
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import React, { useContext, useState, useEffect } from 'react';
import { BiChevronDown } from "react-icons/bi";
import RoomSection from "./RoomSection";
import RoomsSlider from "./RoomsSlider";
import { UserContext } from '../../../src/Router/Router';

const Rooms = () => {
  const [open, setOpen] = useState(false);
  const [guestOpen, setGuestOpen] = useState(false);
  const [room, setRoom] = useState(1);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded] = useState(false);
  const { userData } = useContext(UserContext);
  // const [editButton, setEditButton] = useState(false);
  // const [editRoomsButton, setEditRoomsButton] = useState(false);


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


  // useEffect(() => {
  //   if (userData && userData.role === 2) {
  //     setEditButton(true);
  //   } else {
  //     setEditButton(false);
  //   }
  // }, [userData]);

  // useEffect(() => {
  //   if (userData && userData.role === 2) {
  //     setEditRoomsButton(true);
  //   } else {
  //     setEditRoomsButton(false);
  //   }
  // }, [userData]);


  return (
    <div className="rooms-all bg-whiteSmoke dark:bg-lightBlack">
      <div className="relative z-[1] ">
        <div
          className="Container-Hero bg-lightBlack dark:bg-normalBlack  grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 items-center justify-center font-Lora py-3 lg:py-4 xl:py-5 2xl:py-6 border-t-[3px] border-t-khaki mt-[-75px]  left-0 right-0 z-[1]"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <div className="p-3">
            <p className="text-sm text-lightGray ml-3">Check In</p>
            <div className="flex items-center pt-[2px] ">
              <input
                type="date"
                className="border-none bg-transparent focus:outline-transparent focus:border-transparent text-white focus:border-none outline-0  text-sm lg:text-base focus:ring-transparent"
                required
              />
            </div>
          </div>
          <div className="p-3">
            <p className="text-sm text-lightGray ml-3">Check Out</p>
            <div className="flex items-center pt-[2px] ">
              <input
                type="date"
                className="border-none bg-transparent focus:outline-transparent focus:border-transparent text-white focus:border-none outline-0  text-sm lg:text-base focus:ring-transparent"
                defaultValue="26 August, 2023"
                required
              />
            </div>
          </div>
          <div className="p-3">
            <div
              className={`${({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active"
                  : ""} text-white  px-3 py-2 w-full block transition-all duration-300 group relative `}
              to="#"
            >
              <span
                className="flex items-center justify-between text-sm text-lightGray cursor-pointer"
                onClick={() => setOpen(!open)}
                title="click hear to open and close rooms extender"
              >
                Rooms
                <BiChevronDown className="" />
              </span>
              <div className="pt-[10px] text-sm sm:text-base">{room} Room</div>
              <div className="absolute pt-5  z-20">
                <div
                  className={`shadow-2xl ${
                    open ? "" : "hidden"
                  } rounded-sm bg-white text-black w-60 text-left dark:bg-normalBlack dark:text-white transition-all duration-500 text-sm py-4 `}
                >
                  <div className="py-2 px-5 group cursor-pointer">
                    <li className="flex items-center justify-between">
                      <div className="">{room} Room</div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="w-5 h-5 md:w-6 md:h-6 bg-khaki text-white"
                          onClick={() => setRoom(room + 1)}
                        >
                          +
                        </button>
                        <button
                          className="w-5 h-5 md:w-6 md:h-6 bg-khaki text-white"
                          onClick={() => setRoom(room - 1)}
                          disabled={room <= 1}
                        >
                          -
                        </button>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div
              className={`text-white   px-3 py-2 w-full block transition-all duration-300 group relative `}
              to="#"
            >
              <span
                className="flex items-center justify-between text-sm text-lightGray cursor-pointer"
                onClick={() => setGuestOpen(!guestOpen)}
                title="click hear to open and close Adult And Children extender"
              >
                Guests
                <BiChevronDown className="" />
              </span>
              <div className="pt-[10px] text-sm sm:text-base">
                {adult} Adult, {children} Child
              </div>
              <div className="absolute pt-5  z-20 ml-[-120px] sm:ml-0">
                <div
                  className={`shadow-2xl ${
                    guestOpen ? "" : "hidden"
                  } rounded-sm bg-white text-black w-60 text-left dark:bg-normalBlack dark:text-white transition-all duration-500 text-sm py-4 left`}
                >
                  <div className="py-2 px-5 group cursor-pointer">
                    <li className="flex items-center justify-between">
                      <div className="">{adult} Adult</div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="w-5 h-5 md:w-6 md:h-6 bg-khaki text-white"
                          onClick={() => setAdult(adult + 1)}
                        >
                          +
                        </button>
                        <button
                          className="w-5 h-5 md:w-6 md:h-6 bg-khaki text-white"
                          onClick={() => setAdult(adult - 1)}
                          disabled={adult <= 1}
                        >
                          -
                        </button>
                      </div>
                    </li>
                    <li className="flex items-center justify-between mt-1">
                      <div className="">{children} Child</div>
                      <div className="flex items-center space-x-2">
                        <button
                          className="w-5 h-5 md:w-6 md:h-6 bg-khaki text-white"
                          onClick={() => setChildren(children + 1)}
                        >
                          +
                        </button>
                        <button
                          className="w-5 h-5 md:w-6 md:h-6 bg-khaki text-white"
                          onClick={() => setChildren(children - 1)}
                          disabled={children < 1}
                        >
                          -
                        </button>
                      </div>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link to="/find_room">
            <button className="w-[142px] h-10 lg:h-[50px] text-[15px] bg-khaki font-Garamond border border-khaki text-white mx-auto col-span-2  md:col-span-1 lg:col-span-1 relative z-10 before:absolute before:top-0 before:right-0 before:-z-10 before:w-0 before:h-full before:bg-lightBlack before:transition-all before:duration-500 hover:before:w-full hover:before:left-0">
              Checkout Now
            </button>
          </Link>
        </div>
      </div>





      <div className="room-section">
        <RoomSection/>
        <RoomsSlider />
      </div>
      
 
      
    </div>
  );
};

export default Rooms;

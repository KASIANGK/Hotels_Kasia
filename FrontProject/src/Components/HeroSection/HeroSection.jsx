import React, { useContext, useState, useEffect } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from 'react-icons/fa';
import { BiPhoneCall } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../src/Router/Router';
import axios from 'axios';
import './style.css';

const HeroSection = () => {
  const { userData } = useContext(UserContext);
  const [editButton, setEditButton] = useState(false);
  const [editHostelsButton, setEditHostelsButton] = useState(false);
  const [heroSlides, setHeroSlides] = useState([]);

  useEffect(() => {
    if (userData && userData.role === 2) {
      setEditButton(true);
    } else {
      setEditButton(false);
    }
  }, [userData]);

  useEffect(() => {
    if (userData && userData.role === 2) {
      setEditHostelsButton(true);
    } else {
      setEditHostelsButton(false);
    }
  }, [userData]);

  useEffect(() => {
    const fetchHeroSlides = async () => {
      try {
        const response = await axios.get('http://localhost:8000/hero-slides/');
        console.log('API Response:', response.data);
  
        const slides = Array.isArray(response.data) ? response.data : [];
        console.log('Parsed Slides:', slides);
        setHeroSlides(slides);
      } catch (error) {
        console.error('Error fetching hero slides:', error);
      }
    };
  
    fetchHeroSlides();
  }, [userData]); // Ajoutez userData comme dépendance pour rafraîchir les données après modification
  
  useEffect(() => {
    console.log('Hero Slides State:', heroSlides);
  }, [heroSlides]);



  return (
    <div className="hero-section">
      <Swiper
        centeredSlides={true}
        navigation={true}
        speed={3000}
        autoplay={{
          delay: 10000,
          disableOnInteraction: true,
        }}
        pagination={{
          clickable: true,
        }}
        slidesPerView={1} 
        modules={[Navigation, Autoplay, Pagination]}
        className="mySwiper"
      >
      {heroSlides.slice(0, 3).map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-full h-[700px] md:h-[800px] xl:h-[850px] 3xl:h-[950px] grid items-center justify-center text-white relative pb-[150px] lg:pb-16 xl:pb-0"
            data-aos="fade-down"
            style={{ 
              backgroundImage: `url('http://localhost:8000${slide.hostel_image.image}')`,  // Concaténer l'URL de base avec le chemin relatif de l'image
              backgroundSize: 'cover', 
              backgroundPosition: 'center' 
            }}
          >
            <div className="font-Garamond 2xl:w-[720px] text-center">
              {slide.hostel.rating > 0 && (
                <div className="flex space-x-2 items-center justify-center mb-5 lg:mb-6">
                  {[...Array(slide.hostel.rating)].map((_, i) => (
                    <FaStar key={i} className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-yellow-500" />
                  ))}
                </div>
              )}

              {editButton && (
                <Link to={`/hero-update/${slide.id}`}>
                  <button className="herosection-btn  absolute top-0 right-0 m-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Modifier
                  </button>
                </Link>
              )}
              {editHostelsButton && (
                <Link to="/manage-hostels">
                  <button className="hostels-btn  absolute top-0 right-0 m-4 bg-blue-500 text-white px-4 py-2 rounded">
                    Modifier Hotels
                  </button>
                </Link>
              )}
              <h4 className="text-base mb-4">{slide.subtitle}</h4>
              <div className="mb-7 md:mb-8 lg:mb-9 xl:mb-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl font-semibold leading-[40px] md:leading-[50px] 3xl:leading-[70px]">
                  {slide.title_one}
                </h1>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl font-semibold leading-[40px] lg:leading-[50px] 2xl:leading-[60px]">
                  {slide.title_two}
                </h1>
              </div>
              <Link to="/about">
                <button
                  className="w-[185px] h-[48px] lg:h-[56px] bg-khaki relative before:w-8 before:h-[1px] before:bg-khaki before:absolute before:left-0 before:top-16 
                  text-base
                  font-Garamond
                  font-medium mt-[-6px] hover-animBg after:bg-normalBlack after:rounded-none hover:before:bg-normalBlack uppercase"
                >
                  Discover More
                </button>
              </Link>
            </div>
            <div className="w-[221px] h-[50px] border-white border hidden md:flex items-center justify-center absolute left-0 top-1/2 -rotate-90 phone-number-container">
              <BiPhoneCall className="w-5 h-5 mr-2 text-khaki" /> {slide.hostel.phone}
            </div>
          </div>
        </SwiperSlide>


        ))}
      </Swiper>
    </div>
  );
};

export default HeroSection;






// import React, { useContext, useState, useEffect } from 'react';
// import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { FaStar } from 'react-icons/fa';
// import { BiPhoneCall } from 'react-icons/bi';
// import { Link } from 'react-router-dom';
// import { UserContext } from '../../../src/Router/Router';
// import axios from 'axios';
// import './style.css';

// const HeroSection = () => {
//   const { userData } = useContext(UserContext);
//   const [editButton, setEditButton] = useState(false);
//   const [editHostelsButton, setEditHostelsButton] = useState(false);
//   const [heroSlides, setHeroSlides] = useState([]);

//   useEffect(() => {
//     if (userData && userData.role === 2) {
//       setEditButton(true);
//     } else {
//       setEditButton(false);
//     }
//   }, [userData]);

//   useEffect(() => {
//     if (userData && userData.role === 2) {
//       setEditHostelsButton(true);
//     } else {
//       setEditHostelsButton(false);
//     }
//   }, [userData]);

//   useEffect(() => {
//     const fetchHeroSlides = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/hero-slides/');
//         console.log('API Response:', response.data);

//         const slides = Array.isArray(response.data) ? response.data : [];
//         console.log('Parsed Slides:', slides);
//         setHeroSlides(slides);
//       } catch (error) {
//         console.error('Error fetching hero slides:', error);
//       }
//     };

//     fetchHeroSlides();
//   }, []);

//   useEffect(() => {
//     console.log('Hero Slides State:', heroSlides);
//   }, [heroSlides]);

//   return (
//     <div className="hero-section">
//       <Swiper
//         centeredSlides={true}
//         navigation={true}
//         speed={3000}
//         autoplay={{
//           delay: 10000,
//           disableOnInteraction: true,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         slidesPerView={1} 
//         modules={[Navigation, Autoplay, Pagination]}
//         className="mySwiper"
//       >
//         {heroSlides.slice(0, 3).map((slide, index) => (
//           <SwiperSlide key={index}>
//             <div
//               className="w-full h-[700px] md:h-[800px] xl:h-[850px] 3xl:h-[950px] grid items-center justify-center text-white relative pb-[150px] lg:pb-16 xl:pb-0"
//               data-aos="fade-down"
//               style={{ 
//                 backgroundImage: `url('http://localhost:8000${slide.hostel_image.image}')`,  // Concaténer l'URL de base avec le chemin relatif de l'image
//                 backgroundSize: 'cover', 
//                 backgroundPosition: 'center' 
//               }}
//             >
//               <div className="font-Garamond 2xl:w-[720px] text-center">
//                 <div className="flex space-x-2 items-center justify-center mb-5 lg:mb-6">
//                   {[...Array(slide.rating)].map((_, i) => (
//                     <FaStar key={i} className="w-[14px] h-[14px] lg:w-[16px] lg:h-[16px] text-khaki" />
//                   ))}
//                 </div>
//                 {editButton && (
//                   <Link to={`/hero-update/${slide.id}`}>
//                     <button className="edit-btn absolute top-0 right-0 m-4 bg-blue-500 text-white px-4 py-2 rounded">
//                       Modifier
//                     </button>
//                   </Link>
//                 )}
//                 {editHostelsButton && (
//                   <Link to="/manage-hostels">
//                     <button className="edit-hostels-btn absolute top-0 right-0 m-4 bg-blue-500 text-white px-4 py-2 rounded">
//                       Modifier Hotels
//                     </button>
//                   </Link>
//                 )}
//                 <h4 className="text-base mb-4">{slide.subtitle}</h4>
//                 <div className="mb-7 md:mb-8 lg:mb-9 xl:mb-10">
//                   <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl font-semibold leading-[40px] md:leading-[50px] 3xl:leading-[70px]">
//                     {slide.title_one}
//                   </h1>
//                   <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl 3xl:text-6xl font-semibold leading-[40px] lg:leading-[50px] 2xl:leading-[60px]">
//                     {slide.title_two}
//                   </h1>
//                 </div>
//                 <Link to="/about">
//                   <button
//                     className="w-[185px] h-[48px] lg:h-[56px] bg-khaki relative before:w-8 before:h-[1px] before:bg-khaki before:absolute before:left-0 before:top-16 
//                   text-base
//                   font-Garamond
//                   font-medium mt-[-6px] hover-animBg after:bg-normalBlack after:rounded-none hover:before:bg-normalBlack uppercase"
//                   >
//                     Discover More
//                   </button>
//                 </Link>
//               </div>
//               <div className="w-[221px] h-[50px] border-white border hidden md:flex items-center justify-center absolute left-0 top-1/2 -rotate-90 phone-number-container">
//                 <BiPhoneCall className="w-5 h-5 mr-2 text-khaki" /> +980 123 4567 890
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default HeroSection;



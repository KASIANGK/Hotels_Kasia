import React, { useState, useEffect } from 'react';
import { BsPlay } from "react-icons/bs";
import FsLightbox from "fslightbox-react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Action = ({ userData }) => {
  const [toggler, setToggler] = useState(false);
  const [sectionData, setSectionData] = useState({});
  const [hostelImage, setHostelImage] = useState('');
  const [testimonial, setTestimonial] = useState({});
  const [editButton, setEditButton] = useState(false);

  useEffect(() => {
    if (userData && userData.role === 2) {
      setEditButton(true);
    } else {
      setEditButton(false);
    }
  }, [userData]);

  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/section-manager/');
        if (response.data.length > 0) {
          setSectionData(response.data[0]);
          console.log('Section Manager:', response.data[0]);
        } else {
          console.error('No section data found');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la section:', error);
      }
    };

    const fetchHotelInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/hostels/');
        const hostels = response.data;
        const randomHostel = hostels[Math.floor(Math.random() * hostels.length)];
        setHostelImage(randomHostel.image_url);
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'hôtel:', error);
      }
    };

    const fetchTestimonial = async () => {
      try {
        const response = await axios.get('http://localhost:8000/testimonials/');
        if (response.data.length > 0) {
          setTestimonial(response.data[0]);
          console.log('Testimonial:', response.data[0]);
        } else {
          console.error('No testimonial data found');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des témoignages:', error);
      }
    };

    fetchSectionData();
    fetchHotelInfo();
    fetchTestimonial();
  }, []);

  return (
    <div className="dark:bg-mediumBlack dark:z-[-1]">
      <section className="Container mt-[-90px] dark:z-[1]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">
          <div
            className="bg-[#f8f6f3] dark:bg-normalBlack space-y-[14px] flex-1 font-Garamond px-5 sm:px-7 md:px-9 lg:pl-[70px] py-10 md:py-[96px] lg:pr-[70px]"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h5 className="text-base text-khaki leading-[26px] font-semibold">
              {sectionData.entete}
            </h5>
            <h1 className="text-[22px] sm:text-2xl md:text-[28px] xl:text-[32px] 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white font-semibold">
              {sectionData.titre}
            </h1>
            <p className="text-sm sm:text-base font-Lora text-gray dark:text-lightGray font-normal leading-[26px]">
              {sectionData.contenu}
            </p>
            <p className="text-sm sm:text-base font-Lora italic leading-[26px] underline text-gray dark:text-lightGray font-normal">
              {testimonial.contenu}
            </p>
            <div className="flex items-center space-x-6 pt-5">
              <img
                src={testimonial.author && testimonial.author.avatar ? testimonial.author.avatar.url : '/path/to/default/avatar.png'}
                className="w-[65px] h-[65px] object-cover"
                alt="Author Avatar"
              />
              <div>
                <h4 className="text-lg sm:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
                  {testimonial.author ? `${testimonial.author.prenom} ${testimonial.author.nom}` : 'Nom de l\'auteur'}
                </h4>
                <p className="pt-1 text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center font-Lora">
                  <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
                  {testimonial.author && testimonial.author.role ? testimonial.author.role.name : 'Fonction de l\'auteur'}
                </p>
              </div>
            </div>
            {editButton && (
              <Link to="/back-action">
                <button className="action-modify bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-2">
                  Modifier
                </button>
              </Link>
            )}
          </div>
          <div
            className="flex-1 h-[100%] w-full relative"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <img
              src="/images/home-1/action-img.png"
              className="h-full w-full md:h-[80%] lg:h-full 2xl:h-[99%]"
              alt=""
            />
            <div
              className="w-[70px] h-[70px] text-white absolute top-1/2 md:top-[35%] lg:top-1/2 left-[45%] bg-khaki rounded-full flex items-center justify-center cursor-pointer z-[1]"
              onClick={() => setToggler(!toggler)}
            >
              <BsPlay className="w-8 h-8" />
            </div>
            <span className="top-[47%] md:top-[33%] lg:top-[48%] left-[42%] lg:left-[43.5%] border w-[90px] h-[90px] rounded-full absolute border-white video-animation"></span>
          </div>
          <FsLightbox
            toggler={toggler}
            sources={["https://youtu.be/fFDyoI73viQ?si=GbDzAagjoa_0Nv2x"]}
          />
        </div>
      </section>
    </div>
  );
};

export default Action;









// import { BsPlay } from "react-icons/bs";
// import { useState, useEffect } from "react";
// import FsLightbox from "fslightbox-react";
// import axios from 'axios';
// import { Link } from "react-router-dom";

// import { UserContext } from '../../Router/Router';
// import { useContext } from "react";





// const Action = () => {
//   const [hotelInfo, setHotelInfo] = useState({
//     title: "",
//     subtitle: "",
//     image: "",
//     rating: 0,
//     roomCount: 0
//   });
//   const [toggler, setToggler] = useState(false);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const { userData } = useContext(UserContext);
//   const [editButton, setEditButton] = useState(false);
  
//   useEffect(() => {
//     if (userData && userData.role === 2) {
//       setEditButton(true);
//     } else {
//       setEditButton(false);
//     }
//   }, [userData]);


//   useEffect(() => {
//     const fetchHotelInfo = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/hostels/'); // Remplacez par l'URL exacte pour récupérer les informations de l'hôtel
//         setHotelInfo(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des informations de l\'hôtel :', error);
//       }
//     };


//     fetchHotelInfo();
//     // fetchUserData();
//   }, []);

//   return (
//     <div className="dark:bg-mediumBlack dark:z-[-1]">
//       <section className="Container mt-[-90px] dark:z-[1]">
//         <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center ">
//           <div
//             className="bg-[#f8f6f3] dark:bg-normalBlack space-y-[14px] flex-1 font-Garamond px-5 sm:px-7 md:px-9 lg:pl-[70px] py-10 md:py-[96px] lg:pr-[70px]"
//             data-aos="fade-up"
//             data-aos-duration="1000"
//           >
//             <h5 className="text-base text-khaki leading-[26px] font-semibold">
//               {hotelInfo.subtitle}
//             </h5>
//             <h1 className="text-[22px] sm:text-2xl md:text-[28px] xl:text-[32px] 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white font-semibold">
//               {hotelInfo.title}
//             </h1>
//             <p className="text-sm sm:text-base font-Lora text-gray dark:text-lightGray font-normal leading-[26px]">
//               Rapidiously myocardinate cross-platform intellectual capital after
//               model. Appropriately create interactive infrastructures after main
//               Holisticly facilitate stand-alone inframe
//             </p>
//             <p className="text-sm sm:text-base font-Lora italic leading-[26px] underline text-gray dark:text-lightGray font-normal">
//               “ Model. Appropriately create interactive infrastructures after
//               main Holisticly facilitate stand-alone inframe of the world ”
//             </p>
//             <div className="flex items-center space-x-6 pt-5">
//               <img
//                 src={hotelInfo.image}
//                 className="w-[65px] h-[65px] object-cover"
//                 alt="Hotel"
//               />
//               <div className="">
//                 <h4 className="text-lg sm:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
//                   John D. Alexon
//                 </h4>
//                 <p className="pt-1 text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center font-Lora">
//                   <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
//                   Manager
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div
//             className="flex-1 h-[100%] w-full relative"
//             data-aos="fade-up"
//             data-aos-duration="1000"
//           >
//             <img
//               src="/images/home-1/action-img.png"
//               className="h-full w-full md:h-[80%] lg:h-full 2xl:h-[99%]"
//               alt=""
//             />
//             <div
//               className="w-[70px] h-[70px] text-white absolute top-1/2 md:top-[35%] lg:top-1/2 left-[45%] bg-khaki rounded-full flex items-center justify-center cursor-pointer z-[1]"
//               onClick={() => setToggler(!toggler)}
//             >
//               <BsPlay className="w-8 h-8" />
//             </div>
//             <span className="top-[47%] md:top-[33%] lg:top-[48%] left-[42%] lg:left-[43.5%] border w-[90px] h-[90px] rounded-full absolute border-white video-animation"></span>
//           </div>
//           <FsLightbox
//             toggler={toggler}
//             sources={["https://youtu.be/fFDyoI73viQ?si=GbDzAagjoa_0Nv2x"]}
//           />
//         </div>
//       </section>

//       {editButton && (


//           <Link to="/back-action">
//             <button className="action-modify bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-2">                      Modifier
//             Modifier
//             </button>
//           </Link>
//         )}    
//         </div>
//   );
// };

// export default Action;







// import { BsPlay } from "react-icons/bs";
// import { useState } from "react";
// import FsLightbox from "fslightbox-react";
// const Action = () => {
//   const [toggler, setToggler] = useState(false);
//   return (
//     <div className="dark:bg-mediumBlack dark:z-[-1]">
//       <section className="Container mt-[-90px] dark:z-[1]">
//         <div className=" w-full grid grid-cols-1 lg:grid-cols-2 items-center ">
//           <div
//             className="bg-[#f8f6f3] dark:bg-normalBlack space-y-[14px] flex-1 font-Garamond px-5 sm:px-7 md:px-9 lg:pl-[70px] py-10 md:py-[96px] lg:pr-[70px]"
//             data-aos="fade-up"
//             data-aos-duration="1000"
//           >
//             <h5 className="text-base text-khaki leading-[26px] font-semibold">
//               MANAGER
//             </h5>
//             <h1 className="text-[22px] sm:text-2xl md:text-[28px] xl:text-[32px] 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white font-semibold">
//               LUXURY BEST HOTEL IN CITY CALIFORNIA, USA
//             </h1>
//             <p className="text-sm sm:text-base font-Lora text-gray dark:text-lightGray font-normal leading-[26px]">
//               Rapidiously myocardinate cross-platform intellectual capital after
//               model. Appropriately create interactive infrastructures after main
//               Holisticly facilitate stand-alone inframe
//             </p>
//             <p className="text-sm sm:text-base font-Lora italic leading-[26px] underline  text-gray dark:text-lightGray font-normal ">
//               “ Model. Appropriately create interactive infrastructures after
//               main Holisticly facilitate stand-alone inframe of the world ”
//             </p>
//             <div className="flex items-center space-x-6 pt-5">
//               <img
//                 src="/images/home-1/call-do-action-img.png"
//                 className="w-[65px] h-[65px] object-cover"
//                 alt=""
//               />

//               <div className="">
//                 <h4 className="text-lg sm:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
//                   John D. Alexon
//                 </h4>
//                 <p className="pt-1 text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center font-Lora">
//                   <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
//                   Manger
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div
//             className="flex-1 h-[100%] w-full relative "
//             data-aos="fade-up"
//             data-aos-duration="1000"
//           >
//             <img
//               src="/images/home-1/action-img.png"
//               className="h-full w-full md:h-[80%] lg:h-full 2xl:h-[99%] "
//               alt=""
//             />

//             <div
//               className="w-[70px] h-[70px]  text-white absolute top-1/2 md:top-[35%] lg:top-1/2 left-[45%] bg-khaki rounded-full flex items-center justify-center cursor-pointer z-[1] "
//               onClick={() => setToggler(!toggler)}
//             >
//               <BsPlay className="w-8 h-8" />
//             </div>
//             <span className=" top-[47%] md:top-[33%] lg:top-[48%] left-[42%] lg:left-[43.5%] border w-[90px] h-[90px] rounded-full absolute border-white video-animation"></span>
//           </div>
//           <FsLightbox
//             toggler={toggler}
//             sources={["https://youtu.be/fFDyoI73viQ?si=GbDzAagjoa_0Nv2x"]}
//           />
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Action;

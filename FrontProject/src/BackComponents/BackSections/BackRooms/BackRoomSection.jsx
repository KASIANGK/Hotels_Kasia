import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../../Components/Testimonial/testimonials.css"
import '../../../style/BackRooms/BackRoomSection.css'


import "keen-slider/keen-slider.min.css";
import { UserContext } from '../../../Router/Router';

const BackRoomSection = () => {
  const [roomSectionData, setRoomSectionData] = useState([]);
  const [editButton, setEditButton] = useState(false);
  const { userData } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  useEffect(() => {
    // Fetch room section data from the API
    axios.get('http://localhost:8000/room-section/')
      .then(response => {
        setRoomSectionData(response.data);
        setFormData(response.data[0]); // Assuming only one room section data is fetched
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/room-section/', formData);
      console.log(response.data);
      // Optionally, you can update the UI with the updated data
    } catch (error) {
      console.error('Error updating room section data:', error);
    }
  };

  return (
    <div className="py-20 2xl:py-[120px] w-full bg-[url('/images/home-1/section-shape2.png')] bg-no-repeat bg-top bg-opacity-[0.07]">
      <div className="Container">
        {/* section heading */}
        <div
          className="back-room-section-card text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5"
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
            <form className="back-rooms-section-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          )}
          <div>
            <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-7 sm:leading-8 md:leading-9 lg:leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mb-[6] font-Garamond font-semibold uppercase">
              {roomSectionData.length > 0 && roomSectionData[0].title}
            </h1>
            <p className="font-Lora leading-[26px] text-gray dark:text-lightGray font-normal text-sm sm:text-base mt-[15px] lg:mt-0">
              {roomSectionData.length > 0 && roomSectionData[0].description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackRoomSection;






// import React, { useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import "../../../Components/Testimonial/testimonials.css"
// import '../../../style/BackRooms/BackRoomSection.css'


// import "keen-slider/keen-slider.min.css";
// import { UserContext } from '../../../Router/Router';

// const BackRoomSection = () => {
//   const [roomSectionData, setRoomSectionData] = useState([]);
//   const [editButton, setEditButton] = useState(false);
//   const { userData } = useContext(UserContext);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: ''
//   });

//   useEffect(() => {
//     // Fetch room section data from the API
//     axios.get('http://localhost:8000/room-section/')
//       .then(response => {
//         setRoomSectionData(response.data);
//         setFormData(response.data[0]); // Assuming only one room section data is fetched
//       })
//       .catch(error => {
//         console.error('Error fetching room section data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     if (userData && userData.role === 2) {
//       setEditButton(true);
//     } else {
//       setEditButton(false);
//     }
//   }, [userData]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put('http://localhost:8000/room-section/', formData);
//       console.log(response.data);
//       // Optionally, you can update the UI with the updated data
//     } catch (error) {
//       console.error('Error updating room section data:', error);
//     }
//   };

//   return (
//     <div className="py-20 2xl:py-[120px] w-full bg-[url('/images/home-1/section-shape2.png')] bg-no-repeat bg-top bg-opacity-[0.07]">
//       <div className="Container">
//         {/* section heading */}
//         <div
//           className="back-room-section-card text-center sm:px-8 md:px-[80px] lg:px-[120px] xl:px-[200px] 2xl:px-[335px] mx-auto px-5"
//           data-aos="fade-up"
//           data-aos-duration="1000"
//         >
//           {/* Section logo */}
//           <div className="flex items-center justify-center space-x-2 mb-4 lg:mb-[20px]">
//             <hr className="w-[100px] h-[1px] text-[#dedbd4] dark:text-[#3b3b3b]" />
//             <img
//               src="/images/home-1/section-shape1.png"
//               alt="room_section_logo"
//               className="w-[50px] h-[50px]"
//             />
//             <hr className="w-[100px] h-[1px] text-[#dedbd4] dark:text-[#3b3b3b]" />
//           </div>
//           {editButton && (
//             <form className="back-rooms-section-form" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//               />
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//               <button type="submit">Submit</button>
//             </form>
//           )}
//           <div>
//             <h1 className="text-[22px] sm:text-2xl md:text-3xl 2xl:text-[38px] leading-7 sm:leading-8 md:leading-9 lg:leading-[42px] 2xl:leading-[52px] text-lightBlack dark:text-white mb-[6] font-Garamond font-semibold uppercase">
//               {roomSectionData.length > 0 && roomSectionData[0].title}
//             </h1>
//             <p className="font-Lora leading-[26px] text-gray dark:text-lightGray font-normal text-sm sm:text-base mt-[15px] lg:mt-0">
//               {roomSectionData.length > 0 && roomSectionData[0].description}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BackRoomSection;

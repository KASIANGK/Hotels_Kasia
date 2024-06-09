import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useKeenSlider } from "keen-slider/react";
import '../../../style/BackRooms/BackRoomsSlider.css'


const BackRoomsSlider = () => {
  const [roomData, setRoomData] = useState([]);
  const [roomImages, setRoomImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    prix: '',
    category: '',
    m2: '',
    nombre_lits: '',
    rating: ''
  });

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8000/update-room', formData);
      console.log('Room updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };

  return (
    <div className="rooms-slider relative">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder={formData.name} value={formData.name} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label htmlFor="prix">Price</label>
          <input type="text" name="prix" id="prix" placeholder={formData.prix} value={formData.prix} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label htmlFor="category">Category</label>
          <input type="text" name="category" id="category" placeholder={formData.category} value={formData.category} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label htmlFor="m2">Area</label>
          <input type="text" name="m2" id="m2" placeholder={formData.m2} value={formData.m2} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label htmlFor="nombre_lits">Number of Beds</label>
          <input type="text" name="nombre_lits" id="nombre_lits" placeholder={formData.nombre_lits} value={formData.nombre_lits} onChange={handleInputChange} />
        </div>
        <div className="input-group">
          <label htmlFor="rating">Rating</label>
          <input type="text" name="rating" id="rating" placeholder={formData.rating} value={formData.rating} onChange={handleInputChange} />
        </div>

        <button type="submit">Save</button>
      </form>

      <div className="mt-14 2xl:mt-[60px] keen-slider" ref={sliderRef}>
        {/* Affichez les chambres ici */}
      </div>

      {/* Slider Breckpoints */}
      <div className="mx-auto">
        {loaded && instanceRef.current && (
          <div className="dots flex items-center justify-center">
            {/* Affichez les points indicateurs ici */}
          </div>
        )}
      </div>
    </div>
  );
};

export default BackRoomsSlider;







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaStar } from "react-icons/fa";
// import { BsArrowRight } from "react-icons/bs";
// import { Link } from "react-router-dom";
// import { useKeenSlider } from "keen-slider/react";
// // import '../../style/Components/Rooms/RoomsSlider.css'

// const BackRoomsSlider = () => {
//   const [roomData, setRoomData] = useState([]);
//   const [roomImages, setRoomImages] = useState([]);
//   const [formData, setFormData] = useState({
//     // initialisez les propriétés avec les valeurs actuelles
//     // ex: name: ''
//   });

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

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put('http://localhost:8000/update-room', formData);
//       console.log('Room updated successfully:', response.data);
//     } catch (error) {
//       console.error('Error updating room:', error);
//     }
//   };

//   return (
//     <div className="rooms-slider relative">
//       <form onSubmit={handleSubmit}>
//         {/* Affichez les champs de formulaire pour chaque propriété de la chambre */}
//         {/* Assurez-vous de lier les valeurs aux états et d'écouter les changements */}
//         {/* Exemple : */}
//         {/* <input type="text" name="name" value={formData.name} onChange={handleInputChange} /> */}

//         <button type="submit">Save</button>
//       </form>

//       <div className="mt-14 2xl:mt-[60px] keen-slider" ref={sliderRef}>
//         {roomData.map((room, index) => (
//           <div key={index} className="keen-slider__slide number-slide1">
//             {/* ... */}
//           </div>
//         ))}
//       </div>

//       {/* Slider Breckpoints */}
//       <div className="mx-auto">
//         {loaded && instanceRef.current && (
//           <div className="dots flex items-center justify-center">
//             {/* ... */}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BackRoomsSlider;

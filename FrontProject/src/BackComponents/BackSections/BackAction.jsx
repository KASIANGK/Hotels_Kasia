import { BsPlay } from "react-icons/bs";
import { useState, useEffect } from "react";
import FsLightbox from "fslightbox-react";
import axios from 'axios';

const BackAction = () => {
  const [hotelInfo, setHotelInfo] = useState({
    id: 0,
    title: "",
    subtitle: "",
    image: "",
    rating: 0,
    nbre_chambres: 0,
    description: "",
    quote: "",
    managerName: "",
    managerRole: "",
    managerImage: ""
  });
  const [toggler, setToggler] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchHotelInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/hostels/1/'); // Assurez-vous que l'URL correspond
        const hotelData = response.data;

        // Mise à jour de l'état avec les données récupérées
        setHotelInfo({
          ...hotelInfo,
          id: hotelData.id,
          title: hotelData.nom, // Assurez-vous que les champs correspondent
          subtitle: hotelData.subtitle, // Si le champ n'existe pas, laissez vide ou modifiez le modèle
          image: hotelData.image.image, // Accédez à l'image via la relation ForeignKey
          rating: hotelData.rating,
          nbre_chambres: hotelData.nbre_chambres,
          description: hotelData.description, // Assurez-vous que ce champ existe
          quote: hotelData.quote, // Assurez-vous que ce champ existe
          managerName: hotelData.manager.nom, // Accédez au nom du manager
          managerRole: hotelData.manager.role, // Accédez au rôle du manager
          managerImage: hotelData.manager.avatar.image // Accédez à l'image de l'avatar du manager
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des informations de l\'hôtel :', error);
      }
    };

    fetchHotelInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/hostels/${hotelInfo.id}/`, hotelInfo);
      setUpdateSuccess(true);
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations de l\'hôtel :', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelInfo({ ...hotelInfo, [name]: value });
  };

  return (
    <div className="dark:bg-mediumBlack dark:z-[-1]">
      <section className="Container mt-[-90px] dark:z-[1]">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="bg-[#f8f6f3] dark:bg-normalBlack space-y-[14px] flex-1 font-Garamond px-5 sm:px-7 md:px-9 lg:pl-[70px] py-10 md:py-[96px] lg:pr-[70px]" data-aos="fade-up" data-aos-duration="1000">
            <form onSubmit={handleSubmit}>
              <h5 className="text-base text-khaki leading-[26px] font-semibold">
                <input type="text" name="subtitle" value={hotelInfo.subtitle} onChange={handleChange} placeholder="Subtitle" className="input-field" />
              </h5>
              <h1 className="text-[22px] sm:text-2xl md:text-[28px] xl:text-[32px] 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white font-semibold">
                <input type="text" name="title" value={hotelInfo.title} onChange={handleChange} placeholder="Title" className="input-field" />
              </h1>
              <p className="text-sm sm:text-base font-Lora text-gray dark:text-lightGray font-normal leading-[26px]">
                <textarea name="description" value={hotelInfo.description} onChange={handleChange} placeholder="Description" className="input-field"></textarea>
              </p>
              <p className="text-sm sm:text-base font-Lora italic leading-[26px] underline text-gray dark:text-lightGray font-normal ">
                <input type="text" name="quote" value={hotelInfo.quote} onChange={handleChange} placeholder="Quote" className="input-field" />
              </p>
              <div className="flex items-center space-x-6 pt-5">
                <img src={hotelInfo.managerImage} className="w-[65px] h-[65px] object-cover" alt="Manager" />
                <div className="">
                  <h4 className="text-lg sm:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
                    <input type="text" name="managerName" value={hotelInfo.managerName} onChange={handleChange} placeholder="Manager Name" className="input-field" />
                  </h4>
                  <p className="pt-1 text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center font-Lora">
                    <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
                    <input type="text" name="managerRole" value={hotelInfo.managerRole} onChange={handleChange} placeholder="Manager Role" className="input-field" />
                  </p>
                </div>
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Update</button>
            </form>
            {updateSuccess && <p>Update successful!</p>}
          </div>
          <div className="flex-1 h-[100%] w-full relative" data-aos="fade-up" data-aos-duration="1000">
            <img src={hotelInfo.image || "/images/home-1/action-img.png"} className="h-full w-full md:h-[80%] lg:h-full 2xl:h-[99%]" alt="Action" />
            <div className="w-[70px] h-[70px]  text-white absolute top-1/2 md:top-[35%] lg:top-1/2 left-[45%] bg-khaki rounded-full flex items-center justify-center cursor-pointer z-[1] " onClick={() => setToggler(!toggler)}>
              <BsPlay className="w-8 h-8" />
            </div>
            <span className=" top-[47%] md:top-[33%] lg:top-[48%] left-[42%] lg:left-[43.5%] border w-[90px] h-[90px] rounded-full absolute border-white video-animation"></span>
          </div>
          <FsLightbox toggler={toggler} sources={["https://youtu.be/fFDyoI73viQ?si=GbDzAagjoa_0Nv2x"]} />
        </div>
    </section>
</div>
);
};

export default BackAction;





// import { BsPlay } from "react-icons/bs";
// import { useState, useEffect } from "react";
// import FsLightbox from "fslightbox-react";
// import axios from 'axios';

// const BackAction = () => {
//   const [hotelInfo, setHotelInfo] = useState({
//     id: 0,
//     title: "",
//     subtitle: "",
//     image: "",
//     rating: 0,
//     nbre_chambres: 0
//   });
//   const [toggler, setToggler] = useState(false);
//   const [updateSuccess, setUpdateSuccess] = useState(false);

//   useEffect(() => {
//     const fetchHotelInfo = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/hostels/');
//         setHotelInfo(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des informations de l\'hôtel :', error);
//       }
//     };

//     fetchHotelInfo();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.put(`URL_DE_VOTRE_API_POUR_MISE_A_JOUR/${hotelInfo.id}`, hotelInfo);
//       setUpdateSuccess(true);
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour des informations de l\'hôtel :', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setHotelInfo({ ...hotelInfo, [name]: value });
//   };

//   return (
//     <div className="dark:bg-mediumBlack dark:z-[-1]">
//       <section className="Container mt-[-90px] dark:z-[1]">
//         <div className="w-full grid grid-cols-1 lg:grid-cols-2 items-center">
//           <div className="bg-[#f8f6f3] dark:bg-normalBlack space-y-[14px] flex-1 font-Garamond px-5 sm:px-7 md:px-9 lg:pl-[70px] py-10 md:py-[96px] lg:pr-[70px]" data-aos="fade-up" data-aos-duration="1000">
//             <form onSubmit={handleSubmit}>
//               <h5 className="text-base text-khaki leading-[26px] font-semibold">
//                 <input type="text" name="subtitle" value={hotelInfo.subtitle} onChange={handleChange} placeholder="Subtitle" className="input-field" />
//               </h5>
//               <h1 className="text-[22px] sm:text-2xl md:text-[28px] xl:text-[32px] 2xl:text-[38px] leading-[38px] lg:leading-[44px] text-lightBlack dark:text-white font-semibold">
//                 <input type="text" name="title" value={hotelInfo.title} onChange={handleChange} placeholder="Title" className="input-field" />
//               </h1>
//               <p className="text-sm sm:text-base font-Lora text-gray dark:text-lightGray font-normal leading-[26px]">
//                 <textarea name="description" value={hotelInfo.description} onChange={handleChange} placeholder="Description" className="input-field"></textarea>
//               </p>
//               <p className="text-sm sm:text-base font-Lora italic leading-[26px] underline text-gray dark:text-lightGray font-normal ">
//                 <input type="text" name="quote" value={hotelInfo.quote} onChange={handleChange} placeholder="Quote" className="input-field" />
//               </p>
//               <div className="flex items-center space-x-6 pt-5">
//                 <img src={hotelInfo.image} className="w-[65px] h-[65px] object-cover" alt="Hotel" />
//                 <div className="">
//                   <h4 className="text-lg sm:text-[22px] leading-[26px] text-lightBlack dark:text-white font-semibold font-Garamond">
//                     <input type="text" name="managerName" value={hotelInfo.managerName} onChange={handleChange} placeholder="Manager Name" className="input-field" />
//                   </h4>
//                   <p className="pt-1 text-base leading-[26px] font-normal text-gray dark:text-lightGray flex items-center font-Lora">
//                     <span className="w-5 h-[1px] inline-block text-khaki bg-khaki mr-2"></span>
//                     <input type="text" name="managerRole" value={hotelInfo.managerRole} onChange={handleChange} placeholder="Manager Role" className="input-field" />
//                   </p>
//                 </div>
//               </div>
//               <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Update</button>
//             </form>
//             {updateSuccess && <p>Update successful!</p>}
//           </div>
//           <div className="flex-1 h-[100%] w-full relative" data-aos="fade-up" data-aos-duration="1000">
//             <img src="/images/home-1/action-img.png" className="h-full w-full md:h-[80%] lg:h-full 2xl:h-[99%]" alt="" />
//             <div className="w-[70px] h-[70px]  text-white absolute top-1/2 md:top-[35%] lg:top-1/2 left-[45%] bg-khaki rounded-full flex items-center justify-center cursor-pointer z-[1] " onClick={() => setToggler(!toggler)}>
//               <BsPlay className="w-8 h-8" />
//             </div>
//             <span className=" top-[47%] md:top-[33%] lg:top-[48%] left-[42%] lg:left-[43.5%] border w-[90px] h-[90px] rounded-full absolute border-white video-animation"></span>
//           </div>
//           <FsLightbox toggler={toggler} sources={["https://youtu.be/fFDyoI73viQ?si=GbDzAagjoa_0Nv2x"]} />
//         </div>
//     </section>
// </div>
// );
// };

// export default BackAction;
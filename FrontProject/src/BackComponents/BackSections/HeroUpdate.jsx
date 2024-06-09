import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../../style/BackComponents/BackSections/HeroUpdate.css';

const HeroUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [rating, setRating] = useState(0);
  const [hostelImage, setHostelImage] = useState('');
  const [hostel, setHostel] = useState('');
  const [hostels, setHostels] = useState([]);
  const [hostelImages, setHostelImages] = useState([]);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [mode, setMode] = useState('create');
  const [showHostelImages, setShowHostelImages] = useState(false);
  const [selectedHostelImage, setSelectedHostelImage] = useState('');

  useEffect(() => {
    const fetchSlide = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/hero-slides/${id}/`);
        const slide = response.data;
        setTitle(slide.title);
        setSubtitle(slide.subtitle);
        setRating(slide.rating);
        setHostelImage(`http://localhost:8000${slide.hostel_image.image}`);
        setHostel(slide.hostel.id);
      } catch (error) {
        console.error('Erreur lors de la récupération du slide :', error);
      }
    };

    if (id) {
      fetchSlide();
      setMode('update');
    } else {
      setMode('create');
    }
  }, [id]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get('http://localhost:8000/hostels/');
        setHostels(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des hostels :', error);
      }
    };

    fetchHostels();
  }, []);

  useEffect(() => {
    const fetchHostelImages = async () => {
      try {
        if (hostel) {
          const response = await axios.get(`http://localhost:8000/hostel-images/?hostel=${hostel}`);
          console.log('Response:', response.data); // Vérifiez si les données de l'image sont récupérées correctement
          const hostelImagesWithPath = response.data.map((image) => ({
            ...image,
            image: `http://localhost:8000${image.image}`,
            hostel: hostel // Assurez-vous que la propriété "hostel" est correctement définie
          }));
          console.log('Hostel Images with Path:', hostelImagesWithPath); // Vérifiez si les données de l'image sont correctement formatées
          setHostelImages(hostelImagesWithPath);
          // Définir l'image de l'hôtel sélectionné par défaut lors du chargement initial
          if (hostelImagesWithPath.length > 0) {
            setSelectedHostelImage(hostelImagesWithPath[0].image);
          }
        } else {
          setHostelImages([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des images d\'hôtel :', error);
      }
    };
  
    fetchHostelImages();
  }, [hostel]);
  
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('rating', rating);
    formData.append('hostel_image', hostelImage.replace('http://localhost:8000', ''));
    formData.append('hostel', hostel);

    try {
      if (mode === 'update') {
        await axios.put(`http://localhost:8000/hero-slides/${id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else if (mode === 'create') {
        await axios.post('http://localhost:8000/hero-slides/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else if (mode === 'delete') {
        await axios.delete(`http://localhost:8000/hero-slides/${id}/`);
      }
      setUpdateSuccess(true);
      navigate('/');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du slide :', error);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this slide?')) {
      setMode('delete');
      handleSubmit();
    }
  };

  // const selectHostelImage = (imageId) => {
  //   const selectedImage = hostelImages.find(image => image.id === imageId);
  //   if (selectedImage) {
  //     setHostelImage(`http://localhost:8000${selectedImage.image}`);
  //   }
  //   setShowHostelImages(false);
  // };
  
  const selectHostelImage = (hostelId) => {
    const selectedImage = hostelImages.find((image) => image.hostel === hostelId);
    if (selectedImage) {
      setHostelImage(`http://localhost:8000${selectedImage.image}`);
    } else {
      // Si aucune image n'est trouvée pour l'hôtel sélectionné, réinitialiser l'image
      setHostelImage('');
    }
  };
  
  

  return (
    <div className='form-all'>
      <div className='form'>
        <h1>{mode === 'update' ? 'Update Hero Slide' : mode === 'create' ? 'Create Hero Slide' : 'Delete Hero Slide'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
  
          <div className="form-group">
            <label>Subtitle:</label>
            <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required />
          </div>
  
          <div className="form-group">
            <label>Rating:</label>
            <input type="number" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} required />
          </div>
  
          <div className="form-group">
            <label>Hostel:</label>
            <select
              value={hostel}
              onChange={(e) => {
                const selectedHostelId = e.target.value;
                if (selectedHostelId !== hostel) {
                  setHostel(selectedHostelId);
                  // Appeler la fonction selectHostelImage avec l'ID de l'hôtel sélectionné pour mettre à jour hostelImage
                  selectHostelImage(selectedHostelId);
                }
              }}
              required
            >
              <option value="">Select Hostel</option>
              {hostels.map((h) => (
                <option key={h.id} value={h.id}>{h.nom}</option>
              ))}
            </select>

            {/* <select
              value={hostel}
              onChange={(e) => {
                const selectedHostelId = e.target.value;
                if (selectedHostelId !== hostel) {
                  setHostel(selectedHostelId);
                  // Appeler la fonction selectHostelImage avec l'ID de l'hôtel sélectionné pour mettre à jour hostelImage
                  selectHostelImage(selectedHostelId);
                }
              }}
              required
            >
              <option value="">Select Hostel</option>
              {hostels.map((h) => (
                <option key={h.id} value={h.id}>{h.nom}</option>
              ))}
            </select> */}


            <div className='image-hostel-selected'>
              <img src={hostelImage} alt="Selected hostel" style={{ width: '150px', height: '150px' }} />
            </div>

          </div>

  
          <button className='form-btn' type="submit">
            {mode === 'update' ? 'Update' : mode === 'create' ? 'Create' : 'Delete'}
          </button>
  
          {mode === 'update' && <button className='form-btn' type="button" onClick={handleDelete}>Delete</button>}
  
        </form> 
  
        {updateSuccess && <p>Update successful!</p>}
      </div>
    </div>
  );
}

export default HeroUpdate




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import '../../style/BackComponents/BackSections/HeroUpdate.css';

// const HeroUpdate = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [title, setTitle] = useState('');
//   const [subtitle, setSubtitle] = useState('');
//   const [rating, setRating] = useState(0);
//   const [hostelImage, setHostelImage] = useState('');
//   const [hostel, setHostel] = useState('');
//   const [hostels, setHostels] = useState([]);
//   const [hostelImages, setHostelImages] = useState([]);
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [mode, setMode] = useState('create');
//   const [showHostelImages, setShowHostelImages] = useState(false);

//   useEffect(() => {
//     const fetchSlide = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/hero-slides/${id}/`);
//         const slide = response.data;
//         setTitle(slide.title);
//         setSubtitle(slide.subtitle);
//         setRating(slide.rating);
//         setHostelImage(`http://localhost:8000${slide.hostel_image.image}`);
//         setHostel(slide.hostel.id);
//       } catch (error) {
//         console.error('Erreur lors de la récupération du slide :', error);
//       }
//     };

//     if (id) {
//       fetchSlide();
//       setMode('update');
//     } else {
//       setMode('create');
//     }
//   }, [id]);

//   useEffect(() => {
//     const fetchHostels = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/hostels/');
//         setHostels(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des hostels :', error);
//       }
//     };

//     fetchHostels();
//   }, []);

//   useEffect(() => {
//     const fetchHostelImages = async () => {
//       try {
//         if (hostel) {
//           const response = await axios.get(`http://localhost:8000/hostel-images/?hostel=${hostel}`);
//           const hostelImagesWithPath = response.data.map((image) => ({
//             ...image,
//             image: `http://localhost:8000${image.image}`
//           }));
//           setHostelImages(hostelImagesWithPath);
//         } else {
//           setHostelImages([]);
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des images d\'hôtel :', error);
//       }
//     };

//     fetchHostelImages();
//   }, [hostel]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('subtitle', subtitle);
//     formData.append('rating', rating);
//     formData.append('hostel_image', hostelImage.replace('http://localhost:8000', ''));
//     formData.append('hostel', hostel);

//     try {
//       if (mode === 'update') {
//         await axios.put(`http://localhost:8000/hero-slides/${id}/`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       } else if (mode === 'create') {
//         await axios.post('http://localhost:8000/hero-slides/', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       } else if (mode === 'delete') {
//         await axios.delete(`http://localhost:8000/hero-slides/${id}/`);
//       }
//       setUpdateSuccess(true);
//       navigate('/');
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du slide :', error);
//     }
//   };

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this slide?')) {
//       setMode('delete');
//       handleSubmit();
//     }
//   };

// const selectHostelImage = (imageId) => {
//   const selectedImage = hostelImages.find(image => image.id === imageId);
//   if (selectedImage) {
//     setHostelImage(`http://localhost:8000${selectedImage.image}`);
//   }
//   setShowHostelImages(false);
// };

//   return (
//     <div className='form-all'>
//       <div className='form'>
//         <h1>{mode === 'update' ? 'Update Hero Slide' : mode === 'create' ? 'Create Hero Slide' : 'Delete Hero Slide'}</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Title:</label>
//             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//           </div>

//           <div className="form-group">
//             <label>Subtitle:</label>
//             <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required />
//           </div>

//           <div className="form-group">
//             <label>Rating:</label>
//             <input type="number" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} required />
//           </div>

//           <div className="form-group">
//             <label>Hostel:</label>
//             <select 
//               value={hostel} 
//               onChange={(e) => {
//                 setHostel(e.target.value); // Met à jour l'ID de l'hôtel sélectionné
//                 setHostelImage(''); // Réinitialise l'image de l'hôtel lorsqu'un nouvel hôtel est sélectionné
//               }} 
//               required
//             >
//               <option value="">Select Hostel</option>
//               {hostels.map((h) => (
//                 <option key={h.id} value={h.id}>{h.nom}</option>
//               ))}
//             </select>

//           </div>

//           <div className="form-group">
//             <label>Hostel Image:</label>
//             {hostelImage && (
//               <div className='image-hostel-selected'>
//                 <img src={hostelImage} alt="Selected hostel" style={{ width: '150px', height: '150px' }} />
//               </div>
//             )}
//           </div>

//           <button className='form-btn' type="submit">
//             {mode === 'update' ? 'Update' : mode === 'create' ? 'Create' : 'Delete'}
//           </button>

//           {mode === 'update' && <button className='form-btn' type="button" onClick={handleDelete}>Delete</button>}

//         </form> 

//         {updateSuccess && <p>Update successful!</p>}
//       </div>
//     </div>
//   );
// };

// export default HeroUpdate;









//IMAGES OK
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import '../../style/BackComponents/BackSections/HeroUpdate.css';

// const HeroUpdate = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [title, setTitle] = useState('');
//   const [subtitle, setSubtitle] = useState('');
//   const [rating, setRating] = useState(0);
//   const [hostelImage, setHostelImage] = useState('');
//   const [hostel, setHostel] = useState('');
//   const [hostels, setHostels] = useState([]);
//   const [hostelImages, setHostelImages] = useState([]);
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [mode, setMode] = useState('create');
//   const [showHostelImages, setShowHostelImages] = useState(false);

//   useEffect(() => {
//     const fetchSlide = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/hero-slides/${id}/`);
//         const slide = response.data;
//         setTitle(slide.title);
//         setSubtitle(slide.subtitle);
//         setRating(slide.rating);
//         setHostelImage(`http://localhost:8000${slide.hostel_image.image}`);
//         setHostel(slide.hostel.id);
//       } catch (error) {
//         console.error('Erreur lors de la récupération du slide :', error);
//       }
//     };

//     if (id) {
//       fetchSlide();
//       setMode('update');
//     } else {
//       setMode('create');
//     }
//   }, [id]);

//   useEffect(() => {
//     const fetchHostels = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/hostels/');
//         setHostels(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des hostels :', error);
//       }
//     };

//     fetchHostels();
//   }, []);

//   useEffect(() => {
//     const fetchHostelImages = async () => {
//       try {
//         if (hostel) {
//           const response = await axios.get(`http://localhost:8000/hostel-images/?hostel=${hostel}`);
//           const hostelImagesWithPath = response.data.map((image) => ({
//             ...image,
//             image: `http://localhost:8000${image.image}`
//           }));
//           setHostelImages(hostelImagesWithPath);
//         } else {
//           setHostelImages([]);
//         }
//       } catch (error) {
//         console.error('Erreur lors de la récupération des images d\'hôtel :', error);
//       }
//     };

//     fetchHostelImages();
//   }, [hostel]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('subtitle', subtitle);
//     formData.append('rating', rating);
//     formData.append('hostel_image', hostelImage.replace('http://localhost:8000', ''));
//     formData.append('hostel', hostel);

//     try {
//       if (mode === 'update') {
//         await axios.put(`http://localhost:8000/hero-slides/${id}/`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       } else if (mode === 'create') {
//         await axios.post('http://localhost:8000/hero-slides/', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       } else if (mode === 'delete') {
//         await axios.delete(`http://localhost:8000/hero-slides/${id}/`);
//       }
//       setUpdateSuccess(true);
//       navigate('/');
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du slide :', error);
//     }
//   };

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this slide?')) {
//       setMode('delete');
//       handleSubmit();
//     }
//   };

//   const selectHostelImage = (imageId) => {
//     const selectedImage = hostelImages.find(image => image.id === imageId);
//     if (selectedImage) {
//       setHostelImage(selectedImage.image);
//     }
//     setShowHostelImages(false);
//   };

//   return (
//     <div className='form-all'>
//       <div className='form'>
//         <h1>{mode === 'update' ? 'Update Hero Slide' : mode === 'create' ? 'Create Hero Slide' : 'Delete Hero Slide'}</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Title:</label>
//             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//           </div>

//           <div className="form-group">
//             <label>Subtitle:</label>
//             <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required />
//           </div>

//           <div className="form-group">
//             <label>Rating:</label>
//             <input type="number" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} required />
//           </div>

//           <div className="form-group">
//             <label>Hostel:</label>
//             <select value={hostel} onChange={(e) => setHostel(e.target.value)} required>
//               <option value="">Select Hostel</option>
//               {hostels.map((h) => (
//                 <option key={h.id} value={h.id}>{h.nom}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Hostel Image:</label>
//             {hostelImage && (
//               <div className='image-hostel-selected'>
//                 <img src={hostelImage} alt="Selected hostel" style={{ width: '150px', height: '150px' }} />
//               </div>
//             )}
//           </div>

//           <button className='form-btn' type="submit">
//             {mode === 'update' ? 'Update' : mode === 'create' ? 'Create' : 'Delete'}
//           </button>

//           {mode === 'update' && <button className='form-btn' type="button" onClick={handleDelete}>Delete</button>}

//         </form> 

//         {updateSuccess && <p>Update successful!</p>}
//       </div>
//     </div>
//   );
// };

// export default HeroUpdate;




//ok
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import '../../style/BackComponents/BackSections/HeroUpdate.css';

// const HeroUpdate = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [title, setTitle] = useState('');
//   const [subtitle, setSubtitle] = useState('');
//   const [rating, setRating] = useState(0);
//   const [backgroundImage, setBackgroundImage] = useState(null);
//   const [hostelImage, setHostelImage] = useState(null);
//   const [hostel, setHostel] = useState(null);
//   const [hostels, setHostels] = useState([]);
//   const [updateSuccess, setUpdateSuccess] = useState(false);
//   const [mode, setMode] = useState('create');
//   const [showHostelImages, setShowHostelImages] = useState(false);

//   useEffect(() => {
//     const fetchSlide = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/hero-slides/${id}/`);
//         const slide = response.data;
//         setTitle(slide.title);
//         setSubtitle(slide.subtitle);
//         setRating(slide.rating);
//         setHostelImage(slide.hostel_image.id);
//         setHostel(slide.hostel.id);
//       } catch (error) {
//         console.error('Erreur lors de la récupération du slide :', error);
//       }
//     };

//     const fetchHostels = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/hostels/');
//         setHostels(response.data);
//       } catch (error) {
//         console.error('Erreur lors de la récupération des hostels :', error);
//       }
//     };

//     if (id) {
//       fetchSlide();
//       setMode('update');
//     } else {
//       setMode('create');
//     }
//     fetchHostels();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('subtitle', subtitle);
//     formData.append('rating', rating);
//     formData.append('hostel_image', hostelImage);
//     formData.append('hostel', hostel);

//     if (backgroundImage) {
//       formData.append('background_image', backgroundImage);
//     }

//     try {
//       if (mode === 'update') {
//         await axios.put(`http://localhost:8000/hero-slides/${id}/`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       } else if (mode === 'create') {
//         await axios.post('http://localhost:8000/hero-slides/', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//       } else if (mode === 'delete') {
//         await axios.delete(`http://localhost:8000/hero-slides/${id}/`);
//       }
//       setUpdateSuccess(true);
//       navigate('/');
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du slide :', error);
//     }
//   };

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this slide?')) {
//       setMode('delete');
//       handleSubmit();
//     }
//   };

//   const handleBackgroundImageChange = (e) => {
//     setBackgroundImage(e.target.files[0]);
//   };

//   const selectHostelImage = (imageId) => {
//     setHostelImage(imageId);
//     setShowHostelImages(false);
//   };

//   return (
//     <div className='form-all'>
//       <div className='form'>
//         <h1>{mode === 'update' ? 'Update Hero Slide' : mode === 'create' ? 'Create Hero Slide' : 'Delete Hero Slide'}</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Title:</label>
//             <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//           </div>

//           <div className="form-group">
//             <label>Subtitle:</label>
//             <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} required />
//           </div>

//           <div className="form-group">
//             <label>Rating:</label>
//             <input type="number" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} required />
//           </div>

//           <div className="form-group">
//             <label>Hostel:</label>
//             <select value={hostel} onChange={(e) => setHostel(e.target.value)} required>
//               <option value="">Select Hostel</option>
//               {hostels.map((h) => (
//                 <option key={h.id} value={h.id}>{h.nom}</option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label>Hostel Image:</label>
//             <input 
//               type="text" 
//               value={hostelImage} 
//               onClick={() => setShowHostelImages(!showHostelImages)} 
//               readOnly 
//               placeholder="Click to select an image" 
//             />
//             <div className={`form-carousel ${showHostelImages ? 'active' : ''}`}>
//               {hostels.map((image) => (
//                 <div className="form-carousel__item" key={image.id} onClick={() => selectHostelImage(image.id)}>
//                   <div className="form-carousel__item-head">
//                     <img src={image.image_url} alt={`Hostel ${image.id}`} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button className='form-btn' type="submit">
//             {mode === 'update' ? 'Update' : mode === 'create' ? 'Create' : 'Delete'}
//           </button>
//           {mode === 'update' && <button className='form-btn' type="button" onClick={handleDelete}>Delete</button>}
//         </form>
//         {updateSuccess && <p>Update successful!</p>}
//       </div>
//     </div>
//   );
// };

// export default HeroUpdate;




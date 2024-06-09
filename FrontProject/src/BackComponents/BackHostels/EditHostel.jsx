import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../style/BackHostels/EditHostel.css';

const EditHostel = () => {
  const { id } = useParams();
  const [nom, setNom] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(0);
  const [nbreChambres, setNbreChambres] = useState(0);
  const [phone, setPhone] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        // Récupérer les détails de l'hôtel
        const response = await axios.get(`http://localhost:8000/hostels/${id}/`);
        const { nom, location, rating, nbre_chambres, phone } = response.data;
        setNom(nom);
        setLocation(location);
        setRating(rating);
        setNbreChambres(nbre_chambres);
        setPhone(phone);
  
        // Récupérer les images de l'hôtel
        const imageIds = response.data.images;
        const imagesResponse = await axios.get(`http://localhost:8000/hostel-images/?hostel=${imageIds.join(',')}`);
        const imagesData = imagesResponse.data.map(image => {
          return {
            id: image.id,
            url: `http://localhost:8000${image.image}` // Construire l'URL complète de l'image
          };
        });
        setImages(imagesData);
      } catch (error) {
        console.error('Error fetching hostel details:', error);
        setError('Failed to load hostel details.');
      }
    };
  
    fetchHostel();
  }, [id]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requestData = {
      nom,
      location,
      rating,
      nbre_chambres: nbreChambres,
      phone
    };
  
    try {
      await axios.put(`http://localhost:8000/update-hostel/${id}/`, requestData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      navigate('/manage-hostels');
    } catch (error) {
      console.error('Error updating hostel:', error);
      setError('Failed to update hostel.');
    }
  };


  const handleImageOrderChange = (index, direction) => {
    const newImages = [...images]; // Copie des images actuelles
    const imageToMove = newImages[index];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
  
    if (newIndex >= 0 && newIndex < newImages.length) {
      newImages.splice(index, 1); // Suppression de l'image d'origine
      newImages.splice(newIndex, 0, imageToMove); // Insérer l'image à la nouvelle position
      setImages(newImages); // Mettre à jour le state avec le nouvel ordre des images
    }
  };
  

  // const handleChambreDescriptionChange = (index, description) => {
  //   const newChambres = [...chambres]; // Copie des chambres actuelles
  //   newChambres[index].description = description; // Mise à jour de la description de la chambre
  //   setChambres(newChambres); // Mettre à jour le state avec la nouvelle description de la chambre
  // };

  

  // const handleServiceDescriptionChange = (index, description) => {
  //   const newServices = [...services]; // Copie des services actuels
  //   newServices[index].description = description; // Mise à jour de la description du service
  //   setServices(newServices); // Mettre à jour le state avec la nouvelle description du service
  // };

  return (
    <div className='edit-hostel-all'>
      <div className='edit-hostel'>
        <h1>Edit Hostel</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nom: </label>
            <span>{nom}</span>
            <input type="text" value={nom || ''} onChange={(e) => setNom(e.target.value)} placeholder="Nom" />
          </div>
          <div>
            <label>Location: </label>
            <span>{location}</span>
            <input type="text" value={location || ''} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
          </div>
          <div>
            <label>Rating: </label>
            <span>{rating}</span>
            <input type="number" value={rating || ''} onChange={(e) => setRating(e.target.value)} placeholder="Rating" />
          </div>
          <div>
            <label>Nombre de chambres: </label>
            <span>{nbreChambres}</span>
            <input type="number" value={nbreChambres || ''} onChange={(e) => setNbreChambres(e.target.value)} placeholder="Nombre de chambres" />
          </div>
          <div>
            <label>Phone: </label>
            <span>{phone}</span>
            <input type="text" value={phone || ''} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
          </div>
          <div>
            <label>Images: </label>
            <div className='edit-hostel-images'>
              {images && images.map((image, index) => (
                <img key={index} src={image.url} alt={`Image ${index + 1}`} />
              ))}
            </div>
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="edit-hostel-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditHostel;






















// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';
// import '../../style/BackHostels/EditHostel.css';

// const EditHostel = () => {
//   const { id } = useParams();
//   const [nom, setNom] = useState('');
//   const [location, setLocation] = useState('');
//   const [rating, setRating] = useState(0);
//   const [nbreChambres, setNbreChambres] = useState(0);
//   const [phone, setPhone] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHostel = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/hostels/${id}/`);
//         const { nom, location, rating, nbre_chambres, phone } = response.data;
//         setNom(nom);
//         setLocation(location);
//         setRating(rating);
//         setNbreChambres(nbre_chambres);
//         setPhone(phone);
//       } catch (error) {
//         console.error('Error fetching hostel:', error);
//         setError('Failed to load hostel details.');
//       }
//     };

//     fetchHostel();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const requestData = {
//       nom,
//       location,
//       rating,
//       nbre_chambres: nbreChambres,
//       phone
//     };
  
//     try {
//       await axios.put(`http://localhost:8000/hostels/${id}/`, requestData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//       navigate('/manage-hostels');
//     } catch (error) {
//       console.error('Error updating hostel:', error);
//       setError('Failed to update hostel.');
//     }
//   };
  

//   return (
//     <div className='edit-hostel-all'>
//       <div className='edit-hostel'>
//         <h1>Edit Hostel</h1>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Nom: </label>
//             <span>{nom}</span>
//             <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom" />
//           </div>
//           <div>
//             <label>Location: </label>
//             <span>{location}</span>
//             <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
//           </div>
//           <div>
//             <label>Rating: </label>
//             <span>{rating}</span>
//             <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" />
//           </div>
//           <div>
//             <label>Nombre de chambres: </label>
//             <span>{nbreChambres}</span>
//             <input type="number" value={nbreChambres} onChange={(e) => setNbreChambres(e.target.value)} placeholder="Nombre de chambres" />
//           </div>
//           <div>
//             <label>Phone: </label>
//             <span>{phone}</span>
//             <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
//           </div>
//           {error && <p className="error">{error}</p>}
//           <button type="submit" className="edit-hostel-btn">Update</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditHostel;




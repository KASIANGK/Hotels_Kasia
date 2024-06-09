import React, { useState } from 'react';
import axios from 'axios';

const CreateHostel = () => {
  const [formData, setFormData] = useState({
    nom: '',
    image: null, // Utilisez un champ de type "file" pour les images
    rating: 0,
    nbre_chambres: 0,
    phone: ''
    // Ajoutez les autres champs ici
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/create-hostel/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Hostel created successfully', response.data);
      // Redirigez l'utilisateur vers une autre page après la création réussie si nécessaire
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data);
      } else {
        console.error('Error creating hostel:', error);
      }
    }
  };

  return (
    <div className="create-hostel">
      <h1>Create Hostel</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required // Champ obligatoire
          />
          {errors.nom && <span className="error">{errors.nom}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
          />
          {errors.image && <span className="error">{errors.image}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required // Champ obligatoire
          />
          {errors.rating && <span className="error">{errors.rating}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="nbre_chambres">Nombre de chambres:</label>
          <input
            type="number"
            id="nbre_chambres"
            name="nbre_chambres"
            value={formData.nbre_chambres}
            onChange={handleChange}
            required // Champ obligatoire
          />
          {errors.nbre_chambres && <span className="error">{errors.nbre_chambres}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Téléphone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required // Champ obligatoire
          />
          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        {/* Ajoutez d'autres champs ici */}
        <button type="submit">Create Hostel</button>
      </form>
    </div>
  );
};

export default CreateHostel;






// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const CreateHostel = () => {
//   const [nom, setNom] = useState('');
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('nom', nom);
//     formData.append('image', image);

//     try {
//       await axios.post('http://localhost:8000/create-hostel/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       navigate('/manage-hostels');
//     } catch (error) {
//       console.error('Error creating hostel:', error);
//     }
//   };

//   return (
//     <div className="create-hostel">
//       <h1>Create Hostel</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Nom</label>
//           <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
//         </div>
//         <div>
//           <label>Image</label>
//           <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//         </div>
//         <button type="submit" className="submit-btn bg-green-500 text-white px-4 py-2 rounded">Create</button>
//       </form>
//     </div>
//   );
// };

// export default CreateHostel;

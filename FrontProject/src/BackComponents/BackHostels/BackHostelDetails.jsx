import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../style/BackHostels/BackHostelDetails.css'
import { Link } from 'react-router-dom';

const BackHostelDetails = () => {
  const { id } = useParams();
  const [hostel, setHostel] = useState(null);
  const [images, setImages] = useState([]);
  const [hostels, setHostels] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:8000/hostels/${id}/`)
      .then(response => {
        setHostel(response.data);
        const imageIds = response.data.images;
        axios.get(`http://localhost:8000/hostel-images/?hostel=${imageIds.join(',')}`)
          .then(imagesResponse => {
            setImages(imagesResponse.data);
          })
          .catch(error => {
            console.error('Error fetching hostel images:', error);
          });
      })
      .catch(error => {
        console.error('There was an error fetching the hotel details!', error);
      });
  }, [id]);

  if (!hostel) {
    return <div>Loading...</div>;
  }


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/hostels/${id}/`);
      setHostels(hostels.filter(hostel => hostel.id !== id));
    } catch (error) {
      console.error('Error deleting hostel:', error);
    }
  };


  return (
    <div className='hostel-details'>
      <h1>{hostel.nom}</h1>
      <div className='images-hd'>
        {images.map(image => (
          <img key={image.id} src={`http://localhost:8000/${image.image}`} alt={hostel.nom} />
        ))}
      </div>
      <p>Number of rooms: {hostel.chambres.length}</p>
      <h2>Rooms:</h2>
       <div>
         {hostel.chambres.map(chambre => (
          <div key={chambre.id}>
            <h3>{chambre.nom}</h3>
            {chambre.image_url && <img src={chambre.image_url} alt={chambre.nom} />}
            <p>Description: {chambre.description}</p>
          </div>
        ))}
      </div>
      <h2>Services:</h2>
      <div className='hostel-details-img'>
        {hostel.service.map(service => (
          <div key={service.id}>{service.titre}</div>
        ))}
      </div>
      <h2>Rating:</h2>
      <p>Rating: {hostel.rating} </p>
      <div className="hostel-details-manage">
        <Link to={`/edit-hostel/${hostel.id}`}>
          <button className="hostel-details-manage-btn bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
        </Link>
        <button onClick={() => handleDelete(hostel.id)} className="hostel-details-manage-btn bg-red-500 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </div>
  );
};

export default BackHostelDetails;





// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import '../../style/BackHostels/BackHostelDetails.css'

// const BackHostelDetails = () => {
//   const { id } = useParams();
//   const [hostel, setHostel] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:8000/hostels/${id}/`)
//       .then(response => {
//         setHostel(response.data);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the hotel details!', error);
//       });
//   }, [id]);

//   if (!hostel) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className='hostel-details'>
//       <h1>{hostel.nom}</h1>
//       <img src={hostel.image} alt={hostel.nom} />
//       <p>Number of rooms: {hostel.chambres.length}</p>
//       <h2>Rooms:</h2>
//       <div>
//         {hostel.chambres.map(chambre => (
//           <div key={chambre.id}>
//             <h3>{chambre.nom}</h3>
//             {chambre.image_url && <img src={chambre.image_url} alt={chambre.nom} />}
//             <p>Description: {chambre.description}</p>
//           </div>
//         ))}
//       </div>
//       <h2>Services:</h2>
//       <div className='hostel-details-img'>
//         {hostel.service.map(service => (
//           <div key={service.id}>{service.titre}</div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BackHostelDetails;

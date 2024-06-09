import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../style/BackHostels/ManageHostels.css';

const ManageHostels = () => {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get('http://localhost:8000/hostels/');
        console.log('API Response:', response.data);
        setHostels(response.data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };

    fetchHostels();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/hostels/${id}/`);
      setHostels(hostels.filter(hostel => hostel.id !== id));
    } catch (error) {
      console.error('Error deleting hostel:', error);
    }
  };

  return (
    <div className="manage-hostels">
      <div className="manage">
        <h1>Manage Hostels</h1>
        <Link to="/create-hostel">
          <button className="manage-btn">Add Hostel</button>
        </Link>
        <div className={`manage-carousel ${hostels.length > 0 ? 'active' : ''}`}>
          {hostels.length === 0 ? (
            <p>No hostels available.</p>
          ) : (
            hostels.map(hostel => (
              <div key={hostel.id} className="manage-carousel__item">
                <Link to={`/backhostelsdetails/${hostel.id}`} className="hotel-link">
                  <div className="manage-carousel__item-head">
                    <img src={hostel.image_url} alt={hostel.nom} />
                  </div>
                </Link>
                <div className="manage-carousel__item-info">
                  <Link to={`/backhostelsdetails/${hostel.id}`} className="hotel-link">
                    <span className="manage-carousel__item-name">{hostel.nom}</span>
                  </Link>
                  <div className="manage-carousel__item-actions">
                    <Link to={`/edit-hostel/${hostel.id}`}>
                      <button className="manage-btn bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(hostel.id)} className="manage-btn bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageHostels;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import '../../style/BackHostels/ManageHostels.css';

// const ManageHostels = () => {
//   const [hostels, setHostels] = useState([]);

//   useEffect(() => {
//     const fetchHostels = async () => {
//       try {
//         const response = await axios.get('http://localhost:8000/hostels/');
//         console.log('API Response:', response.data);
//         setHostels(response.data);
//       } catch (error) {
//         console.error('Error fetching hostels:', error);
//       }
//     };

//     fetchHostels();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8000/hostels/${id}/`);
//       setHostels(hostels.filter(hostel => hostel.id !== id));
//     } catch (error) {
//       console.error('Error deleting hostel:', error);
//     }
//   };

//   return (
//     <div className="manage-hostels">
//       <div className="manage">
//         <h1>Manage Hostels</h1>
//         <Link to="/create-hostel">
//           <button className="manage-btn">Add Hostel</button>
//         </Link>
//         <div className={`manage-carousel ${hostels.length > 0 ? 'active' : ''}`}>
//           {hostels.length === 0 ? (
//             <p>No hostels available.</p>
//           ) : (
//             hostels.map(hostel => (
//               <div key={hostel.id} className="manage-carousel__item">
//                 <Link to={`/edit-hostel/${hostel.id}`} className="hotel-link">
//                   <div className="manage-carousel__item-head">
//                     <img src={hostel.image_url} alt={hostel.nom} />
//                   </div>
//                 </Link>
//                 <div className="manage-carousel__item-info">
//                   <span className="manage-carousel__item-name">{hostel.nom}</span>
//                   <div className="manage-carousel__item-actions">
//                     <Link to={`/edit-hostel/${hostel.id}`}>
//                       <button className="manage-btn bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
//                     </Link>
//                     <button onClick={() => handleDelete(hostel.id)} className="manage-btn bg-red-500 text-white px-4 py-2 rounded">Delete</button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageHostels;


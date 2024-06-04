// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('access_token'));

//   useEffect(() => {
//     const token = localStorage.getItem('access_token');
//     if (token) {
//       axios.get("http://127.0.0.1:8000/get_user", {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       }).then((response) => {
//         if (response.data.status === 'success') {
//           setUserData(response.data.user_data);
//           console.log("User data updated:", response.data.user_data);
//         }
//       }).catch(error => {
//         console.error('Error fetching user data:', error);
//       });
//     }
//   }, []);

//   return (
//     <UserContext.Provider value={{ userData, setUserData, token, setToken }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'; 

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      axios.get("http://127.0.0.1:8000/get_user", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }).then((response) => {
        if (response.data.status === 'success') {
          setUserData(response.data.user_data);
          console.log("User data updated:", response.data.user_data); // Add this console.log to check user data
        }
      }).catch(error => {
        console.error('Error fetching user data:', error);
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

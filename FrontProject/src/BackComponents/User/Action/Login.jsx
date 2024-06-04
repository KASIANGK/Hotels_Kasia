import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../../../Router/Router'; // Assurez-vous que ce chemin est correct



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();
  
    const login = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/connexion/",  { username, password });        
        if (response.status === 200) {
          const { access_token } = response.data;
          localStorage.setItem('access_token', access_token);
          const userResponse = await axios.get('http://127.0.0.1:8000/get_user', {
            headers: { Authorization: `Bearer ${access_token}` }
          });
          setUserData(userResponse.data.user_data);
          navigate('/');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };
  
    return (
      <div>
        <input type="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <button onClick={login}>Login</button>
      </div>
    );
  };
  
  export default Login;
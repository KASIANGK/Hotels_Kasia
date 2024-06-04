import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { UserContext } from '../../../Router/Router';

const Login = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const { setUserData } = useContext(UserContext);
        const navigate = useNavigate();
      
        const login = async () => {
          try {
            const response = await axios.post("http://127.0.0.1:8000/connexion/", { username, password });
            if (response.status === 200) {
              const { access_token, redirect_url } = response.data;
              localStorage.setItem('access_token', access_token);
              const userResponse = await axios.get('http://127.0.0.1:8000/get_user', {
                headers: { Authorization: `Bearer ${access_token}` }
              });
              setUserData(userResponse.data.user_data);
              navigate(redirect_url);
            }
          } catch (error) {
            console.error('Error during login:', error);
          }
        };
      
        return (
          <form>
            <input type="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="button" onClick={login}>Login</button>
          </form>
        );
      };
      
    export default Login

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../../src/Router/Router';
import '../../../style/User/Action/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setUserData } = useContext(UserContext);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const login = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/connexion/", { username, password });
            if (response.status === 200) {
                const { access_token } = response.data;
                localStorage.setItem('access_token', access_token);
                setUserData({ username });
                navigate('/');
                console.log("Utilisateur connecté");
            }
        } catch (error) {
            setError('Nom d\'utilisateur ou mot de passe incorrect.');
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="login-all">
            <div className="login">
                <h1>Connexion</h1>
                <form>
                    <input 
                        type="text" 
                        value={username} 
                        onChange={handleUsernameChange} 
                        placeholder="Username" 
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={handlePasswordChange} 
                        placeholder="Password" 
                    />
                    {error && <p className="error">{error}</p>}
                    <button 
                        type="button" 
                        onClick={login} 
                        className="login-btn"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;



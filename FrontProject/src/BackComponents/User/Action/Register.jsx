import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../../src/style/User/Action/Register.css'
// import '../../../style/Users/Actions/Register.css'; // Assurez-vous d'importer le fichier CSS ici
// import subscribeVideo from '../../../assets/NETFLIX.mp4'; // Corriger l'importation de la vidéo

function Register() {
    const nav = useNavigate();

    const [formdata, setFormdata] = useState({
        username: "",
        password: "",
        email: "",
        avatar: ""
    });

    const [avatars, setAvatars] = useState([]);
    const [error, setError] = useState("");
    const [showAvatars, setShowAvatars] = useState(false);

    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/avatars/');
                console.log('reponse', response.data);
                setAvatars(response.data);
            } catch (error) {
                console.error('Error fetching avatars:', error);
            }
        };
        fetchAvatars();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormdata({ ...formdata, [name]: value });
    };

    const selectAvatar = (avatarId) => {
        setFormdata({ ...formdata, avatar: avatarId });
        setShowAvatars(false);
    };

    const inscription = async (e) => {
        e.preventDefault();
        // Vérifier que les champs requis sont remplis
        if (!formdata.username || !formdata.password || !formdata.email || !formdata.avatar) {
            setError("Veuillez remplir tous les champs.");
            return;
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/register/', formdata);
            if (response.data.status === 'success') {
                nav('/');
            } else if (response.data.status === 'already_exist') {
                setError(response.data.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setError("Ooops something went wrong");
        }
    };

    return (
        <div className='register-all'>
            <div className='register'>
                <h1>Inscription</h1>
                <form onSubmit={inscription}>
                    {/* <label htmlFor="username">Username</label> */}
                    <input type="text" name="username" value={formdata.username} onChange={handleChange} placeholder="Nom d'utilisateur" />

                    {/* <label htmlFor="password">Password</label> */}
                    <input type="password" name="password" value={formdata.password} onChange={handleChange} placeholder="Mot de passe" />

                    {/* <label htmlFor="email">Email</label> */}
                    <input type="email" name="email" value={formdata.email} onChange={handleChange} placeholder="Adresse email" />

                    {/* <label htmlFor="age">Age</label> */}

                    {/* <label htmlFor="avatar">Avatar</label> */}
                    <div className="avatar-input">
                        <input type="text" name="avatar" value={formdata.avatar} onChange={handleChange} onClick={() => setShowAvatars(!showAvatars)} readOnly placeholder="Choisir un Avatar" />
                        <div className={`carousel ${showAvatars ? 'active' : ''}`}>
                            {avatars.map((avatar, index) => (
                                <div className="carousel__item" key={avatar.id} onClick={() => selectAvatar(avatar.id)}>
                                    <div className="carousel__item-head">
                                        <img src={avatar.image_url} alt={avatar.name} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {error && <p style={{color: 'red'}}>{error}</p>}

                    <button className="register-btn" type="submit">Inscription</button>
                </form>
            </div>

            {/* <div className='video-container'>
                <video src={subscribeVideo} controls autoPlay loop muted></video>               
            </div> */}

        </div>
    );
}

export default Register;

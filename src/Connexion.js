import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import { ForumState } from './ForumContext';
import { useNavigate } from 'react-router-dom';

const Connexion = () => {

    const history = useNavigate();
    const handleConnexion = (name, password) =>
    {
        let seen = [];
        const requestContent = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    name: name,
                    password: password,
                },
                (key, val) => {
                    if (val != null && typeof val == "object") {
                        if (seen.indexOf(val) >= 0) {
                            return;
                        }
                        seen.push(val);
                    }
                    return val;
                }
            )
        };

        fetch("/user/login", requestContent).then((res) => {
            setUserToken(res.headers.get('auth-token'));
            return res.json();
        })
        .then((res) => 
        {
            setUserName(res.name)
            history('/');
        })
        .catch((err) => console.log(err));
        
    };


    const [ name, setName ] = useState("");
    const [ password, setPasseword ] = useState("");
    const { setUserToken, setUserName } = ForumState();
    
    return (
        <>
        <Navbar is_connexionPage={true}/>
        <div className="connexion-container">
            <div className="connexion-content">
                <h2>Se connecter</h2>
                <p>Nom utilisateur</p>
                <input value={name} onChange={(event) => setName(event.target.value)} type="text" placeholder='tigrou31'/>

                <p>Mot de passe</p>
                <input value={password} onChange={(event) => setPasseword(event.target.value)} type="password" placeholder='*****' />
                <Link to="/forgot">Mot de passe oublie</Link>
                <button className="connexion-btn" onClick={() => handleConnexion(name, password)}>Connexion</button>
            </div>
        </div>
        </>
    );
}
 
export default Connexion;

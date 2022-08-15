import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Navbar';
import { Navigate } from 'react-router-dom';

const SignIn = () => {

    const history = useNavigate();

    const handleSignIn = (name, email, password) =>
    {
        let seen = [];
        const requestContent = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    name: name,
                    email: email,
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

        fetch("/user/register", requestContent).then((_) => history('/connexion'))
            .catch((err) => console.log(err));
    };

    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPasseword ] = useState("");
    const [ confirmePassword, setConfirmePasseword ] = useState("");
    return (
        <>
        <Navbar/>
        <div className="connexion-container">
            <div className="connexion-content">
                <h2>Creer un compte</h2>
                <p>Nom utilisateur</p>
                <input value={name} onChange={(event)=> setName(event.target.value)} type="text" placeholder='tigrou31'/>


                <p>Addresse mail</p>
                <input value={email} onChange={(event)=> setEmail(event.target.value)} type="text" placeholder='tigrou31@gmail.com'/>

                <p>Mot de passe</p>
                <input value={password} onChange={(event)=> setPasseword(event.target.value)} type="password" placeholder='*****' />


                <p>Confimer mot de passe</p>
                <input value={confirmePassword} onChange={(event)=> setConfirmePasseword(event.target.value)}  type="password" placeholder='*****' />

                <button className="connexion-btn" onClick={() => password === confirmePassword && handleSignIn(name, email, password)}>Creer</button>
            </div>
        </div>
        </>
    );
}
 
export default SignIn;

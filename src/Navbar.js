import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ForumState } from './ForumContext';
import { Navigate } from 'react-router-dom';

const Navbar = ({is_connexionPage}) => {
    if (is_connexionPage === undefined)
        is_connexionPage = false;

    const history = useNavigate();
  const { userToken, setUserToken } = ForumState();
  const [userConnected, setUserConnected] = useState(false);

  const checkUserConnected = () =>
  {
    if (userToken === null || userToken == undefined)
    {
      setUserToken(false);
      return;
    }
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('auth-token', userToken);

    fetch("/user/is-connected",
    {
      method: 'GET',
      headers: myHeaders
    }).then((res) => {
        if (res.status === 200)
            setUserConnected(true);
        else
            setUserConnected(false);
    }).catch(setUserConnected(false))
  };
    const handleDeconnexion = () =>
    {
        console.log("connected " + userConnected)
        if (userConnected)
        {
            setUserToken(null);
            history('/');
        }
    }

    useEffect(checkUserConnected, [userToken]);
    return (
        <div className="container">
            <nav className="navbar">
                <Link to="/" style={{textDecoration: 'none'}}>
                    <h4 id='logo'>MCS</h4>
                </Link>
                <Link to={`/${is_connexionPage && !userConnected ? "Sign-in" :  !userConnected ? "connexion" : "/"}`}>
                    <button onClick={handleDeconnexion} id="connection-btn">{is_connexionPage && !userConnected ? "Cree un compte" : !userConnected ? "Se connecter" : "Se deconnecter"}</button>
                </Link>
            </nav>
        </div>
    );
}
 
export default Navbar;

import { Link, useNavigate } from 'react-router-dom'
import Navbar from "./Navbar";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ForumState } from './ForumContext';

const CreatePost = () => {

    const history = useNavigate();
    const { userToken, userName } = ForumState();
    const handleClick = async (title, content, category) =>
    {

        var seen = [];
        const requestContent = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token': userToken
            },
            body: JSON.stringify(
                {
                    author: userName,
                    title: title,
                    content: content,
                    category: category,
                    responces: []
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
        await fetch("/posts/create-new-post", requestContent).then((_) => {
            history('/')
            history(0);
        });
    }
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    return (
        <>
            <Navbar buttonValue={"Se connecter"} linkValue={"connexion"} />
            <div className="create-post-container">
                <h2>Creation du post</h2>
                <p>Titre</p>
                <input value={title} onChange={(event) => setTitle(event.target.value)} type="text" placeholder="Bons plans d'Italie" />

                <p>Contenue</p>
                <textarea value={content} onChange={(event) => setContent(event.target.value)}/>
                <Link to='/'>
                    <button id='create-post-btn' onClick={() => handleClick(title, content, "Voyage")}>Creer</button>
                </Link>
            </div>
        </>
        
    );
}
 
export default CreatePost;

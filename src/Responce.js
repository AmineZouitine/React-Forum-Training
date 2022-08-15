import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ForumState } from './ForumContext';

const Responce = ({id_}) => {
    
    const history = useNavigate();
    const { userToken, userName } = ForumState();
    const handleClick = async (content) =>
    {
        if (!userToken)
            return;
        
        var seen = [];
        const requestContent = {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'auth-token': userToken
            },
            body: JSON.stringify(
                {
                    name: userName,
                    content: content,
                    _id: id_,
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
        await fetch("/posts/add-comment", requestContent).then((_) => history(0)).catch(err => console.log(err));
    }
    
    const [ content, setContent ] = useState("");

    return (
        <div className="responce-container">
            <h2>Ajouter un commentaire</h2>
            <textarea value={content} onChange={(event) => setContent(event.target.value)}/>
            <button onClick={() => handleClick(content)}>Poster</button>
        </div>
    );
}
 
export default Responce;

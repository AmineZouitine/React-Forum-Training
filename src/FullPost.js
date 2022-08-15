import { useLocation, useParams } from "react-router-dom";
import Message from "./Message";
import Navbar from "./Navbar";
import Responce from "./Responce";

const FullPost = () => {
  const post = useLocation().state;

  const {
    _id,
    author,
    title,
    content,
    last_update,
    response_number,
    category,
    responces,
  } = post;
  return (
    <>
      <Navbar buttonValue={"Se connecter"} linkValue={"connexion"} />
      <div className="full-post-container">
        <h2>{title}</h2>
        <div className="topic-container">
          <p>{author}</p>
          <p>{content}</p>
        </div>
        {responces.map((responce) => (
          <Message responce={responce} key={responce.id} />
        ))}
        <div className="line" />
        <Responce id_={_id} />
      </div>
    </>
  );
};

export default FullPost;

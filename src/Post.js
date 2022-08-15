import { Link } from 'react-router-dom';

const appendLeadingZeroes = (value) => {
    if (value <= 9) {
        return "0" + value;
    }
    return value;
}

const convertDate = (date) =>
{
  let current_datetime = new Date(date)
  let formatted_date = current_datetime.getFullYear() + "-" + appendLeadingZeroes(current_datetime.getMonth() + 1) + "-" + appendLeadingZeroes(current_datetime.getDate()) + " " + appendLeadingZeroes(current_datetime.getHours()) + ":" + appendLeadingZeroes(current_datetime.getMinutes()) + ":" + appendLeadingZeroes(current_datetime.getSeconds());
  return formatted_date;
}

const Post = ({post}) => {
    const { _id, author, title, content, last_update, category, responces } = post;
    const date = convertDate(last_update);
    const smiley = ['🔥','😉', '😈', '🥰', '🚀'];
    return ( 
        <Link to={`/posts/${_id}`} state={post} className="post-link" style={{textDecoration: 'none'}}>
           <div className="post-container">
            <p>{smiley[Math.floor(Math.random()*smiley.length)]}</p>
            <p>{title.length < 50 ? title : title.substring(0, 50) + "..."}</p>
            <p >{author}</p>
            <p >{responces.length}</p>
            <p>{date}</p>
           </div>
        </Link>
    );
}
 
export default Post;

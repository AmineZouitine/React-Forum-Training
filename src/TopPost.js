import { Link } from "react-router-dom";

const TopPost = ({ posts }) => {
  return (
    <div className="container-top-post">
      <div className="container-top-title">
        <h3>TOP POSTS</h3>
      </div>
      {posts.map((post, index) => {
        if (index > 7) return;
        const {
          _id,
          author,
          title,
          content,
          last_update,
          category,
          responces,
        } = post;
        return (
          <Link
            to={`/posts/${_id}`}
            state={post}
            style={{ textDecoration: "none" }}
            key={_id}
          >
            <div className="container-post">
              <p>✨</p>
              <p>{title}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default TopPost;

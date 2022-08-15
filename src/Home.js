import ForumHeader from "./ForumHeader";
import Post from "./Post";
import SearchPanel from "./SearchPanel";
import { useState } from "react";
import TopPost from "./TopPost";
import Categories from "./Categories";
import { useEffect } from "react";

const Home = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [posts, setPost] = useState(data);

  const handleSearch = (event) => {
    let searchValue = event.target.value.toLowerCase();
    setPost(
      data.filter((post) => {
        return (
          post.author.toLowerCase().includes(searchValue) ||
          post.title.toLowerCase().includes(searchValue)
        );
      })
    );
  };

  const handleNextPostPage = () => {
    if ((currentPage + 1) * 10 < posts.length) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPostPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  let pageCount = 0;
  return (
    <main id="home">
      <div className="home-container">
        <div className="forum-list">
          <SearchPanel
            search={handleSearch}
            next={handleNextPostPage}
            previous={handlePreviousPostPage}
          />
          <ForumHeader />
          {posts.map((post, index) => {
            if (currentPage * 10 > index || pageCount >= 10) return;
            pageCount++;
            return <Post post={post} current={currentPage} key={post._id} />;
          })}
        </div>
        <div className="forum-right">
          <div className="categories">
            <Categories />
          </div>
          <div className="forum-top-post">
            <TopPost posts={posts} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;

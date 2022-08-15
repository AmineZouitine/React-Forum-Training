import Home from "./Home";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { useState, useEffect } from 'react';
import { ForumState } from './ForumContext';

function App() {

  const [data, setData] = useState(null);

  const fetchData = () =>
  {
      fetch("/posts")
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }

  useEffect(fetchData ,[]);

  return (
    <>
      <Navbar/>
      {data === null ? <Loading /> : <Home data={data}/>}
    </>
  );
}

export default App;

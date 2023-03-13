import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Navbar from './components/Navbar';
import Post from './components/Post';
import AuthorDetail from './components/AuthorDetail';

function App() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState(null);
  const handleSearch = (event) => {
    setQuery(event.target.value);
    fetch(`/api/search/${query}`)
      .then(response => response.json())
      .then(data => setArticles(data.articulos))
      .catch(error => console.log('Error in search query:', error));
  }
  useEffect(() => {
    console.log(articles);
  }, [articles]);
  return (
    <>
      <Router>
        <Navbar onSearch={handleSearch} />
        <Routes>
          {!articles || query === ""
            ? (<Route exact path="/" element={<Home />} />)
            : (<Route exact path="/" element={<Home articles={articles} />} />)
          }
          <Route path="/author" element={<AuthorDetail />} />
          <Route path="/post" element={<Post />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

import LatestArticles from './LatestArticles';
import SearchResult from './SearchResult';

function Home({ articles }) {

  return (
    <>
      {articles ? <SearchResult articles={articles} /> : <LatestArticles />}
    </>
  );
}

export default Home;

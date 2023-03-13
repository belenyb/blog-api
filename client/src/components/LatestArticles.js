import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ArticlesList() {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    fetch("/api/articles/latest")
      .then((res) => res.json())
      .then((data) => setArticles(data.articles));
  }, []);

  return (
    <div className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Últimas noticias</h2>
        </div>
        <div className="mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 sm:mt-4 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {
            !articles ? "Loading..."
              : articles.map(article => (
                <article key={article._id} className="flex max-w-xl flex-col items-start justify-between">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time dateTime={article.date} className="text-gray-500">
                      {article.date}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <a href="#">
                        <span className="absolute inset-0" />
                        {article.title}
                      </a>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">{article.content}</p>
                  </div>
                  <div className="relative mt-4 flex items-center gap-x-4">
                    <img src="https://avatars.githubusercontent.com/u/59170344?v=4" alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <Link to="/author">
                          <span className="absolute inset-0" />
                          Belén Yarde Buller
                        </Link>
                      </p>
                      <p className="text-gray-600">Editor</p>
                    </div>
                  </div>
                </article>
              ))
          }
        </div>
      </div>
    </div>


  );
}

export default ArticlesList;

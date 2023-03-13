// import { useEffect, useState } from 'react';

export default function SearchBar({onSearch}) {
  // const [query, setQuery] = useState("");
  // const [articles, setArticles] = useState(null);
  // const handleKeyDown = (event) => {
  //   setQuery(event.target.value);
  //   // if (event.key === 'Enter') {
  //     fetch(`/api/search/${query}`)
  //     .then((res) => res.json())
  //     .then((data) => setArticles(data.articulos));
  //   // }
  // }
  // useEffect(() => {}, [articles]);
  return (
    <div className="relative rounded-md shadow-sm">
      <input onKeyDown={onSearch} type="text" name="price" id="price" className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Buscar..." />
      <div className="absolute inset-y-0 right-0 px-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </div>
    </div>
  )
}

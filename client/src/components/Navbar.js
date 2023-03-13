import { useLocation, useNavigate, Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Navbar({onSearch}) {
  const location = useLocation();
  const navigate = useNavigate();
  const showGoBackButton = location.pathname !== "/";
  const getTitle = () => {
    switch (location.pathname) {
      case "/author":
        return "Autor"

      case "/post":
        return "Publicar"

      default:
      return "Artículos"
    }
  }
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              {
                !showGoBackButton
                  ? <>
                    <img className="block h-6 w-6 lg:hidden" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                    <img className="hidden h-6 w-6 lg:block" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" />
                  </>
                  : <button className="h-6 w-6" onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-slate-50 stroke-1">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>

                  </button>
              }
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <h2 className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">{getTitle()}</h2>
              </div>
            </div>
          </div>
          <div>
            <SearchBar onSearch={onSearch} />
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button type="button" className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 stroke-slate-50 stroke-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>
            <Link to="/post">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 stroke-slate-50 stroke-1">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
          </Link>
        </div>
      </div>

    </div>
    </nav >

  );
}

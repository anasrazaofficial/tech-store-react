import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"

function App() {
  const location = useLocation();

  useEffect(() => {
    const isLocalStorageActive = window.localStorage.getItem('active') === null;
    const isAllowedRoute = ['/signup', '/login'].includes(location.pathname);

    if (isLocalStorageActive && !isAllowedRoute) {
      window.location.href = '/login';
    }
  }, [location.pathname]);
  return (
    <>
      <Outlet />
    </>
  )
}

export default App


export const url='http://localhost:3000'
import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"

function App() {
  const location = useLocation();

  useEffect(() => {
    // debugger
    const isLocalStorageActive = window.localStorage.getItem('active') === null;
    const isAllowedRoute = ['/signup', '/'].includes(location.pathname);

    if (isLocalStorageActive && !isAllowedRoute) {
      window.location.href = '/';
    }
  }, [location.pathname]);
  return (
    <>
      <Outlet />
    </>
  )
}

export default App

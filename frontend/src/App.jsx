import { Outlet } from 'react-router-dom'
import Nav from './pages/Auth/nav';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Nav />
      <main className=''>
        <Outlet />
      </main>
    </>
  )
}

export default App

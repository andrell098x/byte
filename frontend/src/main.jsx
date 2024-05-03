import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';


//private routing
import PrivateRoutes from './components/PrivateRoutes.jsx'

//authentication
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'

import Profile from './pages/User/Profile.jsx';
import Home from './pages/User/Home.jsx';
import Product from './pages/User/Product.jsx';
import Cart from './pages/User/Cart.jsx';

import AdminRoutes from './pages/Admin/AdminRoutes.jsx';
import UserList from './pages/Admin/UserList.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
   <Route path="/" element={<App/>} >
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />

      <Route path='' element={<PrivateRoutes />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/products' element={<Product />} />
        <Route path='/carts' element={<Cart />} />
        <Route path='/' element={<Home />} />
      </Route>


      {/*Admin*/}
      <Route path='/admin' element={<AdminRoutes />}>
        <Route path='userList' element={<UserList />} />
      </Route>

   </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

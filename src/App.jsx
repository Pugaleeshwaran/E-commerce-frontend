import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout.jsx'
import Home from './pages/Home.jsx'
import { Toaster } from "sonner"
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Profile from './pages/Profile.jsx'
import Collection from './pages/Collection.jsx'
import Prouctdetial from './components/Product/Prouctdetial.jsx'
import Checkout from './components/Cart/Checkout.jsx'
import OrderConformaion from './pages/OrderConformaion.jsx'
import OrderDetail from './pages/OrderDetail.jsx'
import Myorder from './pages/Myorder.jsx'
import AdminLayout from './components/Admin/AdminLayout.jsx'
import AdminHome from './pages/AdminHome.jsx'
import Usermanagement from './components/Admin/Usermanagement.jsx'
import ProductManagement from './components/Admin/ProductManagement.jsx'
import EditProductPage from './components/Admin/EditProductPage.jsx'
import OrderMananage from './components/Admin/OrderMananage.jsx'

import { Provider } from 'react-redux'
import store from "./redux/store.js"
function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position='top-right' />
        <Routes>
          <Route path='/' element={<UserLayout />}>{/*User layout*/}
            <Route index element={<Home />}></Route>
            <Route path='login' element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='profile' element={<Profile />}></Route>
            <Route path='collections/:collection' element={<Collection />}></Route>
            <Route path='/product/:id' element={<Prouctdetial />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/order-conformation' element={<OrderConformaion />}></Route>
            <Route path='/orders/:id' element={<OrderDetail />}></Route>
            <Route path='/my-order' element={<Myorder />}></Route>
          </Route>

          <Route path='/admin' element={<AdminLayout />}>{/*Admin layout */}
            <Route index element={<AdminHome />}></Route>
            <Route path='users' element={<Usermanagement />}></Route>
            <Route path='products' element={<ProductManagement />}></Route>
            <Route path='products/:id/edit' element={<EditProductPage />}></Route>
            <Route path='orders' element={<OrderMananage />}></Route>
          </Route>
        </Routes>

      </BrowserRouter>
    </Provider>
  )
}

export default App

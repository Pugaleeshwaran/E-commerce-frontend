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
function App() {


  return (
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
          <Route path='//order-conformation' element={<OrderConformaion />}></Route>
        </Route>

        <Route>{/*Admin layout */}</Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App

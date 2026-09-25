import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLayout from './components/Layout/UserLayout.jsx'
import Home from './pages/Home.jsx'
import { Toaster } from "sonner"
function App() {


  return (
    <BrowserRouter>
      <Toaster position='top-right'/>
      <Routes>
        <Route path='/' element={<UserLayout />}>{/*User layout*/}
          <Route index element={<Home />}></Route>
        </Route>

        <Route>{/*Admin layout */}</Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App

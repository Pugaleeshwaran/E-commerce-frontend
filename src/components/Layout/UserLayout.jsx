import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import Hero from './Hero'
import { Outlet } from 'react-router-dom'
const UserLayout = () => {
    return (
        <div >
            {/* Header  */}
            <Header />
            {/* Main section */}
            <main>
                <Outlet/>
            </main>
            {/* Footer */}
            <Footer />
        </div>
    )
}

export default UserLayout
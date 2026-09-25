import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUser, HiOutlineShoppingBag } from 'react-icons/hi'
import { HiBars3BottomRight, HiMiniXMark } from 'react-icons/hi2'
import SearchBar from './SearchBar'
import Carddraw from '../Layout/carddraw'
const Navbar = () => {

    const [opencart, setopencart] = useState(true)
    const [mobilenav, setmobilenav] = useState(false)
    const handlecart = () => {
        setopencart(!opencart)
        console.log(opencart);

    }
    const handlemobilenav = () => {
        setmobilenav(!mobilenav);
    }
    return (
        <>
            <nav className='container mx-auto flex items-center justify-between py-4 px-6 ' >
                {/* left  */}
                <div>
                    <Link to={"/"} className='text-2xl font-medium'>Rabbit</Link>
                </div>
                {/* center */}
                <div className='hidden md:flex space-x-6 '>
                    <Link className="text-gray-700 hover:text-black text-sm font-medium uppercase">MEN</Link>
                    <Link className="text-gray-700 hover:text-black text-sm font-medium uppercase">WOMEN</Link>
                    <Link className="text-gray-700 hover:text-black text-sm font-medium uppercase">TOP WEAR</Link>
                    <Link className="text-gray-700 hover:text-black text-sm font-medium uppercase">BOTTOM WEAR</Link>
                </div>
                {/* right */}
                <div className='flex items-center  space-x-3 '>
                    <Link to={"/profile"} className='hover:text-black'><HiOutlineUser className='w-6 h-6 text-gray-700' /></Link>
                    <button onClick={handlecart} className='relative hover:text-black'>
                        <HiOutlineShoppingBag className='w-6 h-6 text-gray-700' />
                        <span className='bg-rabbit-red -top-1 absolute text-white text-xs rounded-full px-2 p-0.5'>4</span>
                    </button>
                    {/* search */}
                    <div className='overflow-hidden '>
                        <SearchBar />
                    </div>

                    {/* mobile respansive icon  */}
                    <button><HiBars3BottomRight className='w-6 h-6 z-50 text-gray-700  md:hidden' onClick={handlemobilenav} /></button>
                </div>
            </nav>
            <Carddraw handlecart={handlecart} opencart={opencart} />
            {/* mobile Nav slier */}
            <div className={` pl-3 fixed top-0 left-0 z-50 bg-white shadow-lg z-60 w-1/2 h-dvh  transform transition-transform duration-300 md:hidden ${mobilenav?"translate-x-0":"-translate-x-full"}`}>
                <div className='flex justify-end p-3'>
                    <HiMiniXMark className='text-2xl w-6 h-6 cursor-pointer text-black' onClick={handlemobilenav}/>
                </div>
                <div>
                    <h3 className='text-2xl font-semibold '>Menu</h3>
                    <div className='flex flex-col gap-4 mt-5'>
                        <Link className='"text-gray-700 hover:text-black text-sm font-medium uppercase' to={"#"}>MEN</Link>
                        <Link className='"text-gray-700 hover:text-black text-sm font-medium uppercase' to={"#"}>WOMEN</Link>
                        <Link className='"text-gray-700 hover:text-black text-sm font-medium uppercase' to={"#"}>TOP WEAR</Link>
                        <Link className='"text-gray-700 hover:text-black text-sm font-medium uppercase' to={"#"}>BOTTOM WEAR</Link>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar
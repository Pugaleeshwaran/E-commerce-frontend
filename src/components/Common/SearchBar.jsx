import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';

const SearchBar = () => {
    const [search, setsearch] = useState("")
    const [open, setopen] = useState(false);

    const handlesearch = () => {
        setopen(!open)
    }
    const handlesubmit = (e) => {
        e.preventDefault()
        console.log(search);
        setopen(false)
        setsearch("")


    }
    return (
        <div className={`flex items-center justify-center w-full transition-all duration-300 ${open ? "absolute w-full top-0 left-0 bg-white h-24 z-50" : " w-auto"}`}>{
            open ? (<form onSubmit={handlesubmit} className='relative flex items-center justify-center w-full'>
                <div className='relative w-1/2'>
                    <input onChange={(e) => setsearch(e.target.value)} type="text" placeholder='Search' value={search} className='bg-gray-100 text-black  px-4 py-2 pl-5 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700' />
                    {/* Search icon */}
                    <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600'>
                        <HiMagnifyingGlass className='h-6 w-6' />
                    </button>
                    {/* {/* close btn /} */}
                    <button type='button' onClick={handlesearch} className='absolute -right-10 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                        <HiMiniXMark className='h-6 w-6' />
                    </button>
                </div>
            </form>) :
                (<button onClick={handlesearch}><HiMagnifyingGlass className='w-6 h-6 text-gray-700' /></button>)
        }</ div >
    )
}

export default SearchBar
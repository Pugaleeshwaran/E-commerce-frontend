import React from 'react'
import { HiMiniXMark } from 'react-icons/hi2'
import Cartcondent from '../Cart/Cartcondent'
const Carddraw = ({ handlecart, opencart }) => {
    return (
        <div className={`fixed h-dvh text-black bg-white right-0 top-0 w-3/4 z-10 flex justify-between drop-shadow items-center flex-col py-3 px-5 transform transition-transform duration-300 md:w-1/2 lg:w-1/4 sm:w-1/2 ${opencart ? "translate-x-full" : "translate-x-0"
            } `}>
            <div className='flex justify-between w-full items-center'>
                <h3 className='text-2xl font-semibold text-black'>CART </h3>
                <HiMiniXMark className='text-2xl w-6 h-6 cursor-pointer text-black' onClick={handlecart} />
            </div>

            <div className='text-black w-full h-full flex flex-col justify-between mt-10'>
                {/* <p className=''>
                    Your Card is Empty
                </p> */}
                <Cartcondent />
                 <div className='w-full gap-2 flex flex-col'>
                <button className='bg-gray-950 text-white px-2 py-1 w-full rounded-md font-semibold text-base'>Checkout</button>
                <p className='text-nowrap text-xs text-gray-500'>Shipping,taxes and discount codes calculated at checkout</p>
            </div>
            </div>
           

        </div>
    )
}

export default Carddraw
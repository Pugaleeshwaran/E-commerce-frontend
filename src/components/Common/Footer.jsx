import React from 'react'
import { FaMeta } from 'react-icons/fa6'
import { FiPhoneCall } from 'react-icons/fi'
import { IoLogoInstagram } from 'react-icons/io'
import { PiPhoneListBold } from 'react-icons/pi'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className='border-t pt-16 pb-10'>
            <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0'>

                {/* Newsletter */}
                <div className='flex flex-col '>
                    <h3 className='text-xl font-semibold mb-4'>Newsletter</h3>
                    <p className='text-gray-600 font-normal text-sm'>Be the First to hear about new product,exclusive events, and online offers</p>
                    <p className='font-normal text-sm mt-4 mb-4'>Sign up and get 10% off your first order.</p>
                    <form className='flex'>
                        <input type="text" required placeholder='Enter you email' className='text-xs p-2 border border-gray-400 rounded-s-md focus:outline-none  ' />
                        <button className='bg-black text-white p-2  rounded-e-md text-sm'>Subcribe</button>
                    </form>

                </div>

                {/* Shoplinks */}
                <div className='flex flex-col'>
                    <h3 className='text-xl font-semibold mb-4'>Shop</h3>
                    <ul className='space-y-2'>
                        <li><Link className='text-gray-600 font-normal text-sm hover:text-black'>Mens's Top Wear</Link> </li>
                        <li><Link className='text-gray-600 font-normal text-sm hover:text-black'>Women's Top Wear</Link> </li>
                        <li><Link className='text-gray-600 font-normal text-sm hover:text-black'>Men's Bottom Wear</Link> </li>
                        <li><Link className='text-gray-600 font-normal text-sm hover:text-black '>Women's Bottom Wear</Link> </li>
                    </ul>
                </div>

                {/* Support links  */}
                <div className='flex flex-col'>
                    <h3 className='text-xl font-semibold mb-4'>Support</h3>
                    <ul className='space-y-2'>
                        <li><Link className='text-gray-600 font-normal text-sm hover:text-black'>Contact Us</Link> </li>
                        <li><Link className='text-gray-600 font-normal text-sm hover:text-black'>About Us</Link> </li>
                        <li><Link className='text-gray-600 font-normal text-sm hover:text-black'>FAQs</Link> </li>
                        <li><Link className='text-gray-600 font-normal text-sm hover:text-black '>Features</Link> </li>
                    </ul>
                </div>

                {/* Follow US */}
                <div className=''>
                    <h3 className='text-xl font-semibold mb-4'>Follow Us</h3>
                    <div className='flex gap-2 items-center mb-6'>
                        <a href="https://facebook.com/" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
                            <TbBrandMeta className='h-5 w-5' /></a>

                        <a href="https://instagram.com/" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
                            <IoLogoInstagram className='h-5 w-5' /></a>


                        <a href="https://x.com/" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'>
                            <RiTwitterXLine className='w-4 h-4' /></a>
                    </div>
                    <div className=''>
                        <p className='text-gray-600 font-normal text-sm'>Call Us</p>
                        <div className='flex items-center gap-2 mt-2'>
                            <FiPhoneCall />
                            <p className='text-black font-semibold'>+91 9876543210</p>
                        </div>

                    </div>
                </div>

            </div>

            {/* fooderbottom  */}
            <div className='container mx-auto mt-12 px-4 lg:px-0 border-t border-t-gray-200 pt-6'>
                <p className='text-gray-600 text-center font-light text-xs tracking-tight'>©2026,Dev Pugal,All rights Reserved.</p>
            </div>
        </footer>

    )
}

export default Footer
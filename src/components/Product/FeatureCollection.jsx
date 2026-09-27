import React from 'react'
import Feature from '../../assets/featured.webp'
import { Link } from 'react-router-dom'
const FeatureCollection = () => {
    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto flex flex-col-reverse lg:flex-row items-center bg-gray-50 rounded-3xl'>
                {/* left side  */}

                <div className='lg:w-1/2 p-8 items-center text-center lg:text-left flex flex-col gap-3'>
                    <p className='font-bold text-lg text-gray-700'> Comfort and Style</p>
                    <h3 className='font-bold text-3xl lg:text-4xl'>Apparel made for your everyday life</h3>
                    <p className='text-xs text-gray-600'>Discover high-quality;comfortable clothing that effortlessly blends fashion and function.Designed to make you look and feel great every day.</p>
                    <Link to={'/collections/all'} className='text-white text-center p-2 rounded-md bg-black w-32 hover:bg-gray-800'>Shop Now</Link>
                </div>
                <div className='lg:w-1/2'>
                    <img src={Feature} alt="feature collection"
                    className='w-full h-full object-cover lg:rounded-e-3xl ' />
                </div>
            </div>
        </section>
    )
}

export default FeatureCollection
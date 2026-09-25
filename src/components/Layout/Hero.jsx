import React from 'react'
import Herobg from '../../assets/rabbit-hero.webp'
import { Link } from 'react-router-dom'
const Hero = () => {
    return (
        <section className='relative'>
            <img src={Herobg} alt="habbit-bg" className='w-full h-[400px] md:h-[600px] lg:[750px] object-cover' />
            <div className='absolute inset-0 bg-opacity-5 bg-black flex flex-col text-white justify-center items-center'>
                <h3 className='text-5xl font-bold uppercase text-center md:text-7xl '>Vacation <br /> ready</h3>
                <p className='m-2 text-base capitalize text-center'>Explore our vacation outfits with fast worldwide shipping.</p>
                <Link to={"#"} className='text-black bg-white py-2 px-3 rounded-sm text-lg '>Shop Now</Link>
            </div>
        </section>
    )
}

export default Hero
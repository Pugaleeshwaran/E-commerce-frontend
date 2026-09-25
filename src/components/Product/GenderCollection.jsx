import React from 'react'
import Menscol from "../../assets/mens-collection.webp"
import Womencol from "../../assets/womens-collection.webp"
import { Link } from 'react-router-dom'
const GenderCollection = () => {
    return (
        <section className='py-16 px-4 lg:px-0'>
            <div className='container mx-auto flex flex-col gap-10 justify-between lg:flex-row'>
                <div className='relative flex-1'>
                    <img src={Womencol} alt="womens collection" className='w-full h-[600px] object-cover' />
                    <div className='absolute bottom-6 left-6 p-5 bg-opacity-70 bg-white'>
                        <h4 className=' text-2xl font-semibold'>Women's Collection</h4>
                        <Link to={"#"} className='text-base underline'>Shop Now</Link>
                    </div>
                </div>
                <div className='relative flex-1'>
                    <img src={Menscol} alt="womens collection" className='w-full h-[600px] object-cover' />
                    <div className='absolute bottom-6 left-6 p-5 bg-opacity-70 bg-white'>
                        <h4 className=' text-2xl font-semibold'>Mens's Collection</h4>
                        <Link to={"#"} className='text-base underline'>Shop Now</Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GenderCollection
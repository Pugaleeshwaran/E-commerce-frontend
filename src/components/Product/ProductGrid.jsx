import React from 'react'
import { Link } from 'react-router-dom'

const ProductGrid = ({ product }) => {

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {
                product.map(function (item, index) {
                    return (
                        <Link to={`product/${item._id}`} key={index} className='block'>
                            <div className='bg-white rounded-lg p-4'>
                                <div className='w-full h-96 mb-4'>
                                    <img className='w-full h-full object-cover rounded-lg' src={item.img} alt={item.name} />
                                </div>
                                
                                    <h3 className='text-sm mb-2'>{item.name}</h3>
                                    <p className='text-gray-500 font-medium text-sm tracking-tighter'>{item.price}</p>
                                
                            </div>
                        </Link>


                    )
                })
            }
        </div >
    )
}

export default ProductGrid
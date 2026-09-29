import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState([{
        category: "",
        gender: "",
        color: "",
        size: [],
        meterial: [],
        brand: [],
        minPrice: 0,
        maxPrice: 10000,
    }]);
    const [priceRange, setPriceRange] = useState([0, 100]);

    const category = ["Top Wear", "Bottom Wear"];
    const gender = ["Male", "Female"];
    const color = ["Red", "Yellow", "Black", "White", "blue", "Green", "Pink"]
    const size = ["S", "M", "L", "XL", "XXL", "XXXL"];
    const meterial = ["Cotton", "Wool", "Denin", "Polyster", "Lycra", "Silk", "Linen"]
    const brand = ["Zara", "H&M", "Sntich", "Tiger", "Flower"]


    useEffect(() => {
        const param = Object.fromEntries([...searchParams])
        setFilter({
            category: param.category || "",
            gender: param.gender || "",
            color: param.color || "",
            size: param.size ? param.size.split(",") : [],
            meterial: param.meterial ? param.meterial.split(",") : [],
            brand: param.brand ? param.brand.split(",") : [],
            minPrice: param.minPrice || 0,
            maxPrice: param.maxPrice || 100,
        })
        setPriceRange([0, param.maxPrice || 10000])
    }, [searchParams])
    return (
        <div className='p-4'>
            <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>

            {/* category Filter */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Category</label>
                {
                    category.map((cat) => {
                        return (
                            <div key={cat} className='flex items-center mb-1'>
                                <input type="radio" name='cat'
                                    className='mr-2 h-4 w-4 text-blue-500 border-gray-300'
                                />
                                <span>{cat}</span>
                            </div>
                        )
                    })
                }
            </div>
            {/* gender */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Gender</label>
                {
                    gender.map((cat) => {
                        return (
                            <div key={cat} className='flex items-center mb-1'>
                                <input type="radio" name='cat'
                                    className='mr-2 h-4 w-4 text-blue-500 border-gray-300'
                                />
                                <span >{cat}</span>
                            </div>
                        )
                    })
                }

            </div>
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Color</label>
                <div className='flex flex-wrap gap-2'>
                    {
                        color.map((color) => {
                            return (
                                <div key={color} className='flex items-center mb-1'>
                                    <button className='w-8 border h-8 border-gray-300 cursor-pointer rounded-full transition hover:scale-105' style={{ backgroundColor: color.toLocaleLowerCase() }}>
                                    </button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Size</label>
                <div className='flex flex-col gap-2'>
                    {
                        size.map((color) => {
                            return (
                                <div key={color} className='flex items-center mb-1'>
                                    <input type="checkbox" className='mr-2 h-4 w-4 text-blue-500 focus:border-gray-300' />
                                    <span>{color}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Material</label>
                <div className='flex flex-col gap-2'>
                    {
                        meterial.map((color) => {
                            return (
                                <div key={color} className='flex items-center mb-1 gap-1'>
                                    <input type="checkbox" className='mr-2 h-4 w-4 text-blue-500 focus:border-gray-300' />
                                    <span>{color}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Brand</label>
                <div className='flex flex-col gap-2'>
                    {
                        brand.map((color) => {
                            return (
                                <div key={color} className='flex items-center mb-1 gap-1'>
                                    <input type="checkbox" className='mr-2 h-4 w-4 text-blue-500 focus:border-gray-300' />
                                    <span>{color}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Price Range</label>
                <div className='flex flex-col gap-2'>

                    <div className='flex flex-col items-center mb-1 gap-1'>
                        <input type="range" name='range' min={0} max={10000} className='w-full h-2 bg-gray-300 rounded-xl appearance-none cursor-pointer' />
                        <div className='w-full flex justify-between'>
                            <span>₹0</span>
                            <span>₹{priceRange[1]}</span>
                        </div>

                    </div>



                </div>
            </div>
        </div>
    )
}

export default Filter
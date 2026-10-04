import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const [filter, setFilter] = useState([{
        category: "",
        gender: "",
        color: "",
        size: [],
        meterial: [],
        brand: [],
        minPrice: 0,
        maxPrice: 2000,
    }]);
    const [priceRange, setPriceRange] = useState([0, 100]);

    const handlegetValue = (e) => {
        const { name, value, type, checked } = e.target


        let newFilter = { ...filter };
        if (type == "checkbox") {
            if (checked) {
                newFilter[name] = [...(newFilter[name] || []), value];
            }
            else {
                newFilter[name] = newFilter[name].filter(function (item) {
                    return item !== value
                })
            }
        }
        else {
            newFilter[name] = value;
        }
        setFilter(newFilter)
        console.log(newFilter);
        updateURLparams(newFilter)
    }
    const updateURLparams = (newFilters) => {
        const params = new URLSearchParams();

        Object.keys(newFilters).forEach(function (key) {
            if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
                params.append(key, newFilters[key].join(","));
            }
            else if (newFilters[key]) {
                params.append(key, newFilters[key])
            }
        });
        setSearchParams(params)
        navigate(`?${params.toString()}`)
    }

    const handlePrice = (e) => {
        const newPrice = e.target.value
        setPriceRange([0, newPrice])
        const newFilter = { ...Filter, minPrice: 0, maxPrice: newPrice };
        setFilter(filter);
        updateURLparams(newFilter)
    }

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
            maxPrice: param.maxPrice || 2000,
        })
        setPriceRange([0, param.maxPrice || 2000])
    }, [searchParams])
    return (
        <div className='p-4'>
            <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>

            {/* category Filter */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Category</label>
                {
                    category.map((category) => {
                        return (
                            <div key={category} className='flex items-center mb-1'>
                                <input onChange={handlegetValue}
                                    value={category}
                                    type="radio"
                                    name='category'
                                    checked={filter.category == category}
                                    className='mr-2 h-4 w-4 text-blue-500 border-gray-300'
                                />
                                <span>{category}</span>
                            </div>
                        )
                    })
                }
            </div>
            {/* gender */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Gender</label>
                {
                    gender.map((gender) => {
                        return (
                            <div key={gender} className='flex items-center mb-1'>
                                <input
                                    onChange={handlegetValue}
                                    value={gender}
                                    type="radio"
                                    name='gender'
                                    checked={filter.gender == gender}
                                    className='mr-2 h-4 w-4 text-blue-500 border-gray-300'
                                />
                                <span >{gender}</span>
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
                                    <button
                                        onClick={handlegetValue}
                                        value={color}
                                        name='color'
                                        checked={filter.color == color}
                                        className={`w-8 border h-8 border-gray-300 cursor-pointer rounded-full transition hover:scale-105 ${filter.color == color ? "ring-2 ring-blue-200" : ""}`}
                                        style={{ backgroundColor: color.toLocaleLowerCase() }}>
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
                        size.map((size) => {
                            return (
                                <div key={size} className='flex items-center mb-1'>
                                    <input name='size'
                                        onChange={handlegetValue}
                                        value={size}
                                        type="checkbox"
                                        checked={filter.size?.includes(size)}
                                        className='mr-2 h-4 w-4 text-blue-500 focus:border-gray-300' />
                                    <span>{size}</span>
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
                        meterial.map((meterial) => {
                            return (
                                <div key={meterial} className='flex items-center mb-1 gap-1'>
                                    <input onChange={handlegetValue}
                                        value={meterial}
                                        name='meterial'
                                        type="checkbox"
                                        checked={filter.meterial?.includes(meterial)}
                                        className='mr-2 h-4 w-4 text-blue-500 focus:border-gray-300' />
                                    <span>{meterial}</span>
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
                        brand.map((brand) => {
                            return (
                                <div key={brand} className='flex items-center mb-1 gap-1'>
                                    <input name='brand'
                                        onChange={handlegetValue}
                                        value={brand}
                                        type="checkbox"
                                        checked={filter.brand?.includes(brand)}

                                        className='mr-2 h-4 w-4 text-blue-500 focus:border-gray-300' />
                                    <span>{brand}</span>

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
                        <input type="range" 
                        name='range'
                        min={0} max={2000} 
                        onChange={handlePrice}
                        value={priceRange[1]}
                        className='w-full h-2 bg-gray-300 rounded-xl appearance-none cursor-pointer' />
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
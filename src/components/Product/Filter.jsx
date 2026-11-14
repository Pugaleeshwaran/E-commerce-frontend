import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const { collection: currentCollection = "all" } = useParams();
    const [filter, setFilter] = useState({
        category: "",
        gender: "",
        color: "",
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 2000,
    });
    const [priceRange, setPriceRange] = useState([0, 2000]);

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
        // console.log(newFilter);
        updateURLparams(newFilter)
    }
    const updateURLparams = (newFilters) => {
        const params = new URLSearchParams(searchParams);

        Object.keys(newFilters).forEach((key) => {
            const value = newFilters[key];
            params.delete(key);
            if (Array.isArray(value)) {
                if (value.length > 0) params.set(key, value.join(","));
            } else if (value !== "" && value !== null && value !== undefined) {
                params.set(key, value);
            }
        });

        setSearchParams(params);
    };

    const handlePrice = (e) => {
        const newPrice = Number(e.target.value);

        setPriceRange([0, newPrice]);

        const newFilter = {
            ...filter,
            minPrice: 0,
            maxPrice: newPrice
        };

        setFilter(newFilter);
        updateURLparams(newFilter);
    };

    // Collections live in the URL path (/collections/:collection); the other filters stay in the query string
    const collectionOptions = [
        { label: "All", value: "all" },
        { label: "Ethnic Wear", value: "Ethnic Wear" },
    ];
    const handleCollection = (e) => {
        const query = searchParams.toString();
        navigate(`/collections/${encodeURIComponent(e.target.value)}${query ? `?${query}` : ""}`);
    };

    const category = ["Top Wear", "Bottom Wear"];
    const gender = ["Men", "Women"];
    const color = ["Red", "Yellow", "Black", "White", "Blue", "Green", "Pink", "Gray", "Navy", "Beige"];
    const size = ["XS", "S", "M", "L", "XL", "XXL", "Free Size"];
    const material = ["Cotton", "Cotton Blend", "Denim", "Polyester", "Linen Blend", "Wool Blend", "Silk", "Silk Blend", "Viscose", "Fleece", "Georgette", "Rayon"];
    const brand = ["Desi Threads", "Rangoli", "Utsav Wear", "Shaadi Couture", "Noor Fashion", "Kerala Handloom", "ActiveWear", "DenimStyle", "ChicStyle", "ElegantWear"];

    useEffect(() => {
        const param = Object.fromEntries([...searchParams]);

        setFilter({
            category: param.category || "",
            gender: param.gender || "",
            color: param.color || "",
            size: param.size ? param.size.split(",") : [],
            material: param.material ? param.material.split(",") : [],
            brand: param.brand ? param.brand.split(",") : [],
            minPrice: Number(param.minPrice) || 0,
            maxPrice: Number(param.maxPrice) || 2000,
        });

        setPriceRange([
            0,
            Number(param.maxPrice) || 2000
        ]);
    }, [searchParams]);
    return (
        <div className='p-4 w-3/4'>
            <h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>

            {/* collection Filter */}
            <div className='mb-6'>
                <label className='block text-gray-600 font-medium mb-2'>Collection</label>
                {
                    collectionOptions.map(({ label, value }) => {
                        return (
                            <div key={value} className='flex items-center mb-1'>
                                <input onChange={handleCollection}
                                    value={value}
                                    type="radio"
                                    name='collection'
                                    checked={currentCollection.toLowerCase() === value.toLowerCase()}
                                    className='mr-2 h-4 w-4 text-blue-500 border-gray-300'
                                />
                                <span>{label}</span>
                            </div>
                        )
                    })
                }
            </div>

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
                                        type="button"
                                        onClick={() => {
                                            const newFilter = {
                                                ...filter,
                                                color: filter.color === color ? "" : color
                                            };

                                            setFilter(newFilter);
                                            updateURLparams(newFilter);
                                        }}
                                        className={`w-8 border h-8 border-gray-300 cursor-pointer rounded-full transition hover:scale-105 ${filter.color === color ? "ring-2 ring-blue-200" : ""
                                            }`}
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    >
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
                            // console.log(size);

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
                        material.map((material) => {
                            return (
                                <div key={material} className='flex items-center mb-1 gap-1'>
                                    <input onChange={handlegetValue}
                                        value={material}
                                        name='material'
                                        type="checkbox"
                                        checked={filter.material?.includes(material)}
                                        className='mr-2 h-4 w-4 text-blue-500 focus:border-gray-300' />
                                    <span>{material}</span>
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

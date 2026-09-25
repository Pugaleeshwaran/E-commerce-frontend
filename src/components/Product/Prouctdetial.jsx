import React, { use, useEffect, useState } from 'react'
import { toast } from "sonner"
import ProductGrid from './ProductGrid'
const selecteditem = {
    name: "Stylish Jacket",
    price: 420,
    originalPrice: 550,
    description: "This is a stylish Jacket perfect for any occasion",
    brand: "FashionBrand",
    material: "Leather",
    sizes: ["S", "M", "L", "XL"],
    color: ["Red", "black"],
    image: [
        {
            url: "https://picsum.photos/500/500?random=10",
            alt: name
        },

        {
            url: "https://picsum.photos/500/500?random=9",
            alt: name
        }


    ]
}

const productIdem = [
    {
        _id: "1",
        name: "Stylish Jacket",
        price: "₹120",
        img: "https://picsum.photos/500/500?random=1"
    },
    {
        _id: "2",
        name: "Stylish Shirt",
        price: "₹350",
        img: "https://picsum.photos/500/500?random=2"
    },
    {
        _id: "3",
        name: "Stylish Top",
        price: "₹150",
        img: "https://picsum.photos/500/500?random=3"
    },
    {
        _id: "4",
        name: "Stylish Bottom",
        price: "₹520",
        img: "https://picsum.photos/500/500?random=4"
    },
    
]

const Prouctdetial = () => {
    const [mainimg, setmainimg] = useState();
    const [selcolor, setselcolor] = useState();
    const [selsize, setselsize] = useState();
    const [quantity, setquantity] = useState(1);
    const [btndisable, setbtndisable] = useState(false)

    const handleQuantity = (action) => {
        if (action === "plus") {
            setquantity((prev) => prev + 1)
        }
        if (action === "minus" && quantity > 1) {
            setquantity((prev) => prev - 1)
        }

    }
    const addToCart = () => {
        if (!selcolor || !selsize) {
            toast.error("Please selecting a Color and Size before adding a card.",
                { duration: 1000 })
            return;
        }
        setbtndisable(true)

        setTimeout(() => {
            toast.success("Product added to Cart", { duration: 1000 })
            setbtndisable(false)
        }, 500);
    }

    useEffect(function () {
        if (selecteditem.image.length > 1) {
            setmainimg(selecteditem.image[0].url)
        }
    }, [selecteditem])


    return (
        <div className='p-6'>
            <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                <div className='flex flex-col md:flex-row'>
                    {/* leftTumb img */}
                    <div className='hidden md:flex flex-col space-y-4 mr-6'>
                        {selecteditem.image.map(function (img, index) {
                            return (
                                <img className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainimg === img.url ? "border-black" : "border-gray-300"}`}
                                    key={index} src={img.url} alt={img.alt} onClick={() => setmainimg(img.url)}
                                />
                            )
                        })}
                    </div>
                    {/* main image  */}
                    <div className='md:w-1/2'>
                        <div className='mb-4'>
                            <img src={mainimg} alt={selecteditem.name}
                                className='w-full h-auto object-cover rounded-lg' />
                        </div>
                    </div>
                    {/* mobile view  */}
                    <div className='md:hidden flex overscroll-x-scroll space-x-4 mb-4'>
                        {selecteditem.image.map(function (img, index) {
                            return (
                                <img className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainimg === img.url ? "border-black" : "border-gray-300"}`}
                                    key={index} src={img.url} alt={img.alt} onClick={() => setmainimg(img.url)}
                                />
                            )
                        })}
                    </div>

                    {/* right section  */}
                    <div className='md:w-1/2 md:ml-10'>
                        <h3 className='text-2xl md:text-3xl font-semibold mb-2'>{selecteditem.name}</h3>
                        <p className='text-base text-gray-600 mb-1 line-through'>{selecteditem.originalPrice && `${selecteditem.originalPrice}`}</p>
                        <p className='text-base text-gray-500 mb-2'>₹ {selecteditem.price} </p>
                        <p className='text-gray-600 text-base mb-4'>{selecteditem.description}</p>
                        <div className='mb-4'>
                            <p className='text-gray-600 mb-4'>Color:</p>
                            <div className='flex gap-2 mt-2'>
                                {selecteditem.color.map(function (color) {
                                    return (
                                        <button onClick={() => setselcolor(color)} key={color} className={`w-8 h-8 rounded-full border ${color === selcolor ? "border-4 border-black" : "border-gray-300"}`}
                                            style={{ backgroundColor: color.toLocaleLowerCase(), filter: "brightness(0.5)" }}></button>
                                    )
                                })}
                            </div>
                            <div className='mb-4'>
                                <p className='text-gray-600 my-4'>Size:</p>
                                {
                                    selecteditem.sizes.map(function (size) {
                                        return (
                                            <button onClick={() => setselsize(size)} className={`px-4 py-2 rounded border ml-2 ${selsize === size ? "bg-black text-white" : ""}`} key={size}>{size}</button>
                                        )
                                    })
                                }
                            </div>
                            <div className='mb-4'>
                                <p className='text-gray-600 my-4'>Quantity:</p>
                                <div className='flex items-center mt-2 space-x-4'>
                                    <button onClick={() => handleQuantity("minus")} className='p-2 py-1 text-black rounded text-lg border '>
                                        -
                                    </button>
                                    <span className='text-lg'>{quantity}</span>
                                    <button onClick={() => handleQuantity("plus")} className='p-2 py-1 text-black rounded text-lg border '>
                                        +
                                    </button>
                                </div>

                            </div>

                            <button disabled={btndisable} onClick={addToCart} className={`${btndisable ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"} bg-black text-white py-2 px-6 rounded w-full mb-4`}>{btndisable ? "Adding...." : "ADD TO CART"}</button>
                            <div className='mt-10 text-gray-700'>
                                <h2 className='font-bold my-4 text-2xl'>Characteristics:</h2>
                                <table className='w-full text-left text-sm text-gray-600'>
                                    <tbody>
                                        <tr>
                                            <td className='py-1'>Brand</td>
                                            <td className='py-1'>{selecteditem.brand}</td>
                                        </tr>
                                        <tr>
                                            <td className='py-1'>Meterial</td>
                                            <td className='py-1'>{selecteditem.material}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-20'>
                    <h3 className='text-4xl font-semibold text-center '>You May Like </h3>
                    <ProductGrid product={productIdem} />
                </div>
            </div>
        </div>
    )
}

export default Prouctdetial
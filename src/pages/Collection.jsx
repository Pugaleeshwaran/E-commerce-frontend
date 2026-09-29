import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa6';
import Filter from '../components/Product/Filter';
import SortItem from '../components/Product/SortItem';
import ProductGrid from '../components/Product/ProductGrid';

const Collection = () => {
    const [productItem, setproduct] = useState([])
    const sidebarRef = useRef(null)
    const [sidebar, setsidebar] = useState(false)

    const handleSidebar = () => {
        setsidebar(!sidebar)
    }

    const handleclickOut = (e) => {
        if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
            setsidebar(false)

        }
    }
    useEffect(() => {
        // add eventlister for clicks 
        document.addEventListener("mousedown", handleclickOut)
        //remove mouse Click
        return () => {
            document.removeEventListener("mousedown", handleclickOut)
        }

    })
    useEffect(() => {
        setTimeout(() => {
            const fetchdata = [
                {
                    _id: "1",
                    name: "Stylish Jacket",
                    price: "₹120",
                    img: "https://picsum.photos/500/500?random=11"
                },
                {
                    _id: "2",
                    name: "Stylish Shirt",
                    price: "₹350",
                    img: "https://picsum.photos/500/500?random=12"
                },
                {
                    _id: "3",
                    name: "Stylish Top",
                    price: "₹150",
                    img: "https://picsum.photos/500/500?random=13"
                },
                {
                    _id: "4",
                    name: "Stylish Bottom",
                    price: "₹520",
                    img: "https://picsum.photos/500/500?random=14"
                },
                {
                    _id: "5",
                    name: "Stylish Skirts",
                    price: "₹620",
                    img: "https://picsum.photos/500/500?random=15"
                },
                {
                    _id: "6",
                    name: "Casual Pant",
                    price: "₹820",
                    img: "https://picsum.photos/500/500?random=16"
                },
                {
                    _id: "7",
                    name: "Casual Shirts",
                    price: "₹750",
                    img: "https://picsum.photos/500/500?random=17"
                },
                {
                    _id: "8",
                    name: "Inner's",
                    price: "₹120",
                    img: "https://picsum.photos/500/500?random=18"
                }
            ]
            setproduct(fetchdata)
        }, 1000);
    }, [])

    return (
        <div className='flex flex-col lg:flex-row'>
            {/* mobile filter btn */}
            <button onClick={handleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
                <FaFilter className='mr-2' /> Filter
            </button>
            <div ref={sidebarRef} className={`${sidebar ? "translate-x-0" : "-translate-x-full"} fixed w-1/2 left-0 inset-y-0 
            bg-white z-50 overflow-y-auto transition-transform duration-300 lg:static lg:w-64 lg:translate-x-0`}>
                <Filter />
            </div>
            <div className='flex-grow p-4'>
                <h2 className='text-2xl uppercase mb-4'>All collections</h2>
                <SortItem />
                <ProductGrid product={productItem} />
            </div>
        </div>
    )
}

export default Collection
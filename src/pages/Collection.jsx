import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa6';
import Filter from '../components/Product/Filter';
import SortItem from '../components/Product/SortItem';
import ProductGrid from '../components/Product/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/productsSlice';

const Collection = () => {
    const { collection } = useParams();
    const [searchParam] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const queryParams = Object.fromEntries([...searchParam]);
    const sidebarRef = useRef(null)
    const [sidebar, setsidebar] = useState(false)

    useEffect(() => {
        dispatch(fetchProductsByFilters({ collection, ...queryParams }));
    }, [dispatch, collection, searchParam]);

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
    return (
        <div className='flex flex-col lg:flex-row'>
            {/* mobile filter btn */}
            <button onClick={handleSidebar} className='lg:hidden border p-2 flex justify-center items-center'>
                <FaFilter className='mr-2' /> Filter
            </button>
            <div ref={sidebarRef} className={`${sidebar ? "translate-x-0" : "-translate-x-full"} fixed w-1/2 left-0 inset-y-0 
            bg-white z-50 overflow-y-auto transition-transform duration-300 lg:static lg:w-1/6 lg:translate-x-0`}>
                <Filter />
            </div>
            <div className='flex-grow p-4 lg:w-1/2'>
                <div className=' mb-4 flex flex-col gap-2 items-center md:flex-row justify-between'>
                    <h2 className='text-2xl uppercase '>All collections</h2>
                    <SortItem />
                </div>

                <ProductGrid products={products} loading={loading} error={error} />
            </div>
        </div>
    )
}

export default Collection
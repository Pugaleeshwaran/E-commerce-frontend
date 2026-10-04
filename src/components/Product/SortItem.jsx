import React from 'react'
import { useSearchParams } from 'react-router-dom'

const SortItem = () => {
    const [searchParam, setSearchParam] = useSearchParams('')
    const handleshot = (e) => {
        const sortby = e.target.value;
        searchParam.set("sortby", sortby)
        setSearchParam(searchParam)
    }
    return (
        <div className=' flex items-center justify-end'>
            <select id="sort"
                onChange={handleshot}
                value={searchParam.get("sortby") || ""}
                className='border p-2 rounded-md focus:outline-none'>
                <option className='p-2' value="">Default</option>
                <option className='p-2' value="priceAsc">Price: Low to High</option>
                <option className='p-2' value="priceDesc">Price: High to Low</option>
                <option className='p-2' value="popularity">Popularity</option>

            </select>

        </div>
    )
}

export default SortItem
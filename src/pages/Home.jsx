import React, { useEffect, useState } from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from '../components/Product/GenderCollection'
import Newarravel from '../components/Product/Newarravel'
import Prouctdetial from '../components/Product/Prouctdetial'
import ProductGrid from '../components/Product/ProductGrid'
import FeatureCollection from '../components/Product/FeatureCollection'
import StoreFeature from '../components/Product/StoreFeature'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/productsSlice'
import axios from 'axios'

const Home = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => {
       // console.log("home", state.products);

        return state.products
    });

    const [bestSellerProduct, setBestSellerProduct] = useState(null);

    useEffect(() => {
        //Fetch Products  for a specific collection
        dispatch(
            fetchProductsByFilters({
                gender: "Women",
                category: "Bottom Wear",
                limit: 8,
            })
        );
        //Fetch best seller product

        const fetchBestSeller = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
                setBestSellerProduct(response.data);
            } catch (error) {
                console.error(error);

            }
        }
        fetchBestSeller();
    }, [dispatch])

    return (
        <>
            <Hero />
            <GenderCollection />
            <Newarravel />
            {/* Best seller section */}
            <h3 className='text-4xl font-bold text-center mb-4'>Best Seller </h3>
            {bestSellerProduct ? (<Prouctdetial productId={bestSellerProduct._id} />) : (
                <p className='text-center'>Loading best Seller Product ....</p>
            )}


            {/* women collection */}
            <div className='container mx-auto'>
                <h3 className='text-4xl font-bold text-center mb-4'>Top Wear for Womens </h3>
                <ProductGrid products={products} loading={loading} error={error} />
            </div>

            <FeatureCollection />
            <StoreFeature />
        </>

    )
}

export default Home
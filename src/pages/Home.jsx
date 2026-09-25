import React from 'react'
import Hero from '../components/Layout/Hero'
import GenderCollection from '../components/Product/GenderCollection'
import Newarravel from '../components/Product/Newarravel'
import Prouctdetial from '../components/Product/Prouctdetial'
import ProductGrid from '../components/Product/ProductGrid'

const topWomen = [{
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
}]

const Home = () => {


    return (
        <>
            <Hero />
            <GenderCollection />
            <Newarravel />
            {/* Best seller section */}
            <h3 className='text-4xl font-bold text-center mb-4'>Best Seller </h3>
            <Prouctdetial />

            {/* women collection */}
            <div className='container mx-auto'>
                <h3 className='text-4xl font-bold text-center mb-4'>Top Wear for Womens </h3>
                <ProductGrid product={topWomen}/>
            </div>
        </>

    )
}

export default Home
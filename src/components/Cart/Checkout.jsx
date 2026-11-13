import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Paypalbtn from './Paypalbtn';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../redux/checkoutSlice';
import axios from 'axios';

const Checkout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, loading, error } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const [shippingAddress, setShippingAddress] = useState({
        fristName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    })
    const [checkOutId, setcheckoutId] = useState(null);

    //Ensure cart is loaded before Processing
    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate("/");
        }
    }, [cart, navigate]);

    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        if (cart && cart.products.length > 0) {
            const res = await dispatch(
                createCheckout({
                    checkoutItems: cart.products,
                    shippingAddress,
                    paymentMethod: "Paypal",
                    totalPrice: cart.totalPrice,
                })
            );
            if (res.payload && res.payload._id) {
                setcheckoutId(res.payload._id); //set Checkout Id if checkout was sucessfully
            }
        }
    }


    const handleSucess = async (details) => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkOutId}/pay`, { paymentStatus: "paid", paymentDetails: details }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            });

            await handleFinalizeCheckout(checkOutId); // finalize checkout if payment is suceesfully
            console.log("Final Order:", response.data);
        } catch (error) {
            console.error(error);

        }

    }

    const handleFinalizeCheckout = async (checkOutId) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkOutId}/finalize`,
                {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                },
            }
            );
            navigate("/order-conformation")
        } catch (error) {
            console.error(error);

        }
    };
    if (loading) return <p>Loading Cart...</p>
    if (error) return <p>Error:{error}</p>
    if (!cart || !cart.products || cart.products.length === 0) {
        return <p>Your cart is empty</p>
    }
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
            {/* left setion */}
            <div className='bg-white rounded-lg p-6'>
                <h2 className='text-2xl uppercase mb-6'>Checkout</h2>
                <form onSubmit={handleCreateCheckout}>
                    <h3 className='text-lg mb-4'>
                        Contact Details
                    </h3>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Email</label>
                        <input type="email" value={user ? user.mail : ""} className='w-full p-2 border rounded' disabled />
                    </div>
                    <div>
                        <h3 className='text-lg mb-4'>Delivery</h3>
                        <div className='grid grid-cols-2 gap-4 mb-3'>
                            <div>
                                <label className='block text-gray-700'>First Name</label>

                                <input value={shippingAddress.fristName}
                                    required
                                    onChange={(e) => { setShippingAddress({ ...shippingAddress, fristName: e.target.value }) }}
                                    className='w-full p-2 border rounded' type="text" />
                            </div>
                            <div>
                                <label className='block text-gray-700'>Last Name</label>
                                <input
                                    required
                                    value={shippingAddress.lastName}
                                    onChange={(e) => { setShippingAddress({ ...shippingAddress, lastName: e.target.value }) }} className='w-full p-2 border rounded' type="text" />
                            </div>

                        </div>
                        <label className='block text-gray-700'>Address</label>
                        <input value={shippingAddress.address}
                            required
                            onChange={(e) => { setShippingAddress({ ...shippingAddress, address: e.target.value }) }}
                            className='w-full p-2 border rounded mb-3' type="text" />
                        <div className='grid grid-cols-2 gap-4 mb-3'>
                            <div>
                                <label className='block text-gray-700'>City</label>

                                <input
                                    required
                                    value={shippingAddress.city}
                                    onChange={(e) => { setShippingAddress({ ...shippingAddress, city: e.target.value }) }}
                                    className='w-full p-2 border rounded' type="text" />
                            </div>
                            <div>
                                <label className='block text-gray-700'>Postel Code</label>
                                <input
                                    required
                                    value={shippingAddress.postalCode}
                                    onChange={(e) => { setShippingAddress({ ...shippingAddress, postalCode: e.target.value }) }} className='w-full p-2 border rounded' type="number" />
                            </div>

                        </div>
                        <label className='block text-gray-700'>Country</label>
                        <input required
                            value={shippingAddress.country}
                            onChange={(e) => { setShippingAddress({ ...shippingAddress, country: e.target.value }) }} className='w-full p-2 border rounded mb-3' type="text" />
                        <label className='block text-gray-700'>Phone No</label>
                        <input
                            required
                            value={shippingAddress.phone}
                            onChange={(e) => { setShippingAddress({ ...shippingAddress, phone: e.target.value }) }} className='w-full p-2 border rounded mb-3' type="number" />
                        {
                            !checkOutId ? (<button type='submit' className='bg-black text-white p-3 w-full rounded-md'>Continue to Payment </button>) :
                                (
                                    <div>
                                        <h2 className='text-lg my-4 text-center font-semibold'>Pay With Paypal</h2>
                                        <Paypalbtn amount={cart.totalPrice} onSucess={handleSucess} onError={(err) => alert("payment Faild ! please try again")} /></div>
                                )}

                    </div>
                </form>
            </div>
            <div className='bg-gray-50 p-6 rounded-lg'>
                <h3 className='text-lg font-semibold mb-2'>Order Summary</h3>
                {
                    cart.products.map((item, index) => {
                        return (
                            <div key={index} className='p-3 flex gap-4 border-t border-b mb-2'>
                                <img className='w-28 h-28 object-cover rounded' src={item.image} alt={item.name} />
                                <div className='p-2 flex justify-between w-full'>
                                    <div>
                                        <h3 className='text-lg font-medium mb-1'>{item.name}</h3>
                                        <p className='text-gray-600'>Size: {item.size}</p>
                                        <p className='text-gray-600'>Color: {item.color}</p>
                                    </div>
                                    <div>
                                        <p className='text-lg'>₹ {item.price.toLocaleString()}</p>
                                    </div>

                                </div>
                            </div>
                        )
                    })
                }
                <div className='flex w-full justify-between mb-2'>
                    <p>Subtotal</p>
                    <p>₹ {cart.totalPrice.toLocaleString()}</p>
                </div>
                <div className='flex w-full justify-between mb-2'>
                    <p>Shipping</p>
                    <p>Free</p>
                </div>
                <div className='flex w-full justify-between mt-4 pt-2 border-t'>
                    <p>Total</p>
                    <p>₹ {cart.totalPrice?.toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default Checkout

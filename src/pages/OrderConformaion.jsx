import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';



const OrderConformaion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state) => state.checkout);
    console.log(checkout);

    //Clear the cart when the Order is confirmed
    useEffect(() => {
        if (checkout && checkout._id) {
            dispatch(clearCart());
            localStorage.removeItem("cart");
        } else {
            navigate("/my-order");
        }
    }, [checkout, dispatch, navigate]);

    const calculateDelivary = (createdAt) => {
        const orderDate = new Date(createdAt);
        orderDate.setDate(orderDate.getDate() + 10); // add 10 day extra
        return orderDate.toLocaleDateString();
    }
    return (
        <div className='max-w-4xl mx-auto p-6 bg-white'>
            <h1 className='text-4xl font-bold text-center text-emerald-700 mb-8'>
                Thank you for Your Order!
            </h1>
            {
                checkout && (
                    <div className='p-6 rounded-lg border'>
                        <div className='flex justify-between mb-20'>
                            {/* order Id and Date */}
                            <div>
                                <h2 className='text-sm md:text-xl font-semibold '>
                                    Order ID :{checkout._id}
                                </h2>
                                <p className='text-gray-500'>
                                    Order date: {new Date(checkout.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            {/* estimate delivary */}
                            <div className='text-end'>
                                <p className='  text-emerald-700 text-sm'>
                                    Estimated Delivery :{" "}
                                    {
                                        calculateDelivary(checkout.createdAt)
                                    }
                                </p>
                            </div>
                        </div>
                        {/* Ordered Items */}
                        <div className='mb-20'>
                            {
                                checkout.checkoutItems?.map((item, index) => {
                                    console.log("item", item);

                                    return (
                                        <>
                                            <div key={item.productId} className='flex items-center mb-4'>
                                                <img src={item.image} alt={item.name}
                                                    className='w-16 h-16 object-cover rounded-md mr-4' />
                                                <div>
                                                    <h4 className='ml-auto text-right'>{item.name}</h4>
                                                    <p className='text-sm text-gray-500'>
                                                        {item.color} | {item.size}
                                                    </p>
                                                </div>
                                                <div className='ml-auto text-right'>
                                                    <p className='text-md'>₹ {item.price}</p>
                                                    <p className='text-sm'>Qty: {item.quantity}</p>
                                                </div>
                                            </div>


                                        </>

                                    )
                                })
                            }
                        </div>
                        {/* payent and delivery Info */}
                        <div className='flex justify-between gap-8'>
                            {/* payment info */}
                            <div>
                                <h2 className='text-lg font-semibold mb-2'>Payment</h2>
                                <p className='text-gray-600'>Paypal</p>
                            </div>
                            {/* delivery Info */}

                            <div>
                                <h4 className='text-lg font-semibold mb-2'>Delivery</h4>
                                <p className='text-gray-600'>
                                    {checkout.shippingAddress.address}
                                </p>
                                <p className='text-gray-600'>
                                    {checkout.shippingAddress.city},{" "}
                                    {checkout.shippingAddress.country}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default OrderConformaion
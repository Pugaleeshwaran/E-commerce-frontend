import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchUserOrders } from '../redux/orderSlice'

const Myorder = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.orders);
    console.log("orders my ", orders);



    useEffect(() => {
        dispatch(fetchUserOrders());
    }, [dispatch]);
    const handleRowClick = (orderId) => {
        navigate(`/orders/${orderId}`)
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error:{error}...</p>

    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h2>
            <div className='relative shadow-md sm:rounded-lg overflow-x-auto'>
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-2 px-4 sm:py-3'>image</th>
                            <th className='py-2 px-4 sm:py-3'>order id</th>
                            <th className='py-2 px-4 sm:py-3'>created</th>
                            <th className='py-2 px-4 sm:py-3'>shipping address</th>
                            <th className='py-2 px-4 sm:py-3'>items</th>
                            <th className='py-2 px-4 sm:py-3'>price</th>
                            <th className='py-2 px-4 sm:py-3'>status</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            orders && orders.length > 1 ? (orders.map(function (item) {
                                console.log("item", item);

                                return (
                                    <tr key={item._id}
                                        onClick={() => handleRowClick(item._id)}
                                        className='border-b hover:bg-gray-50 cursor-pointer'>
                                        <td className='p-2 sm:p-4'>
                                            <img
                                                className='object-cover w-20 h-20 rounded'
                                                src={item.orderItems?.[0]?.image}
                                                alt={item.orderItems?.[0]?.name || 'product'}
                                            />
                                        </td>
                                        <td className='p-2 sm:p-4 font-medium text-gray-600 whitespace-nowrap'>
                                            #{item._id}
                                        </td>
                                        <td className='p-2 sm:p-4'>
                                            {new Date(item.createdAt).toLocaleDateString()}{" "}
                                            {new Date(item.createdAt).toLocaleTimeString()}

                                        </td>
                                        <td className='p-2 sm:p-4'>
                                            {item.shippingAddress
                                                ? `${item.shippingAddress.city}, ${item.shippingAddress.country}`
                                                : "N/A"}

                                        </td>
                                        <td className='p-2 sm:p-4'>
                                            {item.orderItems?.length || 0}
                                        </td>
                                        <td className='p-2 sm:p-4'>
                                            ₹{Number(item.totalPrice).toFixed(2)}
                                        </td>
                                        <td className={`p-2 sm:p-4 text-center `}>
                                            <span className={`px-2 py-1 rounded-full text-xs sm:text-sm text-center font-medium ${item.isPaid ? "bg-green-100 text-green-500 " : "bg-red-100 text-red-500"}`}>
                                                {item.isPaid ? "Paid" : "Pending"} </span>
                                        </td>
                                    </tr>
                                )
                            })) : (<tr>
                                <td colSpan={7} className='p-4 text-center text-gray-500'>
                                    You have no orders
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Myorder
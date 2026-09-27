import React, { useEffect, useState } from 'react'

const Myorder = () => {
    const [order, setorder] = useState([])

    useEffect(() => {
        setTimeout(() => {
            const dubOrder = [
                {
                    _id: "12345",
                    createAt: new Date(),
                    shipingAddress: {
                        city: "Chennai", Country: "India"
                    },
                    orderItem: [{
                        name: "Product 1",
                        img: "https://picsum.photos/500/500?random=15"
                    }],
                    totalPrice: 500,
                    isPaid: true,
                },
                {
                    _id: "67890",
                    createAt: new Date(),
                    shipingAddress: {
                        city: "Madurai", Country: "India"
                    },
                    orderItem: [{
                        name: "Product 1",
                        img: "https://picsum.photos/500/500?random=5"
                    }],
                    totalPrice: 1250,
                    isPaid: false,
                }
            ];
            setorder(dubOrder)
        }, 1000);
    }, [])
    return (
        <div className='max-w-7xl mx-auto p-4 sm:p-6'>
            <h2 className='text-xl sm:text-2xl font-bold mb-6'>My Orders</h2>
            <div className='relative shadow-md sm:rounded-lg overflow-hidden'>
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
                            order.length > 1 ? (order.map(function (item) {

                                console.log(item);

                                return (
                                    <tr key={item._id} className='border-b hover:border-gray-50 cursor-pointer'>
                                        <td className='p-2 sm:p-4'>
                                            <img className='object-cover w-20 h-20 rounded' src={item.orderItem[0].img} alt={item.orderItem[0].name} />
                                        </td>
                                        <td className='p-2 sm:p-4 font-medium text-gray-600 whitespace-nowrap'>
                                            #{item._id}
                                        </td>
                                        <td className='p-2 sm:p-4'>
                                            {new Date(item.createAt).toLocaleDateString()}{" "}
                                            {new Date(item.createAt).toLocaleTimeString()}

                                        </td>
                                        <td className='p-2 sm:p-4'>
                                            {item.shipingAddress ? `${item.shipingAddress.city},${item.shipingAddress.Country}` : "N/A"}

                                        </td>
                                        <td className='p-2 sm:p-4'>
                                            {item.orderItem.length}
                                        </td>
                                        <td className='p-2 sm:p-4'>
                                            ₹{item.totalPrice}
                                        </td>
                                        <td className={`p-2 sm:p-4 text-center `}>
                                            <span className={`px-2 py-1 rounded-full text-xs sm:text-sm text-center font-medium ${item.isPaid ? "bg-green-100 text-green-500 " : "bg-red-100 text-red-500"}`}>
                                                {item.isPaid ? "Paid" : "Pending"} </span>
                                        </td>
                                    </tr>
                                )
                            })) : (<tr>
                                <td colSpan={7} className='p-4 text-center text-gray-500'>
                                    <td>You have no orders </td>
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
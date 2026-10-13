import React from 'react'

const checkout = {
    _id: "12343",
    createdAt: new Date(),
    checkoutItem: [
        {
            productId: 1,
            name: "T-shirt",
            size: "M",
            color: "Red",
            quantity: 1,
            price: 150,
            image: "https://picsum.photos/200?random=1"
        },
        {
            productId: 2,
            name: "Jean",
            size: "34",
            color: "Blue",
            quantity: 1,
            price: 550,
            image: "https://picsum.photos/200?random=2"
        },
    ],
    shippingAddress: {
        address: "123 Rubit Street",
        City: "Chennai",
        country: "India",
    }
}


const OrderConformaion = () => {
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
                                checkout.checkoutItem.map((item) => {
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
                                    {checkout.shippingAddress.City},{" "}
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
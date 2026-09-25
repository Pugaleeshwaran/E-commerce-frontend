import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'

const Cartcondent = () => {

  const carditem = [
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
    }
  ]

  return (
    <div className='w-full'>
      {
        carditem.map(function (product, index) {
          return (
          
              <div key={index} className='w-full py-3 border-b border-b-gray-500 flex justify-between items-start '>
                <div className='flex ' >
                  <img className='w-20 h-20 object-cover rounded-md' src={product.image} alt={product.name} />
                  <div className='mx-4'>
                    <h3 className='text-base font-semibold'>{product.name}</h3>
                    <p className='text-gray-600 text-sm'>size: {product.size} | color:{product.color}</p>
                    <div className='flex gap-3'>
                      <button className='p-1 border border-gray-300 w-6 h-6 items-center flex justify-center text-black'>+</button>
                      <span className='text-base'>{product.quantity}</span>
                      <button className='p-1 border border-gray-300 w-6 h-6 items-center flex justify-center text-black'>-</button>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col items-center gap-3'>
                  <p className='font-semibold'>₹ {product.price.toLocaleString()}</p>
                  <button className='text-red-600'><RiDeleteBin3Line /></button>
                </div>
              </div>

           
          )

        })
      }
    </div>
  )
}

export default Cartcondent
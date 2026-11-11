import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCartitemQuantity } from '../../redux/cartSlice';
import { data } from 'react-router-dom';

const Cartcondent = ({ cart, userId, guestId }) => {

  const dispatch = useDispatch();

  //handle adding or subraticing to cart

  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartitemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      )
    }
  }

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, color, size }))
  }
  console.log(cart);
  return (
    <div className='w-full'>
      {

        cart?.products?.map(function (product, index) {

          return (

            <div key={index} className='w-full py-3 border-b border-b-gray-500 flex justify-between items-start '>
              <div className='flex ' >
                <img className='w-20 h-20 object-cover rounded-md' src={product.image} alt={product.name} />
                <div className='mx-4'>
                  <h3 className='text-base font-semibold'>{product.name}</h3>
                  <p className='text-gray-600 text-sm'>size: {product.size} | color:{product.color}</p>
                  <div className='flex gap-3'>
                    <button onClick={() => handleAddToCart(
                      product.productId, -1,
                      product.quantity,
                      product.size,
                      product.color)} className='p-1 border border-gray-300 w-6 h-6 items-center flex justify-center text-black'>-</button>
                    <span className='text-base'>{product.quantity}</span>
                    <button onClick={() => handleAddToCart(
                      product.productId, 1,
                      product.quantity,
                      product.size,
                      product.color)} className='p-1 border border-gray-300 w-6 h-6 items-center flex justify-center text-black'>+</button>
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-center gap-3'>
                <p className='font-semibold'>₹ {product.price.toLocaleString()}</p>
                <button onClick={() => handleRemoveFromCart(product.productId,
                  product.size,
                  product.color
                )} className='text-red-600'><RiDeleteBin3Line /></button>
              </div>
            </div>


          )

        })
      }
    </div>
  )
}

export default Cartcondent
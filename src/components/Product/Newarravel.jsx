import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import axios from 'axios'

const Newarravel = () => {



  // Scroll container
  const scrollRef = useRef(null)

  // Button states
  const [isStart, setIsStart] = useState(true)
  const [isEnd, setIsEnd] = useState(false)

  // Mouse dragging states
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)

  const [newArrivals, setnewArrivals] = useState([])

  useEffect(() => {
    const fetchNewArravel = async () => {
      try {
        const respone = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`)
        setnewArrivals(respone.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNewArravel();

  }, [])


  // --------------------------------
  // Check scroll position
  // --------------------------------

  const checkScroll = () => {
    const container = scrollRef.current

    if (!container) return

    setIsStart(container.scrollLeft <= 0)

    setIsEnd(
      container.scrollLeft + container.clientWidth >=
      container.scrollWidth - 1
    )
  }


  // --------------------------------
  // Scroll left button
  // --------------------------------

  const scrollLeft = () => {
    const container = scrollRef.current

    if (container) {
      container.scrollBy({
        left: -container.clientWidth,
        behavior: "smooth"
      })
    }
  }


  // --------------------------------
  // Scroll right button
  // --------------------------------

  const scrollRight = () => {
    const container = scrollRef.current

    if (container) {
      container.scrollBy({
        left: container.clientWidth,
        behavior: "smooth"
      })
    }
  }


  // --------------------------------
  // Mouse down
  // --------------------------------

  const handleMouseDown = (e) => {
    const container = scrollRef.current

    if (!container) return

    setIsDragging(true)

    // Mouse starting position
    setStartX(e.pageX)

    // Current scroll position
    setScrollStart(container.scrollLeft)
  }


  // --------------------------------
  // Mouse move
  // --------------------------------

  const handleMouseMove = (e) => {
    if (!isDragging) return

    const container = scrollRef.current

    if (!container) return

    // Current mouse position
    const x = e.pageX

    // Distance mouse has moved
    const distance = x - startX

    // Move scroll position
    container.scrollLeft = scrollStart - distance
  }


  // --------------------------------
  // Mouse up
  // --------------------------------

  const handleMouseUp = () => {
    setIsDragging(false)
  }


  // --------------------------------
  // Initial check
  // --------------------------------

  useEffect(() => {
    checkScroll()
  }, [newArrivals])


  return (
    <section className='py-16 px-4'>

      <div className='container mx-auto'>

        {/* Heading */}
        <h3 className='text-4xl font-bold text-center mb-4'>
          Explore New Arrivals
        </h3>

        <p className='text-base text-center mb-4'>
          Discover the latest Style straight from runway,
          freshly added to keep your wardrobe on the cutting edge of fashion
        </p>


        {/* Buttons */}
        <div className='flex justify-end gap-2 mb-4'>

          {/* Left button */}
          <button
            onClick={scrollLeft}
            disabled={isStart}
            className={`w-8 h-8 border flex items-center justify-center
              ${isStart
                ? 'opacity-30 cursor-not-allowed'
                : 'cursor-pointer hover:bg-gray-100'
              }`}
          >
            <FiChevronLeft className='w-6 h-6' />
          </button>


          {/* Right button */}
          <button
            onClick={scrollRight}
            disabled={isEnd}
            className={`w-8 h-8 border flex items-center justify-center
              ${isEnd
                ? 'opacity-30 cursor-not-allowed'
                : 'cursor-pointer hover:bg-gray-100'
              }`}
          >
            <FiChevronRight className='w-6 h-6' />
          </button>

        </div>

      </div>


      {/* Product carousel */}
      <div
        ref={scrollRef}

        onScroll={checkScroll}

        // Mouse drag events
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className='container mx-auto flex overflow-x-scroll space-x-6 relative scrollbar-hide select-none'

        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none'
        }}
      >

        {
          newArrivals.map((product) => {

            return (

              <div
                key={product._id}
                className='min-w-[100%] sm:min-w-[50%] md:min-w-[30%] relative'
              >

                <img
                  draggable="false"
                  src={product.images[0].url}
                  alt={product.name}
                  className='w-full h-[500px] object-cover rounded-lg'
                />


                {/* Product information */}
                <div className='absolute bottom-0 text-white p-4 rounded-b-lg w-full bg-black/40 backdrop-blur-md'>

                  <Link
                    to={`/product/${product._id}`}
                    className='block'
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  >

                    <h4 className='text-xl font-semibold'>
                      {product.name}
                    </h4>

                    <p className='text-base font-normal'>
                      ₹ {product.price}
                    </p>

                  </Link>

                </div>

              </div>

            )
          })
        }

      </div>

    </section>
  )
}

export default Newarravel

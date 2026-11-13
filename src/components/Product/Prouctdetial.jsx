import React, { useEffect, useState } from 'react'
import { toast } from "sonner"
import ProductGrid from './ProductGrid'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetails, fetchSimilarProducts } from '../../redux/productsSlice'
import { addToCart as addToCartThunk } from '../../redux/cartSlice'

const Prouctdetial = ({ productId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading, error, similarProducts } = useSelector(
        (state) => state.products
    );
    const { user, guestId } = useSelector((state) => state.auth);
    const [mainimg, setmainimg] = useState("");
    const [selcolor, setselcolor] = useState("");
    const [selsize, setselsize] = useState("");
    const [quantity, setquantity] = useState(1);
    const [btndisable, setbtndisable] = useState(false)
    const productFetchId = productId || id;

    useEffect(() => {
        if (productFetchId) {
            dispatch(fetchProductDetails(productFetchId));
            dispatch(fetchSimilarProducts({ id: productFetchId }));
        }
    }, [dispatch, productFetchId])


    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setmainimg(selectedProduct.images[0].url);
        }
    }, [selectedProduct])

    console.log("Selected Product", selectedProduct);

    const handleQuantity = (action) => {
        if (action === "plus") {
            setquantity((prev) => prev + 1)
        }
        if (action === "minus" && quantity > 1) {
            setquantity((prev) => prev - 1)
        }

    }
    const handleAddToCart = async () => {
        if (!selcolor || !selsize) {
            toast.error("Please select a Color and Size.");
            return;
        }

        setbtndisable(true);

        try {
            await dispatch(addToCartThunk({
                productId: productFetchId,
                quantity: Number(quantity),
                size: selsize,
                color: selcolor,
                guestId,
                userId: user?._id
            })).unwrap();

            toast.success("Product added to cart!");
        } catch (error) {
            toast.error(error || "Failed to add product to cart");
        } finally {
            setbtndisable(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Error: {error}</p>
    }
    console.log("Product Images:", selectedProduct?.images);
    console.log("Product Colors:", selectedProduct?.colors);
    console.log("Product Sizes:", selectedProduct?.sizes);

    return (
        <div className='p-6'>
            {selectedProduct && (
                <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
                    <div className='flex flex-col md:flex-row'>
                        {/* leftTumb img */}
                        <div className='hidden md:flex flex-col space-y-4 mr-6'>
                            {selectedProduct.images.map(function (img, index) {
                                return (
                                    <img className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainimg === img.url ? "border-black" : "border-gray-300"}`}
                                        key={index} src={img.url} alt={img.alt} onClick={() => setmainimg(img.url)}
                                    />
                                )
                            })}
                        </div>
                        {/* main image  */}
                        <div className='md:w-1/2'>
                            <div className='mb-4'>
                                <img src={mainimg} alt={selectedProduct.name}
                                    className='w-full h-auto object-cover rounded-lg' />
                            </div>
                        </div>
                        {/* mobile view  */}
                        <div className='md:hidden flex overscroll-x-scroll space-x-4 mb-4'>
                            {selectedProduct.images?.map(function (img, index) {
                                return (
                                    <img className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainimg === img.url ? "border-black" : "border-gray-300"}`}
                                        key={index} src={img.url} alt={img.alt} onClick={() => setmainimg(img.url)}
                                    />
                                )
                            })}
                        </div>

                        {/* right section  */}
                        <div className='md:w-1/2 md:ml-10'>
                            <h3 className='text-2xl md:text-3xl font-semibold mb-2'>{selectedProduct.name}</h3>
                            <p className='text-base text-gray-600 mb-1 line-through'>{selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}</p>
                            <p className='text-base text-gray-500 mb-2'>₹ {selectedProduct.price} </p>
                            <p className='text-gray-600 text-base mb-4'>{selectedProduct.description}</p>
                            <div className='mb-4'>
                                <p className='text-gray-600 mb-4'>Color:</p>
                                <div className='flex gap-2 mt-2'>
                                    {selectedProduct.colors?.map(function (color) {
                                        return (
                                            <button onClick={() => setselcolor(color)} key={color} className={`w-8 h-8 rounded-full border ${color === selcolor ? "border-4 border-black" : "border-gray-300"}`}
                                                style={{ backgroundColor: color.toLocaleLowerCase(), filter: "brightness(0.5)" }}></button>
                                        )
                                    })}
                                </div>
                                <div className='mb-4'>
                                    <p className='text-gray-600 my-4'>Size:</p>
                                    {
                                        selectedProduct.sizes?.map(function (size) {
                                            return (
                                                <button onClick={() => setselsize(size)} className={`px-4 py-2 rounded border ml-2 ${selsize === size ? "bg-black text-white" : ""}`} key={size}>{size}</button>
                                            )
                                        })
                                    }
                                </div>
                                <div className='mb-4'>
                                    <p className='text-gray-600 my-4'>Quantity:</p>
                                    <div className='flex items-center mt-2 space-x-4'>
                                        <button onClick={() => handleQuantity("minus")} className='p-2 py-1 text-black rounded text-lg border '>
                                            -
                                        </button>
                                        <span className='text-lg'>{quantity}</span>
                                        <button onClick={() => handleQuantity("plus")} className='p-2 py-1 text-black rounded text-lg border '>
                                            +
                                        </button>
                                    </div>

                                </div>

                                <button disabled={btndisable} onClick={handleAddToCart} className={`${btndisable ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"} bg-black text-white py-2 px-6 rounded w-full mb-4`}>{btndisable ? "Adding...." : "ADD TO CART"}</button>
                                <div className='mt-10 text-gray-700'>
                                    <h2 className='font-bold my-4 text-2xl'>Characteristics:</h2>
                                    <table className='w-full text-left text-sm text-gray-600'>
                                        <tbody>
                                            <tr>
                                                <td className='py-1'>Brand</td>
                                                <td className='py-1'>{selectedProduct.brand}</td>
                                            </tr>
                                            <tr>
                                                <td className='py-1'>Material</td>
                                                <td className='py-1'>{selectedProduct.material}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='mt-20'>
                        <h3 className='text-4xl font-semibold text-center '>You May Like </h3>
                        <ProductGrid products={similarProducts} loading={loading} error={error} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Prouctdetial
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import reg from '../assets/register.webp'
import { registerUser } from '../redux/authSlice';
import { useDispatch, useSelector } from "react-redux"
import { mergeCart } from '../redux/cartSlice';
const Register = () => {
    const [name, setname] = useState("")
    const [mail, setmail] = useState("");
    const [password, setpassword] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    //get redirect parameter and check if it's checkout or something..

    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        if (user) {
            if (cart?.products.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user })).then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : "/");
                });
            }
            else {
                navigate(isCheckoutRedirect ? "/checkout" : '/');
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch])
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(registerUser({ name, mail, password }))

    }
    return (
        <div className='flex'>
            <div className='flex flex-col border  w-full md:w-1/2 justify-center items-center p-8 md:p-12'>
                <form onSubmit={handleSubmit} className='w-full max-w-md  bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex items-center justify-center mb-6'>
                        <h3 className='text-xl font-medium'>Rabbit</h3>
                    </div>

                    <h2 className='text-2xl font-bold text-center mb-6'>Hey there! 👋🏼</h2>
                    <p className='text-center mb-6 font-medium'>enter your mail and password to Login.</p>
                    <div className='mb-4 '>
                        <label className='block text-sm font-semibold mb-2'>Name</label>
                        <input required
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                            type="text"
                            className='border p-2 w-full rounded '
                            placeholder='Enter your Name' />
                    </div>
                    <div className='mb-4 '>
                        <label className='block text-sm font-semibold mb-2'>Email</label>
                        <input required
                            value={mail}
                            onChange={(e) => setmail(e.target.value)}
                            type="email"
                            className='border p-2 w-full rounded '
                            placeholder='Enter your email address' />
                    </div>
                    <div className='mb-4 '>
                        <label className='block text-sm font-semibold mb-2'>Password</label>
                        <input type="password" required
                            className='border p-2 w-full rounded '
                            onChange={(e) => setpassword(e.target.value)}
                            placeholder='Enter your Password' />
                    </div>
                    <button type='submit' className='w-full bg-black text-white p-2 font-semibold rounded-lg hover:bg-gray-800 transition'>Register</button>
                    <p className='text-center mt-6 text-sm'>Already have an account?{"  "} <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500 hover:text-blue-700'>Login</Link></p>
                </form>
            </div>
            <div className='hidden md:block bg-gray-800 w-1/2 '>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={reg} alt="login img" className='w-full h-[700px] object-cover' />
                </div>

            </div>
        </div>
    )
}

export default Register
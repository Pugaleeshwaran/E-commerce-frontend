import React, { useEffect } from 'react'
import Myorder from './Myorder'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { clearCart } from '../redux/cartSlice';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        navigate("/login");
    }
    return (
        <div className='min-h-screen flex flex-col'>
            <div className='flex-grow container mx-auto p-4 md:p-6'>
                <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
                    {/* left section  */}
                    <div className=' w-full md:w-1/3 lg:w-1/4 shadow-md  rounded-lg p-6'>
                        <h2 className='font-bold text-2xl  md:text-3xl mb-4'>{user?.name}</h2>
                        <p className='text-lg font-medium text-gray-800 mb-4'>{user?.mail}</p>
                        <button onClick={handleLogout} className='w-full text-white bg-red-500 py-2 px-4 rounded hover:bg-red-600'>Logout</button>
                    </div>
                    {/* right section  */}
                    <div className='w-full md:w-2/3 lg:w-3/4'>
                        <Myorder />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Profile
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import log from '../assets/login.webp'
const Login = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const handlesubmit = (e) => {
        e.preventDefault()
        console.log("login data", { username, password });

    }
    return (
        <div className='flex'>
            <div className='flex flex-col border  w-full md:w-1/2 justify-center items-center p-8 md:p-12'>
                <form onSubmit={handlesubmit} className='w-full max-w-md  bg-white p-8 rounded-lg border shadow-sm'>
                    <div className='flex items-center justify-center mb-6'>
                        <h3 className='text-xl font-medium'>Rabbit</h3>
                    </div>

                    <h2 className='text-2xl font-bold text-center mb-6'>Hey there! 👋🏼</h2>
                    <p className='text-center mb-6 font-medium'>Enter your username and password to Login.</p>
                    <div className='mb-4 '>
                        <label className='block text-sm font-semibold mb-2'>Email</label>
                        <input
                            required
                            value={username}
                            onChange={(e) => setusername(e.target.value)}
                            type="email"
                            className='border p-2 w-full rounded '
                            placeholder='Enter you email address' />

                    </div>
                    <div className='mb-4 '>
                        <label className='block text-sm font-semibold mb-2'>Password</label>
                        <input required type="password" className='border p-2 w-full rounded ' onChange={(e) => setpassword(e.target.value)} placeholder='Enter you Password' />
                    </div>
                    <button type='submit' className='w-full bg-black text-white p-2 font-semibold rounded-lg hover:bg-gray-800 transition'>Login</button>
                    <p className='text-center mt-6 text-sm'>Don't have an account?{"  "} <Link to={"/register"} className='text-blue-500 hover:text-blue-700'>Register</Link></p>
                </form>
            </div>
            <div className='hidden md:block bg-gray-800 w-1/2 '>
                <div className='h-full flex flex-col justify-center items-center'>
                    <img src={log} alt="login img" className='w-full h-[600px] object-cover' />
                </div>

            </div>
        </div>
    )
}

export default Login
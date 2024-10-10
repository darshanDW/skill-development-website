import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        const { email, password } = formData;
        if (!email || !password) {
            toast.error('Both fields are required.'); 
            return;
        }

        
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long.'); 
            return;
        }

        
        console.log('Email:', email);
        console.log('Password:', password);

    
        setFormData({ email: '', password: '' });
        toast.success("Login Successfully!"); 
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-200 via-yellow-200 to-blue-100">
            <ToastContainer /> 
            <div className="bg-gray-100 p-8 rounded-lg m-8 rounded-tr-[40px] rounded-bl-[40px] shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                    Login
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="email" 
                        placeholder="Email"
                        value={formData.email} 
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{' '}
                    <a href="/signup" className="text-pink-500 hover:text-pink-600">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

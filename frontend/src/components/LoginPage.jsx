import React, { useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom'
import { backendUrl } from '../App.jsx';
import { UserContext } from '../App';
const LoginPage = ({ closeModal }) => {
    const [customer, setcustomer] = useState('user')
     const [loading, setLoading] = useState(false);
 
    const { setIsLoggedIn } = useContext(UserContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    // const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
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
        setLoading(true);

        try {
            // Make a POST request using axios
            const response = await axios.post(`${backendUrl}/${customer}/signin`, {
                email,
                password,
            });

            // If sign-in is successful
            if (response.status === 200) {
                const { token } = response.data;
                 // Store the token in localStorage
                localStorage.setItem('token', token);
                 setIsLoggedIn(true)
                 // Show success toast
                 setLoading(false); // Set loading to false after response

                // Navigate to the homepage
                 setFormData({ email: '', password: '' });
                // <<<<<<< Updated upstream
                toast.success("Login Successfully!");
                customer === 'admin' ? window.location.href = "/Admin_home" : window.location.href = "/";

                toast.success("Login Successfully!",);
                window.location.href = "/";
                // >>>>>>> Stashed changes
            } else {
                setLoading(false);

                toast.error(response.data.msg || 'Login failed.');
            }
        } catch (error) {
            setLoading(false);

            // Handle error scenarios
             if (error.response) {
                // Server responded with a status other than 200 range
                toast.error(error.response.data.msg || 'Login failed.');
            } else {
                // Something else went wrong
                toast.error('An error occurred. Please try again.');
            }
         }
    };

    return (
        <div className="relative">

            <ToastContainer />
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
                {customer} Login
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required
                    className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required
                    className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-   blue-400"
                />
                <button
                    type="submit"
                    disabled={loading}

                    className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-200"
                >
                        {loading ? 'Login...' : 'Login'}
                        </button>
            </form>
            <p>
                {customer === 'user' ? (
                    <button onClick={() => { setcustomer('admin') }}>login as admin</button>
                ) : (
                    <button onClick={() => { setcustomer('user') }} >login as user</button>
                )}
            </p>
            <p className="mt-4 text-center text-gray-600">
                Don't have an account?{' '}
                <a href="/signup" className="text-pink-500 hover:text-pink-600">
                    Sign Up
                </a>
            </p>
        </div>
    );
};

export default LoginPage;

import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
import { backendUrl } from '../App';
const sendFormData = async (formData) => {
    try {
        const response = await axios.post(`${backendUrl}/user/signup`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
         return true
    } catch (error) {
        console.log(error) 
        return
    }
};

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        parentName: '',
        mobileNo: '',
        childName: '',
        schoolName: '',
        city: '',
        className: '',
        hobbies: [],
        otherHobby: '',
        dateOfBirth: '',
        age: null,
    });
    
    const [showOtherInput, setShowOtherInput] = useState(false);
    const notify = (message) => toast.error(message);
    
    
    const handleChange = (e) => {
         const { name, value } = e.target;
         setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };
    
    const handleHobbiesChange = (e) => {
        const options = e.target.options;
        const selectedValues = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedValues.push(options[i].value);
            }
        }
        setFormData((prev) => ({
            ...prev,
            hobbies: selectedValues,
        }));
        // Check if "Other" is selected to show/hide the input
        setShowOtherInput(selectedValues.includes('Other'));
    };
    
    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data
        if (!formData.email) return toast.error('Email is required');
        if (!formData.username) return toast.error('Username is required');
        if (!formData.password) return toast.error('Password is required');
        if (!formData.parentName) return toast.error('Parent name is required');
        if (!formData.mobileNo || !/^\d{10}$/.test(formData.mobileNo)) {
            return toast.error('Valid mobile number (10 digits) is required');
        }
        if (!formData.childName) return toast.error('Child name is required');
        if (!formData.schoolName) return toast.error('School name is required');
        if (!formData.city) return toast.error('City is required');
        if (!formData.className || formData.className === '0') {
            return toast.error('Class selection is required');
        }
        if (showOtherInput && !formData.otherHobby) {
            return toast.error('Please specify the other hobby');
        }

        // Validate age
        const age = calculateAge(formData.dateOfBirth);
        if (age < 6 || age > 16) {
            return toast.error('Child must be between 6 to 16 years old');
        }

        // Update formData with calculated age
        const updatedFormData = { ...formData, age };
        setFormData(updatedFormData);

        // Submit form data
        const success = await sendFormData(updatedFormData);
        if (success) {
            toast.success('Form submitted successfully!');
            setFormData({
                email: '',
                username: '',  
                password: '',
                parentName: '',
                mobileNo: '',
                childName: '',
                schoolName: '',
                city: '',
                className: '',
                hobbies: [],
                otherHobby: '',
                dateOfBirth: '',
                age: null,
            });
             navigate('/');
        } else {
            toast.error('Failed to submit the form. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center rounded-tr-[40px] rounded-bl-[40px]">
            <ToastContainer />
            <div className="bg-gray-50 my-10 p-8 rounded-lg shadow-lg rounded-tl-[40px] rounded-br-[40px] border border-gray-200 min-w-[90%] md:min-w-[65%] md:px-20">
                <h1 className="text-4xl font-bold text-center mb-6 text-purple-700">Sign Up</h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="email" className="block mb-2">Email:</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="block mb-2">Username:</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2">Password:</label>
                            <input
                                type='password'
                                name="password"
                                id="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                            />
                        </div>

                    </div>

                    <h3 className='text-2xl font-bold text-center pt-12 text-pink-500'>Parent</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="parentName" className="block mb-2">Parent Name:</label>
                            <input
                                type="text"
                                name="parentName"
                                id="parentName"
                                placeholder="Parent Name"
                                value={formData.parentName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="mobileNo" className="block mb-2">Mobile No.:</label>
                            <input
                                type="text"
                                name="mobileNo"
                                id="mobileNo"
                                maxLength="10"
                                placeholder="Mobile No."
                                value={formData.mobileNo}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                            />
                        </div>
                    </div>

                    <h3 className='text-2xl font-bold text-center pt-12 text-pink-500'>Child</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label htmlFor="childName" className="block mb-2">Child Name:</label>
                            <input
                                type="text"
                                name="childName"
                                id="childName"
                                placeholder="Child Name"
                                value={formData.childName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="schoolName" className="block mb-2">School Name:</label>
                            <input
                                type="text"
                                name="schoolName"
                                id="schoolName"
                                placeholder="School Name"
                                value={formData.schoolName}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="city" className="block mb-2">City:</label>
                            <input
                                type="text"
                                name="city"
                                id="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="dateOfBirth" className="block mb-2">Date of Birth:</label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="classSelect" className="block mb-2">Class:</label>
                            <select
                                name="className"
                                id="classSelect"
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                                required
                            >
                                <option value={0}>Select Class</option>
                                <option value={1}>Class 1</option>
                                <option value={2}>Class 2</option>
                                <option value={3}>Class 3</option>
                                <option value={4}>Class 4</option>
                                <option value={5}>Class 5</option>
                                <option value={6}>Class 6</option>
                                <option value={7}>Class 7</option>
                                <option value={8}>Class 8</option>
                                <option value={9}>Class 9</option>
                                <option value={10}>Class 10</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="hobbies" className="block mb-2">Select Hobbies:</label>
                            <select
                                multiple
                                name="hobbies"
                                id="hobbies"
                                onChange={handleHobbiesChange}
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                            >
                                <option value="Reading">Reading</option>
                                <option value="Sports">Sports</option>
                                <option value="Music">Music</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {showOtherInput && (
                        <div>
                            <label htmlFor="otherHobby" className="block mb-2">Specify Other Hobby:</label>
                            <input
                                type="text"
                                name="otherHobby"
                                id="otherHobby"
                                placeholder="Specify Other Hobby"
                                value={formData.otherHobby}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                            />
                        </div>
                    )}


                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    I have an account {" "}
                    <a href="/login" className="text-pink-500 hover:text-pink-600">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;

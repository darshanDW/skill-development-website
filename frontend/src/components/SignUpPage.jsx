import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        parentName: '',
        mobileNo: '',
        childName: '',
        schoolName: '',
        city: '',
        class: '',
        hobbies: [],
        otherHobby: ''
    });
    const [showOtherInput, setShowOtherInput] = useState(false);

    const notify = (message) => toast.error(message);

    useEffect(() => {
        const classSelect = document.getElementById('classSelect');

        const handleClassChange = () => {
            const selectedOptions = Array.from(classSelect.selectedOptions);
            const isOtherSelected = selectedOptions.some(option => option.value === 'Other');
            setShowOtherInput(isOtherSelected);
        };

        classSelect.addEventListener('change', handleClassChange);

        return () => {
            classSelect.removeEventListener('change', handleClassChange);
        };
    }, []);

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
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.email) {
            notify('Email is required');
            return;
        }
        if (!formData.username) {
            notify('Username is required');
            return;
        }
        if (!formData.password) {
            notify('Password is required');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            notify('Passwords do not match');
            return;
        }
        if (!formData.parentName) {
            notify('Parent name is required');
            return;
        }
        if (!formData.mobileNo || !/^\d{10}$/.test(formData.mobileNo)) {
            notify('Valid mobile number (10 digits) is required');
            return;
        }
        if (!formData.childName) {
            notify('Child name is required');
            return;
        }
        if (!formData.schoolName) {
            notify('School name is required');
            return;
        }
        if (!formData.city) {
            notify('City is required');
            return;
        }
        if (!formData.class) {
            notify('Class selection is required');
            return;
        }
        if (showOtherInput && !formData.otherHobby) {
            notify("Please specify the other hobby");
            return;
        }

        // If all validations pass
        console.log('Form Data:', formData);
        toast('Form submitted successfully!');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-200 via-pink-200 to-orange-200">
            <ToastContainer />
            <div className="bg-white my-10 p-8 rounded-lg shadow-lg border border-gray-200 min-w-[90%] md:min-w-[75%]">
                <h1 className="text-4xl font-bold text-center mb-6 text-purple-700">
                    Sign Up
                </h1>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password:</label>
                            <input
                                type='password'
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                            />
                        </div>
                    </div>

                    <h3 className='text-2xl font-bold text-center text-pink-500'>Parent</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                    <h3 className='text-2xl font-bold text-center text-pink-500'>Child</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <label htmlFor="class" className="block mb-2">Class:</label>
                            <select
                                name="class"
                                id="class"
                                value={formData.class}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                                required
                            >
                                <option value="" disabled>Select Class</option>
                                <option value="1st">1st</option>
                                <option value="2nd">2nd</option>
                                <option value="3rd">3rd</option>
                                <option value="4th">4th</option>
                                <option value="5th">5th</option>
                                <option value="6th">6th</option>
                                <option value="7th">7th</option>
                                <option value="8th">8th</option>
                                <option value="9th">9th</option>
                                <option value="10th">10th</option>
                            </select>
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
                            <label htmlFor="classSelect" className="block mb-2">Hobbies:</label>
                            <select
                                id="classSelect"
                                multiple={true}
                                value={formData.hobbies}
                                onChange={handleHobbiesChange}
                                className="w-full px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                                required
                            >
                                <option value="Swimming">Swimming</option>
                                <option value="Singing">Singing</option>
                                <option value="Dancing">Dancing</option>
                                <option value="Playing Instrument">Playing Instrument</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        {showOtherInput && (
                            <div>
                                <label htmlFor="otherHobby" className="block mb-2">Please specify if 'Other':</label>
                                <input
                                    type="text"
                                    name="otherHobby"
                                    id="otherHobby"
                                    placeholder="Please specify if 'Other'"
                                    value={formData.otherHobby}
                                    onChange={handleChange}
                                    className="mt-2 w-full h-12 px-4 py-2 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#f9f8f4] shadow-sm"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mr-2 h-5 w-5"
                            required
                        />
                        <label htmlFor="terms" className="text-gray-700">I agree to the Terms and Conditions</label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-pink-300 text-gray-800 py-2 rounded-md hover:bg-pink-500 transition duration-200 shadow-md"
                    >
                        Sign Up 
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="text-gray-700 hover:text-gray-800">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;

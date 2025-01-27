import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import profile from '../assets/profile.png';
import { useEffect } from 'react';
import axios from 'axios';
 import LoginPage from './LoginPage';
import { backendUrl } from '../App';
const Profile = () => {
  // Profile data object
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    Name: "",
    standard: '',
    hobbies: '',
    school: '',
    contact: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log('Token expired');
        toggleModal()
      }
      else {
        getProfile()

      }



    }
    else {
      toggleModal()
    }

  }, [])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // Ensure you import the jwt-decode library

  const getProfile = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');

      // Check if the token is valid
      if (!token || typeof token !== 'string') {
        throw new Error('Invalid token: Must be a non-empty string');
      }

      // Verify the token structure
      if (token.split('.').length !== 3) {
        throw new Error('Invalid token structure');
      }

      // Decode the token to extract the user ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;  // Ensure this key matches the JWT structure
      console.log('Decoded User ID:', userId);

      // Send a GET request to fetch the profile
      const res = await axios.get(`${backendUrl}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + token,
        }
      });

      // Check for successful response
      if (res.status === 200) {
        const { name, class: standard, hobbies, school_name, DOB } = res.data.child;

        // Update state or UI with the retrieved data
        setProfileData({
          Name: name,
          standard: standard,
          hobbies: hobbies.join(', '),
          school: school_name,
          DOB: DOB,
        });
      }

      console.log(res.data);  // Log response data for debugging

    } catch (err) {
      console.error('Error fetching profile:', err);
      if (err.response) {
        console.error('Server responded with an error:', err.response.data);
      }
      // Handle errors appropriately (e.g., display error message in UI)
    }
  };


  return (
    <div className="relative overflow:hidden max-w-full sm:w-4/5 md:w-3/5 mx-auto my-8 sm:my-12 bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md">

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-0 left-0 w-16 h-16 bg-pink-400 rounded-full animate-spiral"></div>
        <div className="absolute top-20 left-20 w-10 h-10 bg-yellow-300 rounded-full animate-spiral"></div>
        <div className="absolute top-40 right-40 w-12 h-12 bg-blue-300 rounded-full animate-spiral"></div>
        <div className="absolute top-10 right-10 w-14 h-14 bg-purple-400 rounded-full animate-spiral"></div>
      </div>


      <img src={profile} alt="Background Header" className="w-full object-cover" />

      <div className="flex flex-col sm:flex-row items-center mt-4">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_H26KHfrYmPL2e1vgT7KxGEYssvlx5-I2NKN4Mq2agg7LbsY-xWmV2ZYPZfBV_0eT0p8&usqp=CAU"
          alt="Profile Picture"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full"
        />
        <div className="mt-2 sm:mt-0 sm:ml-4 text-center sm:text-left">
          <h1 className="text-lg sm:text-xl font-semibold">{`${profileData.Name}`}</h1>
          <p className="text-gray-600">Student</p>
        </div>
      </div>

      <form id="profile-form" className="mt-6">
        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row">
          <label htmlFor="name" className="w-full sm:w-1/3 font-bold mb-1 sm:mb-0"> Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.Name}
            disabled
            className="w-full sm:w-2/3 p-2 bg-white border border-gray-300 rounded"
          />
        </div>


        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row">
          <label htmlFor="standard" className="w-full sm:w-1/3 font-bold mb-1 sm:mb-0">Standard *</label>
          <input
            type="text"
            id="standard"
            name="standard"
            value={profileData.standard}
            required
            disabled
            className="w-full sm:w-2/3 p-2 bg-white border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row">
          <label htmlFor="hobbies" className="w-full sm:w-1/3 font-bold mb-1 sm:mb-0">Hobbies *</label>
          <input
            type="text"
            id="hobbies"
            name="hobbies"
            value={profileData.hobbies}
            required
            disabled
            className="w-full sm:w-2/3 p-2 bg-white border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row">
          <label htmlFor="school" className="w-full sm:w-1/3 font-bold mb-1 sm:mb-0">School *</label>
          <input
            type="text"
            id="school"
            name="school"
            value={profileData.school}
            required
            disabled
            className="w-full sm:w-2/3 p-2 bg-white border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row">
          <label htmlFor="DOB" className="w-full sm:w-1/3 font-bold mb-1 sm:mb-0">DOB *</label>
          <input
            type="text"
            id="DOB"
            name="DOB"
            value={new Date(profileData.DOB).toLocaleDateString('en-GB')}
            required
            disabled
            className="w-full sm:w-2/3 p-2 bg-white border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col sm:flex-row justify-end mt-4">
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mb-2 sm:mb-0 sm:mr-2">Update</button>
          <button type="button" className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      </form>
      {
        isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              {/* Render the LoginPage and pass closeModal prop */}
              <LoginPage closeModal={toggleModal} />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Profile;

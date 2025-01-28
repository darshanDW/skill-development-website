import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { backendUrl} from '../../App';
import LoginPage from '../LoginPage';
import { jwtDecode } from 'jwt-decode';

function Admin_home() {
  const [parents, setparents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     const currentTime = Date.now() / 1000;
  //     if (decodedToken.exp < currentTime) {
  //        toggleModal()
  //     }
  //     else {
  //       fetchData()

  //     }



  //   }
  //   else {
  //     toggleModal()
  //   }

  // }, [])
  useEffect(() => {
    const fetchparents = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await axios.get(`${backendUrl}/admin/all_user`, {
          headers: {
            "Authorization": 'Bearer ' + token,
          }
        });
        console.log(response.data)
        setparents(response.data.users);
      } catch (error) {
        console.error('Error fetching parents:', error);
      }
    };

    fetchparents();
  }, []);

 
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text('User List', 20, 10);
    doc.autoTable({
      head: [['Name', 'Email', 'Phone']],
      body: parents.map(user => [user.name, user.email, user.phone_number]),
    });
    doc.save('user_list.pdf');
  };

  return (
    <div>
      <h1>Admin Home</h1>
      <button onClick={downloadPDF} className="bg-blue-500 text-white py-2 px-4 rounded-md">Download PDF</button>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email3</th>
            <th className="py-2 px-4 border-b">Phone_NO</th>
          </tr>
        </thead>
        <tbody>
          {parents.map(user => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
}

export default Admin_home;
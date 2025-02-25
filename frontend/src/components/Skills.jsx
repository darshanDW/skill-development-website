import React, { useState, useEffect, useContext } from 'react';
import { backendUrl, UserContext } from '../App';
import UploadForm from './UploadForm';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'
import LoginPage from './LoginPage';

const SkillsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const { isAdmin } = useContext(UserContext);
  const [skillsData, setSkillsData] = useState([]);
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await axios.get(`${backendUrl}/admin/all_content`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + token,
        }
      });

      setSkillsData(response.data.content);
     } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
         toggleModal()
      }
      else {
        fetchData()

      }



    }
    else {
      toggleModal()
    }

  }, [])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleUploadClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    fetchData();
    setIsFormOpen(false);
  };

  const handleDelete = async (subjectId, topicId, pdfId) => {

    const confirmDelete = window.confirm("Do you really want to delete this PDF?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

      const response = await axios.delete(`${backendUrl}/admin/delete_link`, {


        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Bearer ' + token,
        },
        data: { // Axios allows sending body data in DELETE requests via the `data` property
          subjectId,
          topicId,
          pdfId,
        },
      })
      if (response.status === 200) {
        // Refresh skillsData after deletion
        setSkillsData((prevSkillsData) =>
          prevSkillsData.map((subject) => {
            if (subject._id === subjectId) {
              const updatedTopics = subject.topics
                .map((topic) => {
                  if (topic._id === topicId) {
                    return {
                      ...topic,
                      pdfs: topic.pdfs.filter((pdf) => pdf._id !== pdfId),
                    };
                  }
                  return topic;
                })
                .filter((topic) => topic.pdfs.length > 0); // Remove empty topics

              return updatedTopics.length > 0
                ? { ...subject, topics: updatedTopics }
                : null; // Remove empty subjects
            }
            return subject;
          }).filter(Boolean) // Remove null subjects
        );
       }
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {isAdmin && (
          <div className="mb-6">
            <button
              onClick={handleUploadClick}
              className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-200">
              UPLOAD
            </button>
            {isFormOpen && <UploadForm onClose={handleCloseForm} />}
          </div>
        )}
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">User Skills</h1>
        <div className="space-y-6">
          {skillsData.map((subjectData, index) => (
            <details
              key={index}
              className="p-4 bg-white rounded-lg shadow-md border border-gray-300">
              <summary className="text-xl font-semibold cursor-pointer mb-2 text-gray-700">
                {subjectData.subject}
              </summary>
              <div className="mt-2 space-y-4">
                {subjectData.topics.map((topic, topicIndex) => (
                  <details
                    key={topicIndex}
                    className="ml-4 p-4 bg-gray-50 rounded-md shadow-sm border border-gray-200">
                    <summary className="cursor-pointer text-lg font-medium text-blue-600">
                      {topic.name}
                    </summary>
                    <div className="mt-2 space-y-2">
                       {topic.pdfs.map((pdf, pdfIndex) => (
                        <p key={pdfIndex} className=" flex ml-4 text-gray-700">
                          PDF Link   : <a
                            href={pdf.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline hover:text-blue-700">
                            {pdf.name}
                          </a>
                          <br />
                          {isAdmin && <button className="flex-row ml-1 px-1  bg-pink-500 text-white text-sm rounded-md hover:bg-pink-600 transition duration-200" onClick={() => handleDelete(subjectData._id, topic._id, pdf._id)}
                          >delete</button>}
                        </p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
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

export default SkillsPage;

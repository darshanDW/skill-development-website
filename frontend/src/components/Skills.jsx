import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../App';
import UploadForm from './UploadForm';
import axios from 'axios';

const SkillsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { isAdmin } = useContext(UserContext);
  const [skillsData, setSkillsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        const response = await axios.get('http://localhost:3000/admin/all_content', {
          headers: {
            "Content-Type": "application/json",
            "Authorization": 'Bearer ' + token,
          }
        });

        setSkillsData(response.data.content);
        console.log('Skills data:', response.data.content);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleUploadClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

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
                        <p key={pdfIndex} className="ml-4 text-gray-700">
                          PDF Link: <a 
                            href={pdf.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 underline hover:text-blue-700">
                            {pdf.link}
                          </a>
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
    </div>
  );
};

export default SkillsPage;

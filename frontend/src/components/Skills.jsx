import React, { useState, useContext } from 'react';
import { UserContext } from '../App';
import UploadForm from './UploadForm';


const SkillsPage = () => {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const {isAdmin}=useContext(UserContext);

  const [skillsData] = useState([
    {
      subject: 'Mathematics',
      topics: [
        { name: 'Algebra', pdfLink: 'https://example.com/algebra.pdf' },
        { name: 'Geometry', pdfLink: 'https://example.com/geometry.pdf' },
      ],
    },
    {
      subject: 'Science',
      topics: [
        { name: 'Physics', pdfLink: 'https://example.com/physics.pdf' },
        { name: 'Chemistry', pdfLink: 'https://example.com/chemistry.pdf' },
      ],
    },
  ]);


  const handleUploadClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    
    <div className="p-6 bg-gray-100 min-h-screen">
      <div>
        {
         isAdmin && (<button 
          onClick={handleUploadClick}
         className='w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-200'>
          UPLOAD
        </button>)
        }
         {isFormOpen && <UploadForm onClose={handleCloseForm} />}
      </div>
      <h1 className="text-3xl font-bold text-center mb-8">User Skills</h1>
      <div className="space-y-6">
        {skillsData.map((subjectData, index) => (
          <details key={index} className="p-4 bg-white rounded-lg shadow-md">
            <summary className="text-xl font-semibold cursor-pointer mb-4">{subjectData.subject}</summary>
            <div className="mt-2">
              {subjectData.topics.map((topic, topicIndex) => (
                <details key={topicIndex} className="mb-2">
                  <summary className="cursor-pointer text-lg font-medium text-blue-600">{topic.name}</summary>
                  <p className="mt-2 text-gray-700">
                    PDF Link: <a href={topic.pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">{topic.pdfLink}</a>
                  </p>
                </details>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;

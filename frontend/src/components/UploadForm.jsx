import React, { useState } from 'react';
import { gapi } from 'gapi-script';


const CLIENT_ID = process.env.CLIENT_ID; // Replace with your Google Client ID
const API_KEY = process.env.API_KEY; // Replace with your API Key
const SCOPE = 'https://www.googleapis.com/auth/drive.file';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];

const UploadForm = ({ onClose }) => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [file, setFile] = useState(null);

  const initializeGapi = () => {
    return new Promise((resolve, reject) => {
      gapi.load('client:auth2', async () => {
        try {
          await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPE,
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    });
  };

  const handleAuthClick = async () => {
    try {
      await initializeGapi();
      const authInstance = gapi.auth2.getAuthInstance();
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }
    } catch (error) {
      console.error('Error during authorization:', error);
      alert('Authorization failed.');
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      const accessToken = gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse().access_token;

      const metadata = {
        name: file.name,
        mimeType: file.type,
        parents: ['1OJjKDCNZl2i6Q_VyrEYL5rnLVZPkLqRd'], // Replace with your folder ID
      };

      const form = new FormData();
      form.append(
        'metadata',
        new Blob([JSON.stringify(metadata)], { type: 'application/json' })
      );
      form.append('file', file);

      const response = await fetch(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: form,
        }
      );

      const result = await response.json();
      console.log(result)
      alert(`File uploaded successfully! File ID: ${result.id}`);
      onClose();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File upload failed.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleAuthClick();
    await handleFileUpload();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-xl font-bold mb-4">Upload File</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Subject Name</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Topic Name</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Select File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 py-2 px-4 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded-md"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;

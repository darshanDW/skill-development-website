import './App.css'; // You can still have a CSS file for any global styles
import Footer from './components/Footer';
import Routing from './Router/Routing';
import Navbar from './components/Navbar';
import AdminNavbar from './components/Admin/AdminNavbar';
import React, { useEffect } from 'react';
import { useState } from 'react';


export const UserContext = React.createContext(null);
export const backendUrl = import.meta.env.VITE_BACKEND_URL;




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
      if (decodedToken.AdminId) {
        setIsAdmin(true);
      } else if (decodedToken.UserId) {
        setIsLoggedIn(true);
      }
    }
  }, []);
  
  return (
    <UserContext.Provider value={{ isLoggedIn, isAdmin, setIsLoggedIn }}>
      <div className="flex flex-col min-h-screen bg-gradient-to-tr from-lime-100 to-pink-200">
        {isAdmin ? 
        <AdminNavbar /> 
        : <Navbar />}
        <main className="flex-grow p-4 md:p-8 lg:p-4">
          <Routing />
        </main>
        <Footer className="bg-gray-800 text-white text-center py-4 mt-4" />
      </div>
    </UserContext.Provider>
  );
}

export default App;




















// import './App.css'; // You can still have a CSS file for any global styles
// import Footer from './components/Footer';
// import Routing from './Router/Routing';
// import Navbar from './components/Navbar';
// import React, { useEffect } from 'react';
// import { useState } from 'react';

// export const UserContext = React.createContext(null);

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
  
//   useEffect(() => {
//     const token = localStorage.getItem('token'); // Retrieve token from localStorage
//     if (token) {
//       setIsLoggedIn(true); // Set login state to true if token exists
//     }
//   }, []);
//   return (
//     <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       <div className="flex flex-col min-h-screen bg-gradient-to-tr from-lime-100 to-pink-200">
//         <Navbar />
//         <main className="flex-grow p-4 md:p-8 lg:p-4">
//           <Routing />
//         </main>
//         <Footer className="bg-gray-800 text-white text-center py-4 mt-4" />
//       </div>
//     </UserContext.Provider>
//   );
// }

// export default App;

import './App.css'; // You can still have a CSS file for any global styles
import Footer from './components/Footer';
import Routing from './Router/Routing';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-lime-100 to-pink-200">
      
  <Navbar />
  <main className="flex-grow p-4 md:p-8 lg:p-4"> 
    <Routing />
  </main>
  <Footer className="bg-gray-800 text-white text-center py-4 mt-4" /> 
</div>

  );
}

export default App;

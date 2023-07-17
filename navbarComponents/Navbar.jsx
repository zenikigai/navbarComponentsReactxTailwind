import { useState } from 'react';
import Sidebar from './SideBar';


const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className="bg-gray-900 p-4 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-xl font-bold">My Logo</div>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
        {/* Pass isOpen and toggleSidebar props to the Sidebar */}
        <div className="md:hidden flex items-center absolute top-2 right-2">
          <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

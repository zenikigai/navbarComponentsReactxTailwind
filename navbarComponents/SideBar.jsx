import { useState, useEffect, useRef } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className={`md:hidden p-4 fixed top-0 left-0 z-50 ${
          isOpen ? "hidden" : ""
        }`}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          )}
        </svg>
      </button>

      {/* Sidebar Menu */}
      {isOpen && (
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 z-40 w-64 bg-gray-900 text-white h-screen transition transform ease-in-out duration-700 delay-700 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            className="absolute top-4 right-4 md:hidden focus:outline-none"
            onClick={toggleSidebar}
            aria-label="Close Sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav className="p-4">
            <ul>
              <li className="my-2">
                <a href="#home" onClick={closeSidebar}>
                  Home
                </a>
              </li>
              <li className="my-2">
                <a href="#about" onClick={closeSidebar}>
                  About
                </a>
              </li>
              <li className="my-2">
                <a href="#services" onClick={closeSidebar}>
                  Services
                </a>
              </li>
              <li className="my-2">
                <a href="#contact" onClick={closeSidebar}>
                  Contact
                </a>
              </li>
              {/* Add more menu items here */}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;

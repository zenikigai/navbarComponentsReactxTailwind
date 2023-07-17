import { useState, useEffect, useRef } from "react";

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const handleMenuItemClick = () => {
    // Close the menu when a menu item is clicked
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <div className="absolute top-0 right-0 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          aria-controls="mobile-menu"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          {!isOpen ? (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              className="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="bg-white divide-y divide-gray-300 absolute top-12 right-2 w-48 rounded-md shadow-lg py-2 z-10 md:hidden"
        >
          {/* Mobile menu items */}
          <a
            href="#home"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleMenuItemClick}
          >
            Home
          </a>
          <a
            href="#about"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleMenuItemClick}
          >
            About
          </a>
          <a
            href="#services"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleMenuItemClick}
          >
            Services
          </a>
          <a
            href="#contact"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleMenuItemClick}
          >
            Contact
          </a>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;

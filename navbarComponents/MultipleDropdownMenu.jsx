/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";

const Submenu = ({ label, onClick }) => {
  return (
    <a
      href="#"
      className="block py-1 pl-6 text-gray-600 hover:bg-gray-100"
      onClick={onClick}
    >
      {label}
    </a>
  );
};

const DropdownItem = ({ label, children, hideMenu, hideSubmenu, onHideSubmenu }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const submenuRef = useRef(null);

  const handleSubmenuToggle = () => {
    setIsSubMenuOpen((prevState) => !prevState);
  };

  const handleMenuItemClick = () => {
    setIsSubMenuOpen(false);
    hideMenu();
    onHideSubmenu();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!submenuRef.current.contains(event.target)) {
        setIsSubMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (hideSubmenu) {
      setIsSubMenuOpen(false);
    }
  }, [hideSubmenu]);

  return (
    <div className="relative" ref={submenuRef}>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmenuToggle}
      >
        {label}
      </button>

      {isSubMenuOpen && (
        <div className="origin-left absolute mt-0 ml-48 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {children.map((child) => (
              <Submenu
                key={child.label}
                label={child.label}
                onClick={handleMenuItemClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Dropdown = () => {
  const menuItems = [
    {
      label: "Menu Item 1",
      children: [
        {
          label: "Submenu 1.1",
          children: [
            {
              label: "Sub-submenu 1.1.1",
              children: [],
            },
            {
              label: "Sub-submenu 1.1.2",
              children: [],
            },
          ],
        },
        {
          label: "Submenu 1.2",
          children: [],
        },
      ],
    },
    {
      label: "Menu Item 2",
      children: [],
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hideSubmenu, setHideSubmenu] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleOutsideClick = (event) => {
    if (!dropdownRef.current.contains(event.target)) {
      setIsMenuOpen(false);
      setHideSubmenu(false);
    }
  };

  const hideMenu = () => {
    setIsMenuOpen(false);
  };

  const hideSubmenuHandler = () => {
    setHideSubmenu(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="dropdown relative" ref={dropdownRef}>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleDropdownToggle}
      >
        Toggle Menu
      </button>

      {isMenuOpen && (
        <div className="origin-top-right absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {menuItems.map((menuItem) => (
              <DropdownItem
                key={menuItem.label}
                label={menuItem.label}
                children={menuItem.children}
                hideMenu={hideMenu}
                hideSubmenu={hideSubmenu && menuItem.label === "Menu Item 1"}
                onHideSubmenu={hideSubmenuHandler}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

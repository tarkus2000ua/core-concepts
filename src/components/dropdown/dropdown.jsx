// dropdown.jsx
import { useState, useEffect, useRef } from 'react';
import './dropdown.css';

const Dropdown = ({ options = [], selection, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(selection || '');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (itemValue) => {
    if (itemValue !== selectedItem) {
      setSelectedItem(itemValue);
      onSelect && onSelect(itemValue);
      setIsOpen(false);
    }
  };

  if (!options.length) {
    return null;
  }

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        className={`dropdown-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selectedItem || 'Select Genre'}</span>
        <span className="caret"></span>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option.value)}
              className="dropdown-item"
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

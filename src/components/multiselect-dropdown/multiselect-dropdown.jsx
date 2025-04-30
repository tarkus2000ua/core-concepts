import { useState, useEffect, useRef } from 'react';
import './multiselect-dropdown.css';

const MultiselectDropdown = ({ options = [], selection = [], onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (itemValue) => {
    const newSelection = selection.includes(itemValue)
      ? selection.filter((item) => item !== itemValue)
      : [...selection, itemValue];
    onSelect?.(newSelection);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const displayText =
    selection.length > 0 ? selection.join(', ') : 'Select Genre';

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button
        type="button"
        className={`dropdown-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{displayText}</span>
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
              <input
                type="checkbox"
                checked={selection.includes(option.value)}
                readOnly
                className="checkbox-input"
              />
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MultiselectDropdown;

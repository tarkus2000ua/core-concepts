import { useState, useEffect, useRef } from 'react';
import './sort-control.css';

const SortControl = ({ options = [], selection, onSelect }) => {
  const [selectedItem, setSelectedItem] = useState(
    selection || options[0]?.value
  );
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (itemValue) => {
    if (itemValue !== selectedItem) {
      setSelectedItem(itemValue);
      onSelect && onSelect(itemValue);
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  if (!options.length) {
    return null;
  }

  return (
    <div className="sort-control" ref={selectRef}>
      <label>SORT BY</label>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{options.find(item => item.value === selectedItem).name}</span>
        <span className={`caret ${isOpen ? "open" : ""}`}></span>
      </button>
      {isOpen && (
        <ul className="options-list">
          {options.map((option) => (
            <li key={option.id} onClick={() => handleSelect(option.value)} className="option-item">
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortControl;

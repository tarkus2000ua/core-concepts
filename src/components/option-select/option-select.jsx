import { useState } from 'react';
import './option-select.css';

const OptionSelect = ({ options = [], selection, onSelect, ...props }) => {
  const [selectedItem, setSelectedItem] = useState(selection || options[0]?.value);

  const handleOptionClick = (itemValue) => {
    if(itemValue !== selectedItem) {
        setSelectedItem(itemValue);
        onSelect && onSelect(itemValue);
    }
  }

  return (
    <div className="option-select" {...props}>
      {options.map((item) => (
        <div
          className={`option ${item.value === selectedItem ? 'active' : ''}`}
          key={item.id}
          onClick={() => handleOptionClick(item.value)}
        >
          {item.value}
        </div>
      ))}
    </div>
  );
};

export default OptionSelect;

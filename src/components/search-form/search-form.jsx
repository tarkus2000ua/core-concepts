import { useState } from 'react';
import './search-form.css'

const SearchForm = ({ initialValue, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue || '');
  const placeholder = 'What do you want to watch?';

  const handleInputChange = () => {
    onSearch(searchTerm);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
        onSearch(searchTerm);
    }
  };

  return (
    <div className='search-form'>
      <input type="text" placeholder={placeholder} value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} onKeyUp={handleKeyPress}/>
      <button onClick={handleInputChange}>Search</button>
    </div>
  );
};

export default SearchForm;

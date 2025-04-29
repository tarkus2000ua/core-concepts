import { useState } from 'react';
import './search-form.css'
const SEARCH_PLACEHOLDER = 'What do you want to watch?';

const SearchForm = ({ initialValue, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue || '');
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form className='search-form' onSubmit={handleFormSubmit}>
      <input type="search" placeholder={SEARCH_PLACEHOLDER} value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
      <button type='submit'>Search</button>
    </form>
  );
};

export default SearchForm;

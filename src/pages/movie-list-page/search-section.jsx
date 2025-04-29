import { useOutletContext } from "react-router-dom";
import SearchForm from '../../components/search-form/search-form';

const SearchSection = () => {
  const { searchQuery, handleSearch } = useOutletContext();
  return (
    <div className="search">
      <label>FIND YOUR MOVIE</label>
      <SearchForm initialValue={searchQuery} onSearch={handleSearch} />
    </div>
  );
};

export default SearchSection;

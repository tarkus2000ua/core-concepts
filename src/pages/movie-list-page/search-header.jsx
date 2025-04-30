import { useNavigate } from 'react-router-dom';
import Logo from './logo';

const SearchHeader = ({ hasSelectedMovie, onAddMovie, onCloseDetails }) => {
  const navigate = useNavigate();
  return (
    <div className="search-header">
      <Logo />
      {!hasSelectedMovie ? (
        <button className="add-movie-btn" onClick={() => navigate('/new')}>+ ADD MOVIE</button>
      ) : (
        <div onClick={onCloseDetails} className="glass">
          &#x2315;
        </div>
      )}
    </div>
  );
};

export default SearchHeader;

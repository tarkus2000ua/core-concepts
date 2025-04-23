import Logo from "./logo";

const SearchHeader = ({ hasSelectedMovie, onAddMovie, onCloseDetails }) => (
  <div className="search-header">
    <Logo />
    {!hasSelectedMovie ? (
      <button className="add-movie-btn">+ ADD MOVIE</button>
    ) : (
      <div onClick={onCloseDetails} className="glass">
        &#x2315;
      </div>
    )}
  </div>
);

export default SearchHeader;

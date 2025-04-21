import { useState } from 'react';
import './movie-tile.css';
import { getYear } from '../../utils/datetime.utils';

const MovieTile = ({ movie, onTileClick }) => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setIsMenuOpened((prev) => !prev);
  };

  const handleMenuAction = (action) => (e) => {
    e.stopPropagation();
    console.log(action);
    setIsMenuOpened(false);
  };

  return (
    <div className="movie-tile" onClick={() => onTileClick(movie)}>
      <img className="poster" src={movie.poster_path} />
      <button
        title="menu-button"
        className="menu-handle"
        onClick={handleMenuClick}
      />
      {isMenuOpened && (
        <div className="menu">
          <button title='close-menu-button' className="close-menu" onClick={handleMenuClick}>
            ×
          </button>
          <ul>
            <li onClick={handleMenuAction('Edit')}>Edit</li>
            <li onClick={handleMenuAction('Delete')}>Delete</li>
          </ul>
        </div>
      )}
      <div className="tile-footer">
        <div className="title-year-container">
          <div className="movie-title">{movie.title}</div>
          <div className="movie-year">{getYear(movie.release_date)}</div>
        </div>
        <div title={movie.genres.join(', ')} className="genres">
          {movie.genres.join(', ')}
        </div>
      </div>
    </div>
  );
};

export default MovieTile;

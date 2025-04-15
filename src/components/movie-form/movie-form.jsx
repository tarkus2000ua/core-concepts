import { useState } from 'react';
import './movie-form.css';
import MultiselectDropdown from '../multiselect-dropdown/multiselect-dropdown';

const genreOptions = [
    { id: 1, value: 'Action' },
    { id: 2, value: 'Adventure' },
    { id: 3, value: 'Comedy' },
    { id: 4, value: 'Drama' },
    { id: 5, value: 'Horror' },
    { id: 6, value: 'Sci-Fi' },
  ];

const MovieForm = ({ movie = {}, onSubmit }) => {
  const [selectedGenre, setSelectedGenre] = useState(movie.genres || []);
  const [dateValue, setDateValue] = useState(movie.releaseDate || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target));
    formData.genres = selectedGenre;
    console.log(formData);
    onSubmit && onSubmit(formData);
  };

  const handleReset = () => {
    // Reset the genres selection to initial movie genres or empty array
    setSelectedGenre(movie.genres || []);
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit} onReset={handleReset}>
      <div className="form-row">
        <div className="form-group">
          <label>TITLE</label>
          <input
            name="title"
            type="text"
            placeholder="Title"
            defaultValue={movie.title ?? ''}
          />
        </div>
        <div className="form-group">
          <label htmlFor="releaseDate">RELEASE DATE</label>
          <div className="date-input-container">
            <input
              id="releaseDate"
              name="releaseDate"
              type="date"
              data-testid="date-input"
              aria-label="Release date"
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
              className={`date-input ${!dateValue ? 'empty' : ''}`}
            />
            {!dateValue && (
              <span className="date-placeholder">Select Date</span>
            )}
          </div>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>MOVIE URL</label>
          <input
            name="poster_path"
            type="url"
            placeholder="https://"
            defaultValue={movie.posterUrl ?? ''}
          />
        </div>
        <div className="form-group">
          <label>RATING</label>
          <input
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="10"
            defaultValue={movie.rating ?? ''}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="genre-select">GENRE</label>
          <input type="hidden" name="genres" value={selectedGenre} />
          <MultiselectDropdown
            id="genre-select"
            options={genreOptions}
            selection={selectedGenre}
            onSelect={setSelectedGenre}
          />
        </div>
        <div className="form-group">
          <label>RUNTIME</label>
          <input
            name="runtime"
            type="number"
            placeholder="minutes"
            defaultValue={movie.runtime ?? ''}
          />
        </div>
      </div>
      <div className="form-group">
        <label>OVERVIEW</label>
        <textarea
          name="description"
          placeholder="Movie description"
          defaultValue={movie.description ?? ''}
          rows={9}
        ></textarea>
      </div>
      <div className="form-actions">
        <button type="reset" className="reset-btn">
          RESET
        </button>
        <button type="submit" className="submit-btn">
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default MovieForm;

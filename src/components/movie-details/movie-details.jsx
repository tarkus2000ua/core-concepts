import './movie-details.css';

const MovieDetails = ({ movie }) => {
  return (
    <div className="movie-details">
      <img className="poster" src={movie.posterUrl} />
      <div className="movie-info">
        <div className="title-container">
          <h2 className="movie-title">{movie.title}</h2>
          <div className="rating">{movie.rating}</div>
        </div>
        <div title={movie.genres.join(', ')} className="genres">
          {movie.genres.join(', ')}
        </div>
        <div className="year-runtime-container">
          <div className="movie-year">{movie.year}</div>
          <div className="runtime" data-testid="runtime">
            <span className="hours">{Math.trunc(movie.runtime / 60)}h</span>
            &nbsp;<span className="minutes">{movie.runtime % 60}min</span>
          </div>
        </div>
        <div className='description'>{movie.description}</div>
      </div>
    </div>
  );
};

export default MovieDetails;

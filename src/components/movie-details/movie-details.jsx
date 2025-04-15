import './movie-details.css';

const MovieDetails = ({ movie }) => {
  const formatRuntime = (runtime) => {
    const hours = Math.trunc(runtime / 60);
    const minutes = runtime % 60;
    return { hours, minutes };
  };

  const { hours, minutes } = formatRuntime(movie.runtime);

  return (
    <div className="movie-details">
      <img className="poster" src={movie.poster_path} alt='poster'/>
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
            <span className="hours">{hours}h</span>
            &nbsp;<span className="minutes">{minutes}min</span>
          </div>
        </div>
        <div className="description">{movie.description}</div>
      </div>
    </div>
  );
};

export default MovieDetails;

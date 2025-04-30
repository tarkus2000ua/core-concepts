import { Outlet, useLoaderData } from 'react-router-dom';
import { getMovie } from '../../movies.api';
import { getYear } from '../../utils/datetime.utils';
import './movie-details.css';

export async function movieLoader({params}) {
  const { movieid } = params;
  const {data:movie} = await getMovie(movieid);
  return { movie };
}

const MovieDetails = () => {
  const { movie } = useLoaderData();
  const formatRuntime = (runtime) => {
    const hours = Math.trunc(runtime / 60);
    const minutes = runtime % 60;
    return { hours, minutes };
  };

  const { hours, minutes } = formatRuntime(movie.runtime);

  return (
    <div className="movie-details movie-details-section">
      <img className="poster" src={movie.poster_path} alt='poster'/>
      <div className="movie-info">
        <div className="title-container">
          <h2 className="movie-title">{movie.title}</h2>
          <div className="rating">{movie.vote_average}</div>
        </div>
        <div title={movie.genres.join(', ')} className="genres">
          {movie.genres.join(', ')}
        </div>
        <div className="year-runtime-container">
          <div className="movie-year">{getYear(movie.release_date)}</div>
          <div className="runtime" data-testid="runtime">
            <span className="hours">{hours}h</span>
            &nbsp;<span className="minutes">{minutes}min</span>
          </div>
        </div>
        <div className="description">{movie.overview}</div>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetails;

import { useEffect, useState } from 'react';
import OptionSelect from '../../components/option-select/option-select';
import SearchForm from '../../components/search-form/search-form';
import SortControl from '../../components/sort-control/sort-control';
import { GENRES, SORT_OPTIONS } from '../../constants';
import './movie-list-page.css';
import { getMovieList } from '../../movies.api';
import MovieTile from '../../components/movie-tile/movie-tile';

const MOVIES_PER_PAGE = 6;

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const offset = (page - 1) * MOVIES_PER_PAGE;
    getMovieList(offset, MOVIES_PER_PAGE).then(({ data }) => {
      console.log(data);
      setMovies(data.data || []);
      setTotal(data.totalAmount || 0);
    });
  }, [page]);

  const totalPages = Math.ceil(total / MOVIES_PER_PAGE);

  return (
    <div className="movie-list-page">
      <div className="top-section">
        <div className="top-section-content">
          <div className="search-header">
            <div className="logo">
              <span>
                <b>netflix</b>
              </span>
              <span>roulette</span>
            </div>
            <button className="add-movie-btn">+ ADD MOVIE</button>
          </div>
          <div className="search">
            <label>FIND YOUR MOVIE</label>
            <SearchForm />
          </div>
        </div>
      </div>

      <div className="movie-list">
        <div className="toolbar">
          <OptionSelect options={GENRES} />
          <SortControl options={SORT_OPTIONS} />
        </div>
        <div className="total">
          <b>{total}</b> movies found
        </div>
        <div className="tiles">
          {movies.map((movie) => (
            <MovieTile movie={movie} />
          ))}
        </div>
        <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      </div>
    </div>
  );
};

export default MovieListPage;

import { useEffect, useState, useRef } from 'react';
import OptionSelect from '../../components/option-select/option-select';
import SearchForm from '../../components/search-form/search-form';
import SortControl from '../../components/sort-control/sort-control';
import { GENRES, SORT_OPTIONS } from '../../constants';
import './movie-list-page.css';
import { getMovieList } from '../../movies.api';
import MovieTile from '../../components/movie-tile/movie-tile';
import MovieDetails from '../../components/movie-details/movie-details';

const MOVIES_PER_PAGE = 6;

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);
  const [searchQuery, setSearchQueary] = useState('');
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].value || null);
  const offset = (page - 1) * MOVIES_PER_PAGE;
  const controllerRef = useRef(null);

  useEffect(() => {
    // Cancel previous request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const params = {
      sortBy,
      sortOrder: 'asc', //TODO: Modify Sort Control
      search: searchQuery,
      searchBy: searchQuery ? 'title' : null,
      filter: genre === 'ALL' ? null : genre,
      offset,
      limit: MOVIES_PER_PAGE,
    };

    // Remove empty parameters
    Object.keys(params).forEach((key) => {
      if (
        params[key] === '' ||
        params[key] === null ||
        params[key] === undefined
      ) {
        delete params[key];
      }
    });

    const fetchData = async () => {
      try {
        const res = await getMovieList(params, controller.signal);
        setMovies(res.data.data);
        setTotal(res.data.totalAmount || 0);
      } catch (err) {
        if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') {
          console.log('Request canceled:', err.message);
        } else {
          console.log('Fetch error:', err.message);
        }
      }
    };

    fetchData();

    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [offset, searchQuery, genre, sortBy]);

  const totalPages = Math.ceil(total / MOVIES_PER_PAGE);

  const handleSearch = (query) => {
    if (query !== searchQuery) {
      setSearchQueary(query);
      setPage(1);
    }
  };

  const handleGenreSelection = (selection) => {
    setGenre(selection);
    setPage(1);
  };

  const handleSortBy = (selection) => {
    setSortBy(selection);
    setPage(1);
  };

  return (
    <div className="movie-list-page">
      <div className={`top-section ${!selectedMovie ? 'search-bar' : ''}`}>
        <div className="top-section-content">
          <div className="search-header">
            <div className="logo">
              <span>
                <b>netflix</b>
              </span>
              <span>roulette</span>
            </div>
            {!selectedMovie ? (
              <button className="add-movie-btn">+ ADD MOVIE</button>
            ) : (
              <div onClick={() =>setSelectedMovie(null)} className='glass'>&#x2315;</div>
            )}
          </div>
          {selectedMovie ? (
            <div className="movie-details-section">
              <MovieDetails movie={selectedMovie} />
            </div>
          ) : (
            <div className="search">
              <label>FIND YOUR MOVIE</label>
              <SearchForm initialValue={searchQuery} onSearch={handleSearch} />
            </div>
          )}
        </div>
      </div>

      <div className="movie-list">
        <div className="toolbar">
          <OptionSelect options={GENRES} onSelect={handleGenreSelection} />
          <SortControl options={SORT_OPTIONS} onSelect={handleSortBy} />
        </div>
        <div className="total">
          <b>{total}</b> movies found
        </div>
        <div className="tiles">
          {movies.map((movie) => (
            <MovieTile
              key={movie.id}
              movie={movie}
              onTileClick={() => setSelectedMovie(movie)}
            />
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

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

const Logo = () => (
  <div className="logo">
    <span><b>netflix</b></span>
    <span>roulette</span>
  </div>
);

const SearchHeader = ({ hasSelectedMovie, onAddMovie, onCloseDetails }) => (
  <div className="search-header">
    <Logo />
    {!hasSelectedMovie ? (
      <button className="add-movie-btn">+ ADD MOVIE</button>
    ) : (
      <div onClick={onCloseDetails} className="glass">&#x2315;</div>
    )}
  </div>
);

const SearchSection = ({ searchQuery, onSearch }) => (
  <div className="search">
    <label>FIND YOUR MOVIE</label>
    <SearchForm initialValue={searchQuery} onSearch={onSearch} />
  </div>
);

const Toolbar = ({ onGenreSelect, onSortSelect }) => (
  <div className="toolbar">
    <OptionSelect options={GENRES} onSelect={onGenreSelect} />
    <SortControl options={SORT_OPTIONS} onSelect={onSortSelect} />
  </div>
);

const Pagination = ({ page, totalPages, onPageChange }) => (
  <div className="pagination">
    <button
      onClick={() => onPageChange(page - 1)}
      disabled={page === 1}
    >
      &lt;&nbsp;Previous
    </button>
    <span>Page {page} of {totalPages}</span>
    <button
      onClick={() => onPageChange(page + 1)}
      disabled={page === totalPages}
    >
      Next&nbsp;&gt;
    </button>
  </div>
);

const buildMovieSearchParams = ({ page, searchQuery, genre, sortBy }) => {
  const params = new URLSearchParams();
  
  if (sortBy) params.append('sortBy', sortBy);
  params.append('sortOrder', 'asc');
  
  if (searchQuery) {
    params.append('search', searchQuery);
    params.append('searchBy', 'title');
  }
  
  if (genre && genre !== 'ALL') params.append('filter', genre);
  
  params.append('offset', (page - 1) * MOVIES_PER_PAGE);
  params.append('limit', MOVIES_PER_PAGE);
  
  return params;
};

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0].value || null);
  const controllerRef = useRef(null);

  const totalPages = Math.ceil(total / MOVIES_PER_PAGE);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const params = buildMovieSearchParams({ page, searchQuery, genre, sortBy });

    const fetchData = async () => {
      try {
        // Convert URLSearchParams to object if needed by your API client
        // const paramsObj = Object.fromEntries(params.entries());
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
  }, [page, searchQuery, genre, sortBy]);

  const handleSearch = (query) => {
    if (query !== searchQuery) {
      setSearchQuery(query);
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

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="movie-list-page">
      <div className={`top-section ${!selectedMovie ? 'search-bar' : ''}`}>
        <div className="top-section-content">
          <SearchHeader 
            hasSelectedMovie={!!selectedMovie} 
            onCloseDetails={handleCloseDetails}
          />
          
          {selectedMovie ? (
            <div className="movie-details-section">
              <MovieDetails movie={selectedMovie} />
            </div>
          ) : (
            <SearchSection searchQuery={searchQuery} onSearch={handleSearch} />
          )}
        </div>
      </div>

      {!selectedMovie && (
        <div className="movie-list">
          <Toolbar 
            onGenreSelect={handleGenreSelection} 
            onSortSelect={handleSortBy} 
          />
          
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
          
          <Pagination 
            page={page} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      )}
      
      <div className="footer">
        <Logo />
      </div>
    </div>
  );
};

export default MovieListPage;
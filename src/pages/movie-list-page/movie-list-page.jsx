import { useEffect, useState, useRef } from 'react';
import { SORT_OPTIONS } from '../../constants';
import './movie-list-page.css';
import { getMovieList } from '../../movies.api';
import MovieTile from '../../components/movie-tile/movie-tile';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import SearchHeader from './search-header';
import Toolbar from './toolbar';
import Pagination from './pagination';
import Logo from './logo';

const MOVIES_PER_PAGE = 6;

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

const DEFAULT_PARAMS = {
  searchQuery: '',
  genre: null,
  sortBy: SORT_OPTIONS[0]?.value || null,
  page: 1,
};

const MovieListPage = () => {
  const [movies, setMovies] = useState([]);
  const [total, setTotal] = useState(0);
  const controllerRef = useRef(null);

  const totalPages = Math.ceil(total / MOVIES_PER_PAGE);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery =
    searchParams.get('searchQuery') || DEFAULT_PARAMS.searchQuery;
  const genre = searchParams.get('genre') || DEFAULT_PARAMS.genre;
  const sortBy = searchParams.get('sortBy') || DEFAULT_PARAMS.sortBy;
  const page = Number(searchParams.get('page')) || DEFAULT_PARAMS.page;
  const { movieid } = useParams();
  const hasMovieId = !!movieid;
  console.log(hasMovieId);

  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    const params = buildMovieSearchParams({ page, searchQuery, genre, sortBy });

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
  }, [page, searchQuery, genre, sortBy]);

  const handleSearch = (query) => {
    if (query !== searchQuery) {
      setSearchParams((prev) => {
        prev.set('searchQuery', query);
        prev.set('page', '1');
        return prev;
      });
    }
  };

  const handleGenreSelection = (selection) => {
    setSearchParams((prev) => {
      prev.set('genre', selection);
      prev.set('page', '1');
      return prev;
    });
  };

  const handleSortBy = (selection) => {
    setSearchParams((prev) => {
      prev.set('sortBy', selection);
      prev.set('page', '1');
      return prev;
    });
  };

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      prev.set('page', newPage);
      return prev;
    });
  };

  return (
    <div className="movie-list-page">
      <div className={`top-section ${!hasMovieId ? 'search-bar' : ''}`}>
        <div className="top-section-content">
          <SearchHeader
            hasSelectedMovie={hasMovieId}
            onCloseDetails={() =>
              navigate({ pathname: '/', search: searchParams.toString() })
            }
          />
          <Outlet context={{ searchQuery, handleSearch }} />
        </div>
      </div>

      <div className="movie-list">
        <Toolbar
          onGenreSelect={handleGenreSelection}
          selectedGenre={genre}
          onSortSelect={handleSortBy}
          sortSelection={sortBy}
        />

        <div className="total">
          <b>{total}</b> movies found
        </div>

        <div className="tiles">
          {movies.map((movie) => (
            <MovieTile
              key={movie.id}
              movie={movie}
              onTileClick={() =>
                navigate({
                  pathname: `/${movie.id}`,
                  search: searchParams.toString(),
                })
              }
            />
          ))}
        </div>

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="footer">
        <Logo />
      </div>
    </div>
  );
};

export default MovieListPage;

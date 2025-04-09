import { useState } from 'react';
import './App.css';
import { Counter } from './components/counter/counter';
import MovieDetails from './components/movie-details/movie-details';
import MovieTile from './components/movie-tile/movie-tile';
import OptionSelect from './components/option-select/option-select';
import SearchForm from './components/search-form/search-form';
import SortControl from './components/sort-control/sort-control';
import { GENRES, MOVIE, SORT_OPTIONS } from './demo.constants';
import Dialog from './components/dialog/dialog';
import MovieForm from './components/movie-form/movie-form';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const onSearch = (value) => console.log(`Text to search: ${value}`);
  const onSelect = (value) => console.log(`Genre selected: ${value}`);
  const onSortBy = (value) => console.log(`Sort By: ${value}`);
  const onTileClick = (value) => console.log(`Movie selected: ${value.title}`);
  return (
    <div className="App">
      <h2>Counter</h2>
      <Counter initialValue={10} />
      <hr />
      <h2>Search Form</h2>
      <SearchForm onSearch={onSearch} />
      <hr />
      <h2>Genre Select</h2>
      <div className="center">
        <OptionSelect options={GENRES} onSelect={onSelect} />
      </div>
      <hr />
      <h2>Movie Tile</h2>
      <div className="center">
        <MovieTile movie={MOVIE} onTileClick={onTileClick} />
      </div>
      <hr />
      <h2>Movie Details</h2>
      <div className="center">
        <MovieDetails movie={MOVIE} />
      </div>
      <hr />
      <h2>Sort Control</h2>
      <div className="center">
        <SortControl options={SORT_OPTIONS} onSelect={onSortBy} />
      </div>
      <hr />
      <h2>Dialog</h2>
      <div className="center">
        <div>
          <button onClick={() => setIsOpen(true)}>Open Dialog</button>

          {isOpen && (
            <Dialog title="Add Movie" onClose={() => setIsOpen(false)}>
              <MovieForm
                movie={{
                  title: 'Inception',
                  releaseDate: '2010-07-16',
                  posterUrl: 'https://example.com/inception.jpg',
                  rating: 8.8,
                  genres: ['Sci-Fi'],
                  runtime: 148,
                  description:
                    'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
                }}
                onSubmit={(data) => console.log('Form submitted:', data)}
              />
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

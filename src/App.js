import './App.css';
import { Counter } from './components/counter/counter';
import MovieDetails from './components/movie-details/movie-details';
import MovieTile from './components/movie-tile/movie-tile';
import OptionSelect from './components/option-select/option-select';
import SearchForm from './components/search-form/search-form';
import { GENRES, MOVIE } from './demo.constants';

function App() {
  const onSearch = (value) => console.log(`Text to search: ${value}`);
  const onSelect = (value) => console.log(`Genre selected: ${value}`);
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
      <div className='center'>
        <OptionSelect options={GENRES} onSelect={onSelect} />
      </div>
      <hr />
      <h2>Movie Tile</h2>
      <div className='center'>
        <MovieTile movie={MOVIE} onTileClick={onTileClick} />
      </div>
      <hr />
      <h2>Movie Details</h2>
      <div className='center'>
        <MovieDetails movie={MOVIE} />
      </div>
    </div>
  );
}

export default App;

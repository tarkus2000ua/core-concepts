import './App.css';
import { Counter } from './components/counter/counter';
import OptionSelect from './components/option-select/option-select';
import SearchForm from './components/search-form/search-form';

const GENRES = [
  {
    id: 1,
    value: 'ALL',
  },
  {
    id: 2,
    value: 'DOCUMENTARY',
  },
  {
    id: 3,
    value: 'COMEDY',
  },
  {
    id: 4,
    value: 'HORROR',
  },
  {
    id: 5,
    value: 'CRIME',
  },
];

function App() {
  const onSearch = (value) => console.log(`Text to search: ${value}`);
  const onSelect = (value) => console.log(`Genre selected: ${value}`);
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
    </div>
  );
}

export default App;

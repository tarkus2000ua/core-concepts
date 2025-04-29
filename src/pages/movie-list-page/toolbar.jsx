import SortControl from '../../components/sort-control/sort-control';
import OptionSelect from '../../components/option-select/option-select';
import { GENRES, SORT_OPTIONS } from '../../constants';

const Toolbar = ({
  onGenreSelect,
  selectedGenre,
  onSortSelect,
  sortSelection,
}) => (
  <div className="toolbar">
    <OptionSelect
      data-testid="genre-select"
      options={GENRES}
      selection={selectedGenre}
      onSelect={onGenreSelect}
    />
    <SortControl
      data-testid="sort-control"
      options={SORT_OPTIONS}
      selection={sortSelection}
      onSelect={onSortSelect}
    />
  </div>
);

export default Toolbar;

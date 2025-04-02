import MovieTile from './movie-tile';

export default {
  title: 'Components/MovieTile',
  component: MovieTile,
};

const Template = (args) => <MovieTile {...args} />;

const mockMovie = {
    id: 1,
    title: 'Pulp Fiction',
    year: '1994',
    runtime: '154',
    genres: ['Crime'],
    director: 'Quentin Tarantino',
    rating: 8.9,
    actors: 'Tim Roth, Amanda Plummer, Laura Lovelace, John Travolta',
    description:
      'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra',
    posterUrl:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SX300.jpg',
};

export const Default = Template.bind({});
Default.args = {
  movie: mockMovie,
  onTileClick: (movie) => console.log('Tile clicked:', movie.title),
};

export const LongTitle = Template.bind({});
LongTitle.args = {
  movie: {
    ...mockMovie,
    title: 'The Lord of the Rings: The Fellowship of the Ring Extended Edition',
    year: '2001',
    genres: ['Adventure', 'Fantasy', 'Action'],
  },
  onTileClick: (movie) => console.log('Tile clicked:', movie.title),
};

export const MultipleGenres = Template.bind({});
MultipleGenres.args = {
  movie: {
    ...mockMovie,
    title: 'Inception',
    year: '2010',
    genres: ['Action', 'Adventure', 'Sci-Fi', 'Thriller'],
  },
  onTileClick: (movie) => console.log('Tile clicked:', movie.title),
};

export const MissingPoster = Template.bind({});
MissingPoster.args = {
  movie: {
    ...mockMovie,
    title: 'Pulp Fiction',
    posterUrl: '',
  },
  onTileClick: (movie) => console.log('Tile clicked:', movie.title),
};
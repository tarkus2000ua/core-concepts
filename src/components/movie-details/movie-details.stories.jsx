// MovieDetails.stories.jsx
import MovieDetails from './movie-details';

export default {
  title: 'Components/MovieDetails',
  component: MovieDetails,
  argTypes: {
    movie: {
      control: {
        type: 'object',
        fields: {
          poster_path: { control: 'text' },
          title: { control: 'text' },
          vote_average: { control: 'number', min: 0, max: 10, step: 0.1 },
          genres: { control: 'object' },
          // year: { control: 'text' },
          release_date: {control: 'text'},
          runtime: { control: 'number' },
          overview: { control: 'text' }
        }
      }
    }
  }
};

const Template = (args) => <MovieDetails {...args} />;

const defaultMovie = {
    id: 1,
    title: 'Pulp Fiction',
    runtime: '154',
    genres: ['Crime'],
    director: 'Quentin Tarantino',
    vote_average: 8.9,
    release_date: '1993-09-14',
    actors: 'Tim Roth, Amanda Plummer, Laura Lovelace, John Travolta',
    overview:
      'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra',
    poster_path:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTkxMTA5OTAzMl5BMl5BanBnXkFtZTgwNjA5MDc3NjE@._V1_SX300.jpg',
};

export const Default = Template.bind({});
Default.args = {
  movie: defaultMovie
};


export const MultipleGenres = Template.bind({});
MultipleGenres.args = {
  movie: {
    ...defaultMovie,
    title: 'Pulp Fiction',
    genres: ['Crime', 'Drama', 'Thriller', 'Dark Comedy'],
    vote_average: 8.9
  }
};

export const LongRuntime = Template.bind({});
LongRuntime.args = {
  movie: {
    ...defaultMovie,
    title: 'The Lord of the Rings',
    runtime: 201,
    overview: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.'
  }
};

export const MissingPoster = Template.bind({});
MissingPoster.args = {
  movie: {
    ...defaultMovie,
    poster_path: '',
    title: 'Movie with Missing Poster'
  }
};
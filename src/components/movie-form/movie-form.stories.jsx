import MovieForm from './movie-form';

export default {
  title: 'Components/MovieForm',
  component: MovieForm,
};

const Template = (args) => <MovieForm {...args} />;

export const EmptyForm = Template.bind({});
EmptyForm.args = {
  onSubmit: (data) => console.log('Form submitted:', data),
};

export const PrefilledForm = Template.bind({});
PrefilledForm.args = {
  movie: {
    title: 'The Shawshank Redemption',
    releaseDate: '1994-09-23',
    poster_path: 'https://example.com/shawshank.jpg',
    rating: 9.3,
    genres: ['Drama'],
    runtime: 142,
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
  },
  onSubmit: (data) => console.log('Form submitted:', data),
};
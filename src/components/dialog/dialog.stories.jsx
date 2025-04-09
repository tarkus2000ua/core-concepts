import Dialog from './dialog';
import MovieForm from '../movie-form/movie-form';

export default {
  title: 'Components/Dialog',
  component: Dialog,
};

const Template = (args) => <Dialog {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Dialog Title',
  children: <div>Dialog content goes here</div>,
  onClose: () => console.log('Dialog closed'),
};

export const AddMovieDialog = Template.bind({});
AddMovieDialog.args = {
  title: 'ADD MOVIE',
  children: <MovieForm onSubmit={(data) => console.log('Form submitted:', data)} />,
  onClose: () => console.log('Add movie dialog closed'),
};

export const EditMovieDialog = Template.bind({});
EditMovieDialog.args = {
  title: 'EDIT MOVIE',
  children: (
    <MovieForm
      movie={{
        title: 'Inception',
        releaseDate: '2010-07-16',
        posterUrl: 'https://example.com/inception.jpg',
        rating: 8.8,
        genres: ['Sci-Fi'],
        runtime: 148,
        description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
      }}
      onSubmit={(data) => console.log('Form submitted:', data)}
    />
  ),
  onClose: () => console.log('Edit movie dialog closed'),
};
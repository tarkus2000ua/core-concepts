import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Dialog from '../../components/dialog/dialog';
import MovieForm from '../../components/movie-form/movie-form';
import { addMovie, getMovie, updateMovie } from '../../movies.api';

const MovieDialog = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { movieid } = useParams();

  const isEditMode = !!movieid;

  useEffect(() => {
    const fetchMovieData = async () => {
      if (isEditMode) {
        try {
          setIsLoading(true);
          const response = await getMovie(movieid);
          setMovieData(response.data);
        } catch (err) {
          setError(err);
          console.error('Failed to fetch movie:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchMovieData();
  }, [movieid, isEditMode]);

  const handleClose = () => {
    setIsOpen(false);
    navigate(-1); // Go back to previous page
  };

  const handleSubmit = async (formData) => {
    try {
      console.log('Form submitted:', formData);

      if (isEditMode) {
        await updateMovie(formData);
      } else {
        await addMovie(formData);
      }
      setIsOpen(false);
      navigate({ pathname: '/', search: searchParams.toString() });
    } catch (err) {
      console.error('Failed to submit movie:', err);
    }
  };

  if (isLoading) {
    return (
      <Dialog
        title={isEditMode ? 'Edit Movie' : 'Add Movie'}
        onClose={handleClose}
        isOpen={isOpen}
      >
        <div>Loading movie data...</div>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog
        title={isEditMode ? 'Edit Movie' : 'Add Movie'}
        onClose={handleClose}
        isOpen={isOpen}
      >
        <div>Error loading movie: {error.message}</div>
      </Dialog>
    );
  }

  return (
    <Dialog
      title={isEditMode ? 'Edit Movie' : 'Add Movie'}
      onClose={handleClose}
      isOpen={isOpen}
    >
      <MovieForm movie={isEditMode ? movieData : {}} onSubmit={handleSubmit} />
    </Dialog>
  );
};

export default MovieDialog;

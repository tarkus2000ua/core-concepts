import { useEffect } from 'react';
import './movie-form.css';
import MultiselectDropdown from '../multiselect-dropdown/multiselect-dropdown';
import { useForm } from 'react-hook-form';

const genreOptions = [
  { id: 1, value: 'Action' },
  { id: 2, value: 'Adventure' },
  { id: 3, value: 'Comedy' },
  { id: 4, value: 'Drama' },
  { id: 5, value: 'Horror' },
  { id: 6, value: 'Sci-Fi' },
];

const DEFAULT_VALUES = {
  title: '',
  poster_path: '',
  vote_average: '',
  genres: [],
  runtime: '',
  overview: '',
  release_date: '',
};

const getDefaultValues = (movie) => ({
  ...DEFAULT_VALUES,
  ...movie,
  genres: movie?.genres || [],
});

const MovieForm = ({ movie = {}, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: getDefaultValues(movie),
    mode: 'onChange',
  });

  const selectedGenres = watch('genres');
  const releaseDateValue = watch('release_date');

  // Set genres when movie prop changes
  useEffect(() => {
    if (movie.genres) {
      setValue('genres', movie.genres);
    }
  }, [movie.genres, setValue]);

  const handleGenreChange = (genres) => {
    setValue('genres', genres, {
      shouldValidate: true,
      // shouldDirty: true,
      // shouldTouch: true,
    });
  };

  const onFormSubmit = (data) => {
    onSubmit && onSubmit(data);
  };

  const onReset = () => {
    reset(getDefaultValues(movie));
  };

  return (
    <form
      className="modal-form"
      onSubmit={handleSubmit(onFormSubmit)}
      onReset={onReset}
    >
      <div className="form-row">
        <div className={`form-group ${errors.title ? 'has-error' : ''}`}>
          <label>TITLE</label>
          <input
            type="text"
            placeholder="Title"
            className={`form-input ${errors.title ? 'error' : ''}`}
            aria-invalid={errors.title ? 'true' : 'false'}
            {...register('title', {
              required: 'Title is required',
              minLength: {
                value: 2,
                message: 'Title must be at least 2 characters',
              },
            })}
          />
          {errors.title && (
            <span className="error-message" role="alert">
              {errors.title.message}
            </span>
          )}
        </div>
        <div className={`form-group ${errors.release_date ? 'has-error' : ''}`}>
          <label htmlFor="releaseDate">RELEASE DATE</label>
          <div
            className={`date-input-container ${
              errors.release_date ? 'error' : ''
            }`}
          >
            <input
              id="releaseDate"
              type="date"
              data-testid="date-input"
              aria-label="Release date"
              className={`date-input ${!releaseDateValue ? 'empty' : ''}`}
              aria-invalid={errors.release_date ? 'true' : 'false'}
              {...register('release_date', {
                required: 'Release date is required',
                validate: {
                  validDate: (value) => {
                    if (!value) return true;
                    return (
                      !isNaN(Date.parse(value)) || 'Please enter a valid date'
                    );
                  },
                },
              })}
            />
            {!releaseDateValue && (
              <span className="date-placeholder">Select Date</span>
            )}
          </div>
          {errors.release_date && (
            <span className="error-message" role="alert">
              {errors.release_date.message}
            </span>
          )}
        </div>
      </div>
      <div className="form-row">
        <div className={`form-group ${errors.poster_path ? 'has-error' : ''}`}>
          <label>MOVIE URL</label>
          <input
            placeholder="https://"
            className={`form-input ${errors.poster_path ? 'error' : ''}`}
            aria-invalid={errors.poster_path ? 'true' : 'false'}
            {...register('poster_path', {
              pattern: {
                value: /^https?:\/\/.+/,
                message:
                  'Please enter a valid URL starting with http:// or https://',
              },
            })}
          />
          {errors.poster_path && (
            <span className="error-message" role="alert">
              {errors.poster_path.message}
            </span>
          )}
        </div>
        <div className={`form-group ${errors.vote_average ? 'has-error' : ''}`}>
          <label>vote_average</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            className={`form-input ${errors.vote_average ? 'error' : ''}`}
            aria-invalid={errors.vote_average ? 'true' : 'false'}
            {...register('vote_average', {
              min: { value: 0, message: 'vote_average must be at least 0' },
              max: { value: 10, message: 'vote_average must be at most 10' },
              valueAsNumber: true,
            })}
          />
          {errors.vote_average && (
            <span className="error-message" role="alert">
              {errors.vote_average.message}
            </span>
          )}
        </div>
      </div>
      <div className="form-row">
        <div className={`form-group ${errors.genres ? 'has-error' : ''}`}>
          <label htmlFor="genre-select">GENRE</label>
          <MultiselectDropdown
            id="genre-select"
            options={genreOptions}
            selection={selectedGenres}
            onSelect={handleGenreChange}
            className={errors.genres ? 'multiselect-error' : ''}
            aria-invalid={errors.genres ? 'true' : 'false'}
          />
          <input
            type="hidden"
            {...register('genres', {
              validate: (value) =>
                value?.length > 0 || 'At least one genre is required',
            })}
            value={selectedGenres} // Add this to ensure value is set
          />
          {errors.genres && (
            <span className="error-message" role="alert">
              {errors.genres.message}
            </span>
          )}
        </div>
        <div className={`form-group ${errors.runtime ? 'has-error' : ''}`}>
          <label>RUNTIME</label>
          <input
            type="number"
            placeholder="minutes"
            className={`form-input ${errors.runtime ? 'error' : ''}`}
            aria-invalid={errors.runtime ? 'true' : 'false'}
            {...register('runtime', {
              required: 'Runtime is required',
              min: { value: 1, message: 'Runtime must be at least 1 minute' },
              valueAsNumber: true,
            })}
          />
          {errors.runtime && (
            <span className="error-message" role="alert">
              {errors.runtime.message}
            </span>
          )}
        </div>
      </div>
      <div className={`form-group ${errors.overview ? 'has-error' : ''}`}>
        <label>OVERVIEW</label>
        <textarea
          placeholder="Movie description"
          rows={9}
          className={`form-textarea ${errors.overview ? 'error' : ''}`}
          aria-invalid={errors.overview ? 'true' : 'false'}
          {...register('overview', {
            required: 'Description is required',
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters',
            },
          })}
        ></textarea>
        {errors.overview && (
          <span className="error-message" role="alert">
            {errors.overview.message}
          </span>
        )}
      </div>
      <div className="form-actions">
        <button type="reset" className="reset-btn">
          RESET
        </button>
        <button type="submit" className="submit-btn">
          SUBMIT
        </button>
      </div>
    </form>
  );
};

export default MovieForm;

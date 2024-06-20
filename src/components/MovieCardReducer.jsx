import React, { useReducer, useEffect } from 'react';
import { Link } from 'react-router-dom';

const initialState = {
  movies: [],
  loading: true,
  error: null,
};

const movieReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload,
      };
    case 'FETCH_MOVIES_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const MovieCard = () => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  useEffect(() => {
    const fetchMovies = async () => {
      dispatch({ type: 'FETCH_MOVIES_REQUEST' });
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=Anime&apikey=b83de95d`);
        const data = await response.json();
        if (data.Response === 'True') {
          dispatch({ type: 'FETCH_MOVIES_SUCCESS', payload: data.Search });
        } else {
          dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: 'No movies found' });
        }
      } catch (error) {
        dispatch({ type: 'FETCH_MOVIES_FAILURE', payload: error.message });
      }
    };

    fetchMovies();
  }, []);

  const { movies, loading, error } = state;

  return (
    <div className="container mt-4">
      {loading && <div className="text-center"><p>Loading...</p></div>}
      {error && <div className="text-center"><p>Error: {error}</p></div>}
      {!loading && !error && movies.length === 0 && (
        <div className="text-center"><p>No movies found</p></div>
      )}
      <div className="row">
        {movies.map((movie) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={movie.imdbID}>
            <div className="card movie-card">
              <Link to={`/movie/${movie.imdbID}`} className="text-decoration-none">
                <div className="image-container">
                  <img src={movie.Poster} alt={movie.Title} className="card-img-top" />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{movie.Title}<br>
                  {movie.Year}</br></h5>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCard;

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="card movie-card">
      <Link to={`/movie/${movie.imdbID}`} className="text-decoration-none">
        <div className="image-container">
          <img src={movie.Poster} alt={movie.Title} className="card-img-top" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{movie.Title}<br></br>
          ({movie.Year})</h5>
          {/* <p className="card-text text-muted">{movie.Year}</p> */}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

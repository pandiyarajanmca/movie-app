import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
  "../public/images/placeholder.jpg";


const MovieDetails = ({ movie }) => {
  fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=b9bd48a6`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
    });
  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <div className="movie-details">      
      <div>
        <img
          width="300"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <div className="movie-description">
        <h2>{movie.Title}</h2>      
        <p>({movie.Year})</p>
      </div>
    </div>
  );
};


export default MovieDetails;
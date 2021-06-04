import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
//import MovieDetails from "./components/MovieDetails";
import Search from "./components/Search";



const App = () => {

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
	const [isFetching, setIsFetching] = useState(false);
	const [page, setPage] = useState(1);
  const [searchval, setSearch] = useState('');
  const MOVIE_API_URL = `https://www.omdbapi.com/?apikey=b9bd48a6&s=Marvel&type=movie&page=${page}`;

  const handleScroll = () => {
		if (
			Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
			isFetching
		)
			return;
		setIsFetching(true);
		console.log(isFetching);
	};
 const fetchmovie= () => {
    fetch(MOVIE_API_URL).then(response => response.json()).then(jsonResponse => {
      setMovies(jsonResponse.Search);
      setLoading(false);
    });
  }
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);

     fetchmovie();


    }, []);
    useEffect(() => {
      if (!isFetching) return;
      search(searchval);
    }, [isFetching]);
  
    const fetchMoreListItems = () => {
      fetchmovie();
      setIsFetching(false);
    };
    const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);
    setSearch(searchValue);
    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=b9bd48a6&page=${page}`)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setPage(page+1);
          console.log("setPage",page)
          console.log('move',jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  	};
    const reset = () => {
      console.log("reset")
setPage(1);
    }
    
    return (
     <div className="App">
      <Header text="HOOKED" />
      <Search search={search} reset={reset} />
      <p className="App-intro">Sharing a few of our favourite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
         <span>loading...</span>
         ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movies key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};


export default App;
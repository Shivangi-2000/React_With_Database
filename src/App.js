import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLodding, setIsLoadding] = useState(false);
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoadding(true);
    const response = await fetch("https://skill-http-default-rtdb.firebaseio.com/movies.json");
    const data = await response.json();
    const loadedData = [];
    for(const key in data){
      loadedData.push( {
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseData: data[key].releaseData,
      })
    }
    
    
    setMovies(loadedData);
    setIsLoadding(false);
  }, []);

  async function addMovieHandler(movie) {
    const response = await fetch('https://skill-http-default-rtdb.firebaseio.com/movies.json',{
      method: 'POST',
      body: JSON.stringify(movie),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data);
  }

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLodding && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLodding && movies.length === 0 && <p>Found No Movies.</p>}
        {isLodding && <p>Lodding...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;

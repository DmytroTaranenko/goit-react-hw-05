import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { requestTrendingTodayMovies } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchTrendingMoviesToday = async () => {
      try {
        setLoader(true);
        const result = await requestTrendingTodayMovies();
        setMovies(result.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchTrendingMoviesToday();
  }, []);

  return (
    <div>
      <h1>Top Movies</h1>
      <MovieList movies={movies} />
      {loader === true && <Loader />}
      {error !== null && <ErrorMessage error={error} />}
    </div>
  );
};

export default HomePage;

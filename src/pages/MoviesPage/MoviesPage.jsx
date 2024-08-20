import { useEffect, useState } from "react";
import {
  requestMovieByValue,
  requestTrendingTodayMovies,
} from "../../services/api";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useSearchParams } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import css from "./MoviesPage.module.css"

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  // const [searchValue, setSearchValue] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchValue = searchParams.get("query");

  const searchField = (value) => {
    setSearchParams({ query: value });
  };
  console.log(searchValue);

  useEffect(() => {
    if (searchValue === null) return;
    const fetchMovieByValue = async () => {
      try {
        setLoader(true);
        const result = await requestMovieByValue(searchValue);
        setMovies(result.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchMovieByValue();
  }, [searchValue]);

  return (
    <div>
      <SearchBar searchField={searchField} />
      {movies && movies.length  ===  0 && (
        <p className={css.noResult }>Sorry, there are no results for your request, try again later 😕</p>
      )}
      <MovieList movies={movies} />
      {loader === true && <Loader />}
      {error !== null && <ErrorMessage error={error} />}
    </div>
  );
};

export default MoviesPage;

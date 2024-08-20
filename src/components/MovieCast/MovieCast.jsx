import { useEffect } from "react";
import { useState } from "react";
import { requestCastMovie } from "../../services/api";
import Loader from "../Loader/Loader";
import { ErrorMessage } from "formik";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCasts, setMovieCasts] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (movieId === null) return;
    const fetchCastMovie = async () => {
      try {
        setLoader(true);
        const result = await requestCastMovie(movieId);
        console.log(result);
        setMovieCasts(result.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchCastMovie();
  }, [movieId]);

  return (
    <div>
      {loader === true && <Loader />}
      {error !== null && <ErrorMessage error={error} />}
      {movieCasts && movieCasts.length === 0 && (
        <p>Sorry, we don't have cast information for this movie </p>
      )}
      {movieCasts !== null && (
        <ul className={css.castList}>
          {movieCasts.map((actor) => {
            return (
              <li className={css.castItem} key={actor.id}>
                <img
                  className={css.imageActor}
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={actor.name}
                />
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;

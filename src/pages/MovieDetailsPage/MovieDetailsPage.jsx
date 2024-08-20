import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { requestDetailsAboutMovie } from "../../services/api";
import { useEffect, useRef, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css"

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? "/movies");
  const [movieDetails, setMovieDetails] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (movieId === null) return;
    const fetchDetailsAboutMovie = async () => {
      try {
        setLoader(true);
        const result = await requestDetailsAboutMovie(movieId);
        //   setMovies(result.results);
        console.log(result);
        setMovieDetails(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchDetailsAboutMovie();
  }, [movieId]);

  return (
    <div className={css.movieDetailsPage}>
      {loader === true && <Loader />}
      {error !== null && <ErrorMessage error={error} />}
      {movieDetails !== null && (
        <div>
          <>
            <Link className={css.goBackBtn} to={backLinkRef.current}>
              👈Go back
            </Link>
          </>

          <div className={css.wrapDetails}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
            <div>
              <h2>Title:{movieDetails.title}</h2>
              <p>User score: {Math.round(movieDetails.vote_average * 10)}%</p>
              <h3>Overview:</h3>
              <p>{movieDetails.overview}</p>
              <h3>Genres:</h3>
              <p>
                {movieDetails.genres
                  .map((genreObj) => genreObj.name)
                  .join(", ")}
              </p>
            </div>
          </div>
          <div>
            <h3>Additional information </h3>
            <Link className={css.additionalLink} to="reviews">
              Reviews
            </Link>
            <Link className={css.additionalLink} to="cast">
              Cast
            </Link>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;

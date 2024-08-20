import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation()

  return (
    <div>
      <ul>
        {movies !== null &&
          movies.map((movie) => (
            <li key={movie.id}>
              <Link state={{ from:location }} to={`/movies/${movie.id}`}>
                <h3 className={css.movieTitle}>{movie.title}</h3>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieList;

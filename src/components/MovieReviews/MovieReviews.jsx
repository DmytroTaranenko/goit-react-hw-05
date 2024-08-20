import { useEffect, useState } from "react";
import { requestReviewsMovie } from "../../services/api";
import { ErrorMessage } from "formik";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieReviews, setMovieReviews] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (movieId === null) return;
    const fetchReviewsMovie = async () => {
      try {
        setLoader(true);
        const result = await requestReviewsMovie(movieId);
        //   setMovies(result.results);
        console.log(result);
        setMovieReviews(result.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchReviewsMovie();
  }, [movieId]);

  return (
    <div>
      {loader === true && <Loader />}
      {error !== null && <ErrorMessage error={error} />}
      {movieReviews !== null && (
        <ul>
          {movieReviews.length === 0 && <li>This movie has no reviews</li>}
          {movieReviews.map((review) => {
            return (
              <li key={review.id}>
                <h3>Review: {review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;

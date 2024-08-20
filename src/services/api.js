import axios from "axios";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OWUxMDI5YTgzODE2M2Y5NmVlMDlkMjFkOTQ4ZDExZCIsIm5iZiI6MTcyMzk5MjkxMS4yNDMwOSwic3ViIjoiNjZjMWY2N2U1YjZjODQ1OTU5ODlhNGNhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.YpO0nfdswaNhvA3FBmkvRvCjwdg1ORcZXGmN4bFZoMk",
  },
};

export const requestTrendingTodayMovies = async () => {
  const { data } = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  );
  return data;
};

export const requestMovieByValue = async (searchValue) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/search/movie?query=${searchValue}&include_adult=false&language=en-US&page=1`,
    options
  );
  return data;
};

export const requestDetailsAboutMovie = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
    options
  );
  return data;
};

export const requestCastMovie = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    options
  );
  return data;
};

export const requestReviewsMovie = async (movieId) => {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`,
    options
  );
  return data;
};

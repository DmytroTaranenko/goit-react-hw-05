import axios from "axios";
import { Suspense, lazy } from "react";
import css from "./App.module.css";
import clsx from "clsx";
import { NavLink, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Loader from "./components/Loader/Loader";
import { Toaster } from "react-hot-toast";
import MovieReviews from "./components/MovieReviews/MovieReviews";
import MovieCast from "./components/MovieCast/MovieCast";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"))

function App() {
  
  return (
    <>
      <header className={css.header}>
        <Navigation />
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="reviews" element={<MovieReviews />} />
              <Route path="cast" element={<MovieCast />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <footer></footer>
      <Toaster />
    </>
  );
}

export default App;

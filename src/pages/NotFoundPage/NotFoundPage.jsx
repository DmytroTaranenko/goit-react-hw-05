import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css"

const NotFoundPage = () => {
  return (
    <div className={css.wrapNotFoundPage}>
      <h1 className={css.oopsTitle}>Oops!</h1>
      <h2 className={css.pageNotFoundTitle}>404 - PAGE NOT FOUND</h2>
      <p className={css.pageNotFoundDiscription}>
        Sorry but it's not corectly url. Please come to home page and try again.
      </p>
      <Link className={css.linkBtn} to="/">
        Home Page{" "}
      </Link>
    </div>
  );
};

export default NotFoundPage;

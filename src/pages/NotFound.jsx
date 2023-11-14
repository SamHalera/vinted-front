import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="not-found">
      <div>
        <h1>
          ERROR 404 - NOT FOUND <span>😱</span>
        </h1>
        <h2>Go back to the home page 😉</h2>
        <Link className="btn btn-primary" to={"/"}>
          HOME
        </Link>
      </div>
    </main>
  );
};

export default NotFound;

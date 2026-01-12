import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-main text-center px-4">
      <h1 className="text-6xl font-bold text-primary mb-4">
        <BiError size={100}></BiError>
      </h1>
      <p className="text-lg text-text-primary mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="px-6 py-2 bg-primary text-text-primary rounded-lg hover:bg-primary/90 transition"
      >
        Go Home
      </Link>
    </div>
  );
}

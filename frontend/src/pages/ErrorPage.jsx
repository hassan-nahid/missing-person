import { Link } from "react-router-dom";
import errorPhoto from "../assets/img/error.webp";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex px-2 flex-col items-center justify-center bg-gray-100 text-gray-700 py-7">
      <div className="text-center">
        <h1 className="text-5xl font-bold blue-text">404</h1>
        <p className="text-xl mt-4 font-semibold">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <p className="text-base mt-2 text-gray-600">
          It looks like you took a wrong turn. Let’s get you back on track!
        </p>
        <img
          src={errorPhoto}
          alt="Error Illustration"
          className="mt-6 mx-auto w-[90%] max-w-md"
        />
        <Link to="/">
          <button className="btn blue-bg hover:blue-bg text-white mt-6 px-8 py-3 text-lg font-medium">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;

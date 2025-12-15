import { HiShieldExclamation } from "react-icons/hi";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <HiShieldExclamation className="w-10 h-10 text-red-600" />
        </div>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Access Forbidden
        </h2>
        <p className="text-gray-600 mb-8">
          You don't have permission to access this page.
        </p>

        <Link
          to="/"
          className="inline-block px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-all"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;

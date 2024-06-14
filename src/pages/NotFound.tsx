import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center p-64 ">
      <p>404 Page not Found</p>
      <Link to="/" className="text-blue-600 underline font-bold">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;

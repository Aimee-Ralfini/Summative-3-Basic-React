// not found router page
//  - this page is used when a route is not found

// import the Link component from react-router-dom
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="page not-found">
      <h1>Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFound;

import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name'); // Remove user's name
    props.showAlert("Logged out successfully", "success");
    navigate("/login");
  };

  let location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNoteBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                aria-current="page"
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/note" ? "active" : ""}`}
                aria-current="page"
                to="/note"
              >
                Note
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {name && <span className="navbar-text text-light mx-2"><i className="fa-solid fa-hand mx-1"></i>{name}</span>}
            {!localStorage.getItem('token') ? (
              <nav className="d-flex">
                <Link className="btn btn-light mx-1" to="/login" role="button">Login</Link>
                <Link className="btn btn-light mx-1" to="/signup" role="button">Signup</Link>
              </nav>
            ) : (
              <button className="btn btn-light ms-3" onClick={handleLogout} role="button">Logout</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

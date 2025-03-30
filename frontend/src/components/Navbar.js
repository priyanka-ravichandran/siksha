import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ userType }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">Siksha</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {userType === 'student' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/submit">Submit Assignment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/assignments">View Assignments</Link>
                </li>
                
              </>
            )}

            {userType === 'professor' && (
              <li className="nav-item">
                <Link className="nav-link" to="/grade">Grades</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

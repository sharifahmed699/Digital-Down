import React, { Fragment, Suspense } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const AdminDashboardLayout = () => {
  return (
    <Fragment>
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">
            Project Name
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"></div>
        </nav>
        <div className="row">
          <div className="col-md-3 col-lg-2">
            <div className="bg-dark text-light sidebar">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <NavLink
                    to="/dashboard"
                    className={(navData) =>
                      navData.isActive ? 'nav-link active' : 'nav-link'
                    }>
                    <span className="me-2">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect width="7" height="9" x="3" y="3"></rect>
                        <rect width="7" height="5" x="14" y="3"></rect>
                        <rect width="7" height="9" x="14" y="12"></rect>
                        <rect width="7" height="5" x="3" y="16"></rect>
                      </svg>
                    </span>
                    <span>DashBoard</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/user"
                    className={(navData) =>
                      navData.isActive ? 'nav-link active' : 'nav-link'
                    }>
                    <span className="me-2">
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </span>
                    <span>User</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/division"
                    className={(navData) =>
                      navData.isActive ? 'nav-link active' : 'nav-link'
                    }>
                    <span className="me-2">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 22h1v-6.995c.006-.502.177-3.005 3-3.005s2.994 2.503 3 3v7h7v-2h-1V4h1V2H2v2h1v16H2v2h6zM19 4v2H5V4h14zM5 8h14v12h-2v-5c0-1.729-1.045-5-5-5s-5 3.271-5 5v5H5V8z"></path>
                      </svg>
                    </span>
                    <span>Division</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/zilla"
                    className={(navData) =>
                      navData.isActive ? 'nav-link active' : 'nav-link'
                    }>
                    <span className="me-2">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 2H9c-1.103 0-2 .897-2 2v6H5c-1.103 0-2 .897-2 2v9a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zM5 12h6v8H5v-8zm14 8h-6v-8c0-1.103-.897-2-2-2H9V4h10v16z"></path>
                        <path d="M11 6h2v2h-2zm4 0h2v2h-2zm0 4.031h2V12h-2zM15 14h2v2h-2zm-8 .001h2v2H7z"></path>
                      </svg>
                    </span>
                    <span>Zilla</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/upo-zilla"
                    className={(navData) =>
                      navData.isActive ? 'nav-link active' : 'nav-link'
                    }>
                    <span className="me-2">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.893 3.001H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h15.893c1.103 0 2-.897 2-2V5a2.003 2.003 0 0 0-2-1.999zM8 19.001H4V8h4v11.001zm6 0h-4V8h4v11.001zm2 0V8h3.893l.001 11.001H16z"></path>
                      </svg>
                    </span>
                    <span>Upo Zilla</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/pourosova"
                    className={(navData) =>
                      navData.isActive ? 'nav-link active' : 'nav-link'
                    }>
                    <span className="me-2">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 24 24"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.715 12c1.151 0 2-.849 2-2s-.849-2-2-2-2 .849-2 2 .848 2 2 2z"></path>
                        <path d="M20 4H4c-1.103 0-2 .841-2 1.875v12.25C2 19.159 2.897 20 4 20h16c1.103 0 2-.841 2-1.875V5.875C22 4.841 21.103 4 20 4zm0 14-16-.011V6l16 .011V18z"></path>
                        <path d="M14 9h4v2h-4zm1 4h3v2h-3zm-1.57 2.536c0-1.374-1.676-2.786-3.715-2.786S6 14.162 6 15.536V16h7.43v-.464z"></path>
                      </svg>
                    </span>
                    <span>Pouro Sova</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9 col-lg-10 p-0">
            <div className="card mt-2 me-2">
              <div className="card-header">
                <h4>Welcome to the Dashboard!</h4>
              </div>
              <div className="card-body">
                <Suspense fallback={'Loading...'}>
                  <Outlet />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <footer className="bg-dark text-light text-center py-3 fixed-bottom">
          &copy; 2023 Your App. All rights reserved.
        </footer>
      </div>
    </Fragment>
  );
};

export default AdminDashboardLayout;

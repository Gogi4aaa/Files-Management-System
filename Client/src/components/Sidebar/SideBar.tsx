import { useState } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
export default function SideBar() {
  const [isClicked, setIsClicked] = useState(false);
  const handleIconClick = () => {
    setIsClicked(!isClicked)
    console.log(1);
  }
  return (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Sidebar Menu | Side Navigation Bar</title>
          <link
            href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
            rel="stylesheet"
          />
        </head>
        <body>
          <nav className={isClicked ? "open" : ""}>
            <div className="logo">
              <i className="bx bx-menu menu-icon" onClick={handleIconClick}></i>
              <span className="logo-name"></span>
            </div>

            <div className="sidebar">
              <div className="logo">
                <i className="bx bx-menu menu-icon" onClick={handleIconClick}></i>
                <span className="logo-name">Files Manager</span>
              </div>

              <div className="sidebar-content">
                <ul className="lists">
                  <li className="list">
                    <Link to="/dashboard" className="nav-link">
                      <i className="bx bx-home-alt icon"></i>
                      <span className="link">Dashboard</span>
                    </Link>
                  </li>
                  <li className="list">
                    <a href="#" className="nav-link">
                      <i className="bx bx-bar-chart-alt-2 icon"></i>
                      <span className="link">Revenue</span>
                    </a>
                  </li>
                  <li className="list">
                    <a href="#" className="nav-link">
                      <i className="bx bx-bell icon"></i>
                      <span className="link">Notifications</span>
                    </a>
                  </li>
                  <li className="list">
                    <a href="#" className="nav-link">
                      <i className="bx bx-message-rounded icon"></i>
                      <span className="link">Messages</span>
                    </a>
                  </li>
                  <li className="list">
                    <a href="#" className="nav-link">
                      <i className="bx bx-pie-chart-alt-2 icon"></i>
                      <span className="link">Analytics</span>
                    </a>
                  </li>
                  <li className="list">
                    <a href="#" className="nav-link">
                      <i className="bx bx-heart icon"></i>
                      <span className="link">Likes</span>
                    </a>
                  </li>
                  <li className="list">
                    <a href="#" className="nav-link">
                      <i className="bx bx-folder-open icon"></i>
                      <span className="link">Files</span>
                    </a>
                  </li>
                  <li className="list">
                    <Link to="/login-register" className="nav-link">
                      <i className="bx bx-folder-open icon"></i>
                      <span className="link">Login</span>
                    </Link>
                  </li>
                </ul>

                <div className="bottom-cotent">
                  <li className="list">
                    <a href="#" className="nav-link">
                      <i className="bx bx-cog icon"></i>
                      <span className="link">Settings</span>
                    </a>
                  </li>
                  <li className="list">
                    <a href="#" className="nav-link">
                      <i className="bx bx-log-out icon"></i>
                      <span className="link">Logout</span>
                    </a>
                  </li>
                </div>
              </div>
            </div>
          </nav>

          <section className="overlay" onClick={handleIconClick} ></section>
        </body>
      </html>
  );
};
import React from "react";
import { Link } from "react-router-dom";
import "./TodoHome.css"
// import your CSS
// import todoLogo from '../../../public/image/todo-logo.png';
export default function TodoHome() {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      
     <div className="main-section">
        
         <section className="hero">
        <div className="overlay"></div>

        <div className="hero-content">
            <div>



<svg width="200" height="70" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">

  <rect x="10" y="10" width="180" height="180" rx="20" fill="white" stroke="#4CAF50" stroke-width="8"/>


  <path d="M60 65 L85 95 L140 40"
        stroke="#4CAF50"
        stroke-width="12"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"/>

 
  <line x1="40" y1="120" x2="120" y2="120" stroke="#4CAF50" stroke-width="8" stroke-linecap="round"/>
  <line x1="40" y1="145" x2="120" y2="145" stroke="#4CAF50" stroke-width="8" stroke-linecap="round"/>
  <line x1="40" y1="170" x2="120" y2="170" stroke="#4CAF50" stroke-width="8" stroke-linecap="round"/>


  <circle cx="155" cy="120" r="10" fill="#4CAF50"/>
  <circle cx="155" cy="145" r="10" fill="#4CAF50"/>
  <circle cx="155" cy="170" r="10" fill="#4CAF50"/>

</svg>

 <p className="py-2  todo-brand">TO-DO-LIST</p>

      </div>
          <h1>Organize Your Life, One Task at a Time</h1>

          <p>
            Welcome to your new favorite todo app. Simplify your workflow, boost
            your productivity, and never miss a deadline again.
          </p>

          <div className="hero-buttons">
            <Link to="/TodoRegister" className="btn home-create-btn">
              Create Account
            </Link>

            <Link to="/TodoLogin" className="btn btn-outline">
              Log In
            </Link>
          </div>
        </div>
      </section>
      </div>

      {/* FEATURES */}
      <section className="features">
        <h2>Features to Help You Succeed</h2>
        <p className="subtext">
          Everything you need to stay organized and productive, all in one place.
        </p>

        <div className="feature-grid">

          <div className="card">
            <div className="icon">✔</div>
            <h3>Effortless Task Management</h3>
            <p>Quickly add, organize, and prioritize your tasks.</p>
          </div>

          <div className="card">
            <div className="icon">👥</div>
            <h3>Collaborate with Teams</h3>
            <p>Share projects, assign tasks, and track progress together.</p>
          </div>

          <div className="card">
            <div className="icon">🔔</div>
            <h3>Smart Reminders</h3>
            <p>Set due dates and get timely notifications.</p>
          </div>

        </div>
      </section>

     
      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">✔ Todo</div>

        <p>© 2025 Todo Inc. All rights reserved.</p>

        <div className="footer-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </footer>

    </div>
  );
}

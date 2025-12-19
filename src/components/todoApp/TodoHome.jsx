import React from "react";
import { Link } from "react-router-dom";
import "./TodoHome.css";

export default function TodoHome() {
  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <div className="main-section">
        <section className="hero">
          <div className="overlay"></div>

          <div className="hero-content">

            {/* LOGO */}
            <svg
              width="100"
              height="100"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="10"
                y="10"
                width="180"
                height="180"
                rx="20"
                fill="white"
                stroke="#4CAF50"
                strokeWidth="8"
              />

              <path
                d="M60 65 L85 95 L140 40"
                stroke="#4CAF50"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <line
                x1="40"
                y1="120"
                x2="120"
                y2="120"
                stroke="#4CAF50"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <line
                x1="40"
                y1="145"
                x2="120"
                y2="145"
                stroke="#4CAF50"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <line
                x1="40"
                y1="170"
                x2="120"
                y2="170"
                stroke="#4CAF50"
                strokeWidth="8"
                strokeLinecap="round"
              />

              <circle cx="155" cy="120" r="10" fill="#4CAF50" />
              <circle cx="155" cy="145" r="10" fill="#4CAF50" />
              <circle cx="155" cy="170" r="10" fill="#4CAF50" />
            </svg>

            <p className="py-2 todo-brand">Appointments List</p>

            <h1>Manage Your Health, One Appointment at a Time</h1>

            <p>
              Welcome to your personal medical appointment manager. Easily
              schedule, track, and organize your doctor visits so you never
              miss an important checkup again.
            </p>

            <div className="hero-buttons">
              <Link to="/TodoRegister" className="btn home-create-btn">
                Create Account
              </Link>

              <Link to="/TodoLogin" className="btn btn-outline login-btn">
                Log In
              </Link>
            </div>

          </div>
        </section>
      </div>

      {/* FEATURES */}
      <section className="features">
        <h2>Features Designed for Your Healthcare Needs</h2>
        <p className="subtext">
          Everything you need to manage medical appointments simply and securely.
        </p>

        <div className="feature-grid">
          <div className="card">
            <div className="icon">📅</div>
            <h3>Easy Appointment Scheduling</h3>
            <p>Book, reschedule, or cancel medical appointments in seconds.</p>
          </div>

          <div className="card">
            <div className="icon">👨‍⚕️</div>
            <h3>Doctor & Clinic Management</h3>
            <p>Keep track of doctors, clinics, and visit details in one place.</p>
          </div>

          <div className="card">
            <div className="icon">🔔</div>
            <h3>Appointment Reminders</h3>
            <p>Get timely reminders so you never miss a medical visit.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">🩺 Appointments</div>

        <p>© 2025 Appointments Inc. All rights reserved.</p>

        <div className="footer-links">
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </footer>

    </div>
  );
}

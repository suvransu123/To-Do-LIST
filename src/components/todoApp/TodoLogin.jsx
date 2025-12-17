import React, { useState } from "react";
import "./TodoLogin.css";
import { useFormik } from "formik";
import TodoHeader from "./TodoHeader";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TodoLogin() {
  const [usergmail, setUserGmail] = useState("");
  const [userpassword, setUserPassword] = useState("");
 const[cookies,setCookie,removeCookie]=useCookies(['username','usergmail'])
 const navigate = useNavigate();
  async function checkUserGmail(e) {
    try {
      const res = await axios.get("http://localhost:3000/user"); // axios.get returns {data: [...]}
      const users = res.data;

      const user = users.find((item) => item.gmail === e.target.value);

      if (user) {
        setUserGmail(""); // valid email
      } else {
        setUserGmail("Invalid Email! Please enter a correct email");
      }
    } catch (error) {
      console.error("Error fetching users", error);
    }
  }

  const formik = useFormik({
    initialValues: {
      user_gmail: "",
      password: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await axios.get("http://localhost:3000/user");
        const users = res.data;

        const user = users.find((item) => item.gmail === values.user_gmail);

        if (!user) {
          setUserGmail("Invalid Email! Please enter a correct email");
          return;
        }

        if (user.password !== values.password) {
          setUserPassword("Wrong password! Enter correct password");
          return;
        }
         setCookie('username',user.firstname);
         setCookie("usergmail",user.gmail)
         navigate("/TodoDashboard")
        alert("Login Successful!");

      } catch (error) {
        console.error("Login error:", error);
      }
    },
  });

  return (
    <div className="login-main-box">
      <div className="ps-4">
        <TodoHeader />
      </div>

      <div className="login-hole-container">
        <div className="login-box">

          <section className="login-form-image" aria-hidden="true">
            <div className="visual-gradient">
              <img
                className="visual-image"
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600&auto=format&fit=crop"
                alt=""
              />
            </div>
          </section>

          <main className="form-panel">
            <div className="form-intro">
              <h1 className="title">Welcome Back</h1>
              <p className="subtitle">Log in to your account to continue.</p>
            </div>

            <form className="auth-form" onSubmit={formik.handleSubmit}>
              {/* Email Field */}
              <div className="field">
                <label htmlFor="user_gmail" className="label">
                  Email Address
                </label>

                <input
                  id="user_gmail"
                  name="user_gmail"
                  type="email"
                  className="input"
                  placeholder="example@gmail.com"
                  onKeyUp={checkUserGmail}
                  onChange={formik.handleChange}
                />
                <span>{usergmail}</span>
              </div>

              {/* Password Field */}
              <div className="field">
                <label htmlFor="password" className="label">
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  className="input"
                  placeholder="••••••••"
                  onChange={formik.handleChange}
                />
                <span>{userpassword}</span>
              </div>

              <div>
                <a href="#" className="link">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="btn-primary">
                Login
              </button>
            </form>

            <p className="footer-cta">
              Don’t have an account?
              <a href="#" className="link link-inline">Create an account</a>
            </p>
          </main>

        </div>
      </div>
    </div>
  );
}

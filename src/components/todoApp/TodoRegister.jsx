import React from "react";

import "./TodoRegister.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import TodoHeader from "./TodoHeader";

const TodoRegister = () => {
  const navigate = useNavigate();

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  function handleValidate(values) {
    const errors = {};


    if (!values.firstname || values.firstname.trim().length < 4) {
      errors.firstname = "Please fill your First Name";
    } else if (
      values.firstname.charAt(0) !== values.firstname.charAt(0).toUpperCase()
    ) {
      errors.firstname = "First letter must be capital";
    }

  
    if (!values.lastname || values.lastname.trim().length === 0) {
      errors.lastname = "Please fill your Last Name";
    }

   
    if (!values.gmail || values.gmail.trim().length === 0) {
      errors.gmail = "Please fill email address";
    } else if (!emailPattern.test(values.gmail)) {
      errors.gmail = "Enter a valid email address";
    }

    if (!values.password || values.password.trim().length === 0) {
      errors.password = "Please enter a password";
    } else if (!passwordPattern.test(values.password)) {
      errors.password =
        "Password must include uppercase, lowercase, number and special character";
    }

 
    if (
      !values.conform_password ||
      values.conform_password.trim().length === 0
    ) {
      errors.conform_password = "Please confirm your password";
    } else if (values.password !== values.conform_password) {
      errors.conform_password = "Passwords do not match";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      gmail: "",
      password: "",
      conform_password: "",
    },
    validate: handleValidate,
    onSubmit: async function (user) {
  try {
    // Check if email already exists
    const { data } = await axios.get(`http://localhost:3000/user?gmail=${user.gmail}`);

    if (data.length > 0) {
      alert("This email is already registered!");
      return; // ❌ prevent POST
    }

    // If not exist → register new user
    await axios.post("http://localhost:3000/user", user);

    alert("Account created successfully");
    navigate("/TodoLogin");

  } catch (err) {
    console.error(err);
    alert("Server error – check backend / db.json");
  }
}

    
  });


  return (
    <div className="register">
        <TodoHeader />
          
      <div className="middle-container">
        <div className="middle-box">
          {/* LEFT IMAGE */}
        <div className="middle-left">
  <img src="/image/todo-background2.jpg" alt="Todo background" />
</div>


          {/* RIGHT FORM */}
          <div className="middle-right">
            <div>
              <h1>Create an Account</h1>
              <p>Please fill in the details to register</p>
            </div>

            <form className="form-fields" onSubmit={formik.handleSubmit}>
              <div className="row-two">
                <div className="field half">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="Suvransu"
                    name="firstname"
                    onChange={formik.handleChange}
                    value={formik.values.firstname}
                  />
                  {formik.errors.firstname && (
                    <span className="text-danger">
                      {formik.errors.firstname}
                    </span>
                  )}
                </div>

                <div className="field half ms-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Nayak"
                    name="lastname"
                    onChange={formik.handleChange}
                    value={formik.values.lastname}
                  />
                  {formik.errors.lastname && (
                    <span className="text-danger">
                      {formik.errors.lastname}
                    </span>
                  )}
                </div>
              </div>

              <div className="field">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="suvransu123@gmail.com"
                  name="gmail"
                  onChange={formik.handleChange}
                  value={formik.values.gmail}
                />
                {formik.errors.gmail && (
                  <span className="text-danger">{formik.errors.gmail}</span>
                )}
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && (
                  <span className="text-danger">{formik.errors.password}</span>
                )}
              </div>

              <div className="field">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  name="conform_password"
                  onChange={formik.handleChange}
                  value={formik.values.conform_password}
                />
                {formik.errors.conform_password && (
                  <span className="text-danger">
                    {formik.errors.conform_password}
                  </span>
                )}
              </div>

              <button className="register-btn" type="submit">
                Register
              </button>

              <div className="d-flex justify-content-center mt-2">
                <p>Already have an account? &nbsp;</p>
                <Link to="/TodoLogin" className="text-decoration-none">
                  log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoRegister;

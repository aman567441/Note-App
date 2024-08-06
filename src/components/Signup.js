import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup(props) {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      console.log(json);
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authtoken);
        navigate("/login");
        props.showAlert("Account created successfully", "success");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 border border-black rounded shadow p-4 bg-white">
          <h2 className="text-center mb-4">Sign-up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3">
              <label htmlFor="text">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={credentials.name}
                onChange={onChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                placeholder="Enter your password"
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="cpassword"
                name="cpassword"
                value={credentials.cpassword}
                onChange={onChange}
                placeholder="Enter your confirm password"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Submit
            </button>
          </form>
          <p className="mt-3 text-center">
            If you are already signed up <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

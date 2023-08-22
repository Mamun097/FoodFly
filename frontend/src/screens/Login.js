import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function () {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => { 
    const errors = [];

    if (credentials.email.trim() === "") {
      errors.push("Email must not be empty");
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        credentials.email
      )
    ) {
      errors.push("Invalid email address");
    }

    if (credentials.password.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }

    return errors;
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const errors = validateForm();

    if (errors.length > 0) {
      setIsLoading(false);
      alert(errors.join("\n"));
      return;
    }

    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });

    setIsLoading(false);

    if (response.status === 200) {
      window.location.href = "/";
    } else {
      alert("Login failed!");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div class="container">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </Form.Group>

          <Button variant="success mb-2" type="submit">
            Submit
          </Button>

          <br />
          <Link to="/signup">New User? Signup</Link>
        </Form>
      </div>
    </>
  );
}

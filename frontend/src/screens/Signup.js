import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function () {
  const [credentials, setCredentials] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
  });


  const validateCredentials = (credentials) => {
    const errors = [];
  
    if (credentials.name.length===0) {
      errors.push("Name must not be empty");
    }

    if (credentials.location.length===0) {
        errors.push("Location must not be empty");
      }
  
    if (credentials.email.trim() === "") {
      errors.push("Email must not be empty");
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(credentials.email)) {
      errors.push("Invalid email address");
    }
  
    if (credentials.password.length<6) {
      errors.push("Password should be atleast 6 characters long");
    }
  
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateCredentials(credentials);

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        location: credentials.location,
        email: credentials.email,
        password: credentials.password,
      }),
    });

    if (response.status === 200) {
        window.location.href = "/";
      } else {
        alert("Email already exists! Try again with another one.");
      }
  };


    const onChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value})
    }

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div class="container">
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center mt-4">Signup</h1>

          <Form.Group className="mb-3" controlId="formBasicNmae">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Full Name" name="name" value={credentials.name} onChange={onChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" placeholder="Location" name="location" value={credentials.location} onChange={onChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"  name="email" value={credentials.email} onChange={onChange}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"  name="password" value={credentials.password} onChange={onChange}/>
          </Form.Group>

          <Button variant="success mb-2" type="submit">
            Submit
          </Button>
          <br />
          <Link to="/login">Already have an account? Login</Link>
        </Form>
      </div>
    </>
  );
}

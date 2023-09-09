import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function () {
  const [credentials, setCredentials] = useState({
    name: "",
    location: "",
    email: "",
    password: "",
    contact: "",
    is_homekitchen: "",
    img: "",
  });


  const validateCredentials = (credentials) => {
    const errors = [];
  
    if (credentials.name.length===0) {
      errors.push("Name must not be empty");
    }

    if (credentials.img.length===0) {
      errors.push("Banner image link must not be empty");
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

    if (!validateContactNumber(credentials.contact)) {
      errors.push("Invalid contact number");
    }
  
    return errors;
  };

  const validateContactNumber = (contactNumber) => {
    const regex = /^01\d{9}$/;
    return regex.test(contactNumber);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateCredentials(credentials);

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    const response = await fetch("http://localhost:5000/api/restaurant/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        location: credentials.location,
        email: credentials.email,
        password: credentials.password,
        contact: credentials.contact,
        img: credentials.img,
        is_homekitchen: credentials.is_homekitchen === true ? true : false,
      }),
    });

    if (response.status === 200) {
        alert("Signup successful!");
        window.location.href = "/restaurant/login";
      } else {
        alert("Email already exists! Try again with another one.");
      }
  };


  const onChange = (event) => {
    if (event.target.name === "is_homekitchen") {
      setCredentials({...credentials, is_homekitchen: event.target.checked});
    } else {
      setCredentials({...credentials, [event.target.name]: event.target.value});
    }
  };
  

  return (
    <>
      <div className="container" style={{ width: "600px", border: "1px solid white", margin:"10px auto"}}>
        <Form onSubmit={handleSubmit}>
          <h1 className="text-center mt-2">Signup</h1>

          <Form.Group className="mb-2" controlId="formBasicNmae">
            <Form.Label>Restaurant Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Restaurant Name"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Location"
              name="location"
              value={credentials.location}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicContact">
            <Form.Label>Contact No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your contact"
              name="contact"
              value={credentials.contact}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicImage">
            <Form.Label>Banner Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="image url"
              name="img"
              value={credentials.img}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </Form.Group>

          <div className="mb-2 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
              name="is_homekitchen"
              checked={credentials.is_homekitchen} // Set the checked value based on state
              onChange={onChange}
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Join As A Home Kitchen
            </label>
          </div>

          <Button
            variant=" mb-2"
            type="submit"
            className="d-block mx-auto"
            style={{ color: "white" , backgroundColor: "#ff8a00"}}
          >
            Submit
          </Button>
          <div className="text-center">
            <Link to="/restaurant/login">Already have an account? Login!</Link>
          </div>
        </Form>
      </div>
    </>
  );
}

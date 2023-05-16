import axios from "axios";
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const submit = (data) => {
    axios
      .post(
        "https://backend-ecommerce-production-645d.up.railway.app/api/v1/auth/register",
        data
      )
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        if (error.response?.status === 404) {
          alert("Algo salio mal");
        } else {
          alert(error.response?.status);
        }
      });
  };

  {
  }
  return (
    <div className="form-father-signup">
      <Form onSubmit={handleSubmit(submit)} className="form-input-signup">
        <p className="welcome-form">Welcome! Enter your data</p>
        <div className="inputs-btn-login">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter your name"
              {...register("name")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Last name:</Form.Label>
            <Form.Control
              type="lastname"
              placeholder="Enter your last name"
              {...register("lastName")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              {...register("email")}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="phone"
              placeholder="Enter your phone number"
              {...register("phone")}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-submit">
            Submit
          </Button>
          <Button variant="primary" type="button" className="btn-submit" onClick={()=>navigate('/login')}>Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default Signup;

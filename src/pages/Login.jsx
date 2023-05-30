import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const { register, handleSubmit } = useForm();

    const navigate = useNavigate()

    const submit = (data) => {
        axios.post('https://backend-ecommerce-production-645d.up.railway.app/api/v1/auth/login', data)
            .then(res => {
                navigate("/")
                console.log(res.data.token)
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("userType",res.data.user_type)
            })
            .catch(error => {
                if (error.response?.status === 404) {
                    alert("Credenciales incorrectas")
                } else {
                    alert(error.response?.status)
                }
            })
    };
    return (
        <div className="form-father">

            <Form onSubmit={handleSubmit(submit)} className='form-input'>
                <p className='welcome-form'>Welcome! Enter your email and password to continue</p>
                <div className="inputs-btn-login">

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
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
                    <Button variant="primary" type="submit" className='btn-submit'>
                        Submit
                    </Button>
                    <p>Don't have an account? <a onClick={()=>navigate('/signup')}>Sign up</a></p>
                </div>
            </Form>
        </div>
    );
};

export default Login;
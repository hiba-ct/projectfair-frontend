import React, { useContext, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import authImg from '../assets/landingimg.webp';
import { Link, useNavigate } from 'react-router-dom';
import { registerAPI, loginApi } from '../services/allApi';
import { Spinner } from 'react-bootstrap';
import { tokenAuthContext } from '../contexts/AuthContextApi';

const Auth = ({ insideRegister }) => {
  const { isAutherised,setIsAutherised }=useContext(tokenAuthContext) 
  const [isLogined,setIslogined] = useState(false)
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (inputData.username && inputData.email && inputData.password) {
      try {
        const result = await registerAPI(inputData);
        if (result.status === 200) {
          alert(`Welcome ${result.data?.username}, please login to explore our website!`);
          navigate('/login');
          setInputData({ username: '', email: '', password: '' });
        } else if (result.response?.status === 406) {
          alert(result.response.data || "Registration failed. Please try again.");
          setInputData({ username: '', email: '', password: '' });
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert('Please fill the form!');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (inputData.email && inputData.password) {
      try {
        const result = await loginApi(inputData);
        if (result.status == 200) {
          sessionStorage.setItem("existingUser", JSON.stringify(result.data.user));
          sessionStorage.setItem("token", result.data.token);
        
          setIslogined(true)
          setIsAutherised(true)
          setTimeout(()=>{
           
         
          setInputData({ username: '', email: '', password: '' });
          navigate('/');
          setIslogined(false)},2000);
        } else if (result.response?.status === 404) {
          alert(result.response.data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please fill the form completely.");
    }
  };

  return (
    <div
      style={{ minHeight: '100vh', width: '100%' }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="container w-75">
        <div className="shadow card p-2">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img className="img-fluid" src={authImg} alt="" />
            </div>
            <div className="col-lg-6">
              <h1 className="mt-2">
                <i className="fa-brands fa-docker"></i> Project Fair
              </h1>
              <h5 className="mt-2">
                Sign {insideRegister ? 'up' : 'in'} to your Account
              </h5>
              <Form>
                {insideRegister && (
                  <FloatingLabel controlId="floatingUsername" label="Username">
                    <Form.Control
                      value={inputData.username}
                      onChange={(e) =>
                        setInputData({ ...inputData, username: e.target.value })
                      }
                      type="text"
                      placeholder="Username"
                    />
                  </FloatingLabel>
                )}

                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    value={inputData.email}
                    onChange={(e) =>
                      setInputData({ ...inputData, email: e.target.value })
                    }
                    type="email"
                    placeholder="name@example.com"
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    value={inputData.password}
                    onChange={(e) =>
                      setInputData({ ...inputData, password: e.target.value })
                    }
                    type="password"
                    placeholder="Password"
                  />
                </FloatingLabel>

                {insideRegister ? (
                  <div className="mt-3">
                    <button onClick={handleRegister} type="button" className="btn btn-primary mb-2">
                      Register
                    </button>
                    <p>
                      Existing User? Please Click here to
                      <Link to={'/login'}> Login</Link>
                    </p>
                  </div>
                ) : (
                  <div className="mt-3">
                    <button onClick={handleLogin} type="button" className="btn btn-primary d-flex mb-2">
                      Login {isLogined &&         <Spinner className="ms-1"animation="border" variant="info" />}
                    </button>
                    <p>
                      New User? Please Click here to
                      <Link to={'/register'}> Register</Link>
                    </p>
                  </div>
                )}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

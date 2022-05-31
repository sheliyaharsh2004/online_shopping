import React, { useState } from "react";
// import { Button, FormGroup, Input, Label } from "reactstrap";
import * as yup from "yup";
import { Form, Formik, useFormik } from "formik";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LogoutIcon from '@mui/icons-material/Logout';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';

function Login(props) {
  const [userType, setUserType] = useState("Login");
  let login = {
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Please enter email"),
    password: yup.string().required("Please enter password"),
  };

  let Signup = {
    name: yup.string().required("Please enter your name"),
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Please enter email"),
    password: yup.string().required("Please enter password"),
  };

  let resetpass = {
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Please enter email"),
  };

  let schema, initialVal;

  if (userType === "Login") {
    schema = yup.object().shape(login);
    initialVal = {
      email: "",
      password: "",
    };
  } else if (userType === "Signup") {
    schema = yup.object().shape(Signup);
    initialVal = {
      name: "",
      email: "",
      password: "",
    };
  } else if (userType === "forgotPassword") {
    schema = yup.object().shape(resetpass);
    initialVal = {
      email: "",
    };
  }

  const formik = useFormik({
    initialValues: initialVal,
    validationSchema: schema,
    onSubmit: (values) => {
      if (userType === "Login") {
        console.log("Successfully Login");
      } else if (userType === "Signup") {
        console.log("Successfully Login");
      } else if (userType === "forgotPassword") {
        console.log("Successfully otp");
      }
    },
  });

  return (
    <>
      <div className="page-heading about-page-heading" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-content">
                <h2>Login</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-us">
        <div className="container">
          <div className="row flex-column align-items-center">
            <div className="col-lg-6">
              <Formik values={formik}>
                <Form onSubmit={formik.handleSubmit} className="php-email-form">
                  {userType === "forgotPassword" ? (
                    <div className="form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Enter email"
                      />
                      {formik.errors.email ? (
                        <p>{formik.errors.email}</p>
                      ) : null}
                      <div className="validate" />
                    </div>
                  ) : null}
                  {userType === "Signup" ? (
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Your Name"
                        onChange={formik.handleChange}
                      />
                      <div className="validate" />
                      {formik.errors.name ? <p>{formik.errors.name}</p> : null}
                    </div>
                  ) : null}
                  {userType === "Login" || userType === "Signup" ? (
                    <>
                      <div className="form-group mt-3 mt-md-0">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          id="email"
                          placeholder="Your Email"
                          data-rule="email"
                          data-msg="Please enter a valid email"
                          onChange={formik.handleChange}
                        />
                        {formik.errors.email ? (
                          <p>{formik.errors.email}</p>
                        ) : null}
                        <div className="validate" />
                      </div>
                      <div className="form-group mt-3 mt-md-0">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          id="password"
                          placeholder="Password"
                          data-rule="minlen:4"
                          data-msg="Please enter at least 4 chars"
                          onChange={formik.handleChange}
                        />
                        {formik.errors.password ? (
                          <p>{formik.errors.password}</p>
                        ) : null}
                        <div className="validate" />
                      </div>
                    </>
                  ) : null}
                  {userType === "forgotPassword" ? (
                    <>
                      <Stack direction="row" spacing={2} className="justify-content-center mt-2">
                        <Button variant="contained" className="border-1" type="button" endIcon={<SmsOutlinedIcon />}
                          onClick={() => setUserType("Login")} >
                          Send OTP
                        </Button>
                      </Stack>
                      <Stack direction="row" spacing={2} className="justify-content-center mt-2">
                        <Button variant="contained" className="border-1" type="submit" endIcon={<ExitToAppIcon />}
                          onClick={() => setUserType("Login")} >
                          Login
                        </Button>
                      </Stack>
                    </>
                  ) : userType === "Login" ? (
                    <>
                      <Stack direction="row" spacing={2} className="justify-content-end">
                        <Button color="success" className="border-1" type="submit"
                          onClick={() => setUserType("forgotPassword")} >
                          Forgot Password ?
                        </Button>
                      </Stack>
                      <Stack direction="row" spacing={2} className="justify-content-center mt-2">
                        <Button variant="contained" className="border-1" type="submit" endIcon={<ExitToAppIcon />}
                          onClick={() => setUserType("Login")} >
                          Login
                        </Button>
                      </Stack>
                      <p className="text-center pt-2">Create a new account </p>
                      <Stack direction="row" spacing={2} className="justify-content-center mt-2">
                        <Button variant="contained" className="border-1 m-0" type="submit" endIcon={<LogoutIcon />}
                          onClick={() => setUserType("Signup")} >
                          Sign Up
                        </Button>
                      </Stack>
                    </>
                  ) : (
                    <>
                      <Stack direction="row" spacing={2} className="justify-content-center mt-2">
                        <Button variant="contained" className="appointment-btn border-1 m-0" type="submit" endIcon={<LogoutIcon />}
                          onClick={() => setUserType("Signup")}>
                          Sign Up
                        </Button>
                      </Stack>
                      <p className="text-center pt-2">Already have an account </p>
                      <Stack direction="row" spacing={2} className="justify-content-center mt-2">
                        <Button variant="contained" className="border-1" type="submit" endIcon={<ExitToAppIcon />}
                          onClick={() => setUserType("Login")} >
                          Login
                        </Button>
                      </Stack>
                    </>
                  )}
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;

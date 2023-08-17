import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../../Services/services";
import GenericErrorMessage from "../ErrorMessage/ErrorMessage.js";
import LinearLoader from "../LinearLoader/LinearLoader.js";

function LoginForm() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .matches(
        ".*@siemens\\.com\\s*$",
        "Please enter a valid Siemens email address"
      )
      .required("email is required"),
    password: Yup.string()
      .min(8, "password must be at least 8 characters")
      .required("Password is required"),
  });

  function handleSubmit(values) {
    setErrorMsg("");
    setLoading(true);
    login(values)
      .then((data) => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.response.data.error.message);
        setLoading(false);
      });
  }

  return (
    <div className="m-auto w-1/2 flex flex-col gap-9">
      <div className=" mt-10">
        <h1 className="font-poppins font-bold text-black text-5xl  uppercase">
          welcome back,
        </h1>
        <h3 className="font-poppins font-regular text-black text-3xl capitalize">
          enter your account details
        </h3>
      </div>

      {errorMsg !== "" && (
        <div className="-mb-4">
          <GenericErrorMessage message={errorMsg} />
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(v) => handleSubmit(v)}
      >
        {({ values }) => (
          <Form>
            <div>
              <div className="sm:col-span-3 ">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Email
                </label>
                <div className="mt-2">
                  <Field
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-Blue sm:text-sm sm:leading-6"
                    name="email"
                    autoComplete="off"
                    data-testid="LoginFormEmailInput"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className=" text-red-600 font-poppins text-sm font-light"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium mt-6 leading-6 text-black"
                >
                  Password
                </label>
                <div className="mt-2">
                  <Field
                    className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-Blue sm:text-sm sm:leading-6"
                    name="password"
                    type="password"
                    autoComplete="off"
                    data-testid="LoginFormPasswordInput"
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className=" text-red-600 font-poppins text-sm font-light "
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              data-testid="LoginFormSubmitButton"
              className={`${
                !validationSchema.isValidSync(values)
                  ? "bg-blue-300 "
                  : "hover:bg-opacity-90"
              } mx-auto w-full font-poppins uppercase flex justify-center items-center mt-32 rounded-md bg-Blue px-3 py-2 text-md font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
              disabled={!validationSchema.isValidSync(values)}
            >
              Login
            </button>
            <p className=" text-center font-poppins mt-2">
              Don't have an account?
              <a
                className="underline underline-offset-1 text-Blue font-medium"
                href="/signup"
              >
                sign up
              </a>
            </p>
            {loading && <LinearLoader color={"#1976D2"} />}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;

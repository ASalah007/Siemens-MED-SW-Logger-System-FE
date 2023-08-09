import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signup } from "../../Services/services";

function SignupForm() {
  const [errorMsg, setErrorMsg] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        "^[A-Za-z.]+@siemens\\.com\\s*$",
        "Please enter a valid Siemens email address"
      )
      .required("email is required"),
    password: Yup.string()
      .min(8, "password must be at least 8 characters")
      .required("Password is required"),
      name: Yup.string()
      .matches("\\w+\\s+\\w+", "Please enter your full name")
      .required("Full name is required"),
  });

  return (
    <div className="m-auto w-2/4">
      <div className=" mt-10">
        <h1 className="font-poppins font-bold text-black text-5xl  uppercase">
          get started,
        </h1>
        <h3 className="font-poppins font-regular text-black text-3xl capitalize">
          create a new account
        </h3>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(v) => {
          signup({...v}).then(data => console.log(data))
        }}
      >
        {({ values }) => (
          <Form>
            <div>
              <div className="sm:col-span-3 mt-16">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-black"
                >
                  Email
                </label>
                <div className="mt-2">
                  <Field
                    className="block w-full rounded-md border-0 p-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-Blue sm:text-sm sm:leading-6"
                    name="email"
                    autoComplete="off"
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
                  htmlFor="name"
                  className="block text-sm font-medium mt-6 leading-6 text-black"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <Field
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-Blue sm:text-sm sm:leading-6"
                    name="name"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className=" text-red-600 font-poppins text-sm font-light"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium mt-6 leading-6 text-black"
                >
                  Password
                </label>
                <div className="mt-2">
                  <Field
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-Blue sm:text-sm sm:leading-6"
                    name="password"
                    type="password"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className=" text-red-600 font-poppins text-sm font-light"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              data-testid="LoginFormSubmitButton"
              className="mx-auto w-full font-poppins uppercase mt-32 rounded-md bg-Blue px-3 py-2 text-md font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Sign up
            </button>
            <p className=" text-center font-poppins mt-2">
              Already have an account?
              <a
                className="underline underline-offset-1 text-Blue font-medium"
                href="/login"
              >
                Login
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignupForm;

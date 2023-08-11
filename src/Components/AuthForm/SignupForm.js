import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signup } from "../../Services/services";
import LinearLoader from "../LinearLoader/LinearLoader.js";
import GenericModal from "../GenericModal/GenericModal.js";
import GenericErrorMessage from "../ErrorMessage/ErrorMessage.js";
import PasswordChecklist from "react-password-checklist";

function SignupForm() {
  const [errorMsg, setErrorMsg] = useState("");
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const initialValues = {
    email: "",
    password: "",
    name: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(
        "^[0-9A-Za-z.]+@siemens\\.com\\s*$",
        "Please enter a valid Siemens email address"
      )
      .required("email is required"),
    password: Yup.string().required("Password is required"),
    name: Yup.string()
      .matches("\\w+\\s+\\w+", "Please enter your full name")
      .required("Full name is required"),
  });


  function handleSubmit(values) {
    setLoading(true);
    setError(false);
    signup(values)
      .then((data) => {
        // console.log(data);
        setOpenModal(true);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setErrorMsg(err.message);
      });
  }

  return (
    <div className="m-auto w-1/2 flex flex-col gap-10" onClick={() => setOpenModal(false)}>
      {openModal && <GenericModal />}
      <div className=" mt-10">
        <h1 className="font-poppins font-bold text-black text-5xl  uppercase">
          get started,
        </h1>
        <h3 className="font-poppins font-regular text-black text-3xl capitalize">
          create a new account
        </h3>
      </div>

      {/* {<GenericErrorMessage message="incorrect email or password"/>} */}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(v) => {
          handleSubmit(v);
        }}
      >
        {({ values }) => (
          <Form>
            <div className="sm:col-span-3  ">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-black"
              >
                Email
              </label>
              <div className="mt-2 ">
                <Field
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-Blue sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-Blue sm:text-sm sm:leading-6"
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

            {/* <div className="sm:col-span-3">
                <label
                  htmlFor="solution"
                  className="block text-sm font-medium mt-6 leading-6 text-black"
                >
                  Solution
                </label>
                <div className="mt-2">
                  <Field as="select" name="solution">
                    <option value="ethernet">Ethernet</option>
                    <option value="5g">5G</option>
                    <option value="otn">OTN</option>
                  </Field>
                  <ErrorMessage
                    name="solution"
                    component="span"
                    className=" text-red-600 font-poppins text-sm font-light"
                  />
                </div>
              </div> */}

            <div className="sm:col-span-3">
              <label
                htmlFor="password"
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
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className=" text-red-600 font-poppins text-sm font-light"
                />
              </div>
            </div>

            {values.password.length>0 &&
                <div className="absolute">
                  <PasswordChecklist
                    rules={["minLength", "specialChar", "number", "capital"]}
                    minLength={8}
                    value={values.password}
                    onChange={(isValid) => {setValidPass(isValid)}}
                  />
            </div>}
            <button
              type="submit"
              data-testid="LoginFormSubmitButton"
              className= {`${!(validPass && validationSchema.isValidSync(values)) ? "bg-blue-300 ": "hover:bg-opacity-90"} mx-auto w-full font-poppins uppercase flex justify-center items-center mt-16 rounded-md bg-Blue px-3 py-2 text-md font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
              disabled={!(validPass && validationSchema.isValidSync(values))}
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
            {loading && <LinearLoader color={"#1976D2"} />}
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignupForm;

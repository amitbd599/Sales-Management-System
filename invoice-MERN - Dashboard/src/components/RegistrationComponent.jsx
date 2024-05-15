import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { ErrorToast, IsEmpty } from "../helper/helper";
import { reg__Request__API } from "../api/Api";
const RegistrationComponent = () => {

  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let emailRef,
    passwordRef = useRef();

  const RegRequestAPI__Fun = () => {
    setLoading(true);

    let email = emailRef.value;
    let password = passwordRef.value;
    if (IsEmpty(email)) {
      ErrorToast("Email Required!");
      setLoading(false);
    } else if (IsEmpty(password)) {
      ErrorToast("Password Required!");
      setLoading(false);

    } else {
      reg__Request__API({ email, password }).then((result) => {

        if (result === true) {
          setLoading(false);
          navigate("/login");
        } else {
          setLoading(false);
        }
      });
    }
  };



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div
        className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md"
      >
        <div className="text-start font-semibold text-xl sm:text-lg text-slate-700">
          Welcome to Invoice management Web Application
        </div>
        <p className="mt-4 text-start text-xl sm:text-sm text-slate-500">
          Enter your email & password to get creating account
        </p>
        <div className="mt-6">
          <div>

            <div className="flex flex-col mb-5">
              <label
                htmlFor="email"
                className="mb-1 text-xs tracking-wide text-gray-600"
              >
                E-Mail Address:
              </label>
              <div className="relative">
                <div
                  className="
                inline-flex
                items-center
                justify-center
                absolute
                left-0
                top-0
                h-full
                w-10
                text-gray-400
              "
                >
                  <FaEnvelope />
                </div>
                <input
                  ref={(input) => (emailRef = input)}
                  id="email"
                  type="email"
                  name="email"
                  className="
                text-sm
                placeholder-gray-500
                pl-10
                pr-4
                rounded-2xl
                border border-gray-400
                w-full
                py-2
                focus:outline-none focus:border-blue-400
              "
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <label
                htmlFor="password"
                className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
              >
                Password:
              </label>
              <div className="relative">
                <div
                  className="
                inline-flex
                items-center
                justify-center
                absolute
                left-0
                top-0
                h-full
                w-10
                text-gray-400
              "
                >
                  <span>
                    <FaLock />
                  </span>
                </div>
                <input
                  ref={(input) => (passwordRef = input)}
                  id="password"
                  type="password"
                  name="password"
                  className="
                text-sm
                placeholder-gray-500
                pl-10
                pr-4
                rounded-2xl
                border border-gray-400
                w-full
                py-2
                focus:outline-none focus:border-blue-400
              "
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="flex w-full">
              {
                loading === true ? (<button onClick={RegRequestAPI__Fun}
                  type="submit"
                  className="flex mt-2 cursor-not-allowed items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-theme hover:bg-theme/90  rounded-2xl py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Create Account</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>) : (<button onClick={RegRequestAPI__Fun}
                  type="submit"
                  className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-theme hover:bg-theme/90  rounded-2xl py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Create Account</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>)
              }

            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        <span
          className="
        inline-flex
        items-center
        text-gray-700
        font-medium
        text-xs text-center
      "
        >
          <span className="ml-2">You have an account?</span>
        </span>
        <Link to="/login" className="text-xs ml-2 text-blue-500 font-semibold">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default RegistrationComponent;

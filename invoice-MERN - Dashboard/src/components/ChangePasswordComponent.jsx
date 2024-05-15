import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorToast, IsEmpty } from "../helper/helper";
import { reset_password__Request__API } from "../api/Api";
import { FaLock } from "react-icons/fa6";
const ChangePasswordComponent = () => {
  const { email, otp } = useParams();
  let [loading, setLoading] = useState(false);
  let passwordRef, confPasswordRef = useRef();

  const reset_RequestAPI__Fun = () => {
    setLoading(true);
    let password = passwordRef.value;
    let confPassword = confPasswordRef.value;
    if (IsEmpty(email)) {
      ErrorToast("Params email not found!");
      setLoading(false);
    } else if (IsEmpty(otp)) {
      ErrorToast("Params otp not found!");
      setLoading(false);
    } else if (IsEmpty(password)) {
      ErrorToast("Password required!");
      setLoading(false);
    } else if (IsEmpty(confPassword)) {
      ErrorToast("Confirm password required!");
      setLoading(false);
    } else if (password !== confPassword) {
      ErrorToast("Password not match!");
      setLoading(false);
    } else {
      reset_password__Request__API(email, otp, password).then((result) => {
        setLoading(false);
        if (result === true) {
          window.location.href = `/login`;
        }
      });
    }
  };
  return (
    <>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div
          className="
      flex flex-col
      bg-white
      shadow-md
      px-4
      sm:px-6
      md:px-8
      lg:px-10
      py-8
      rounded-3xl
      w-50
      max-w-md
    "
        >
          <div className="text-start font-semibold text-xl sm:text-lg text-slate-700">
            Change your password
          </div>
          <div className="mt-4 text-start text-xl sm:text-sm text-slate-500">
            Please enter your new password
          </div>
          <div className="mt-6">
            <div>
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
                    ref={(input) => passwordRef = input}
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
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Re-enter Password:
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
                    ref={(input) => confPasswordRef = input}
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
                  loading === true ? (<button onClick={reset_RequestAPI__Fun} disabled
                    type="submit"
                    className="flex cursor-not-allowed mt-2 items-center justify-center focus:outline-non text-white text-sm sm:text-base bg-blue-500 hover:bg-blue-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                  >
                    <span className="mr-2 uppercase">Request pending...</span>
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
                  </button>) : (<button onClick={reset_RequestAPI__Fun}
                    type="submit"
                    className="
              flex
              mt-2
              items-center
              justify-center
              focus:outline-none
              text-white text-sm
              sm:text-base
              bg-blue-500
              hover:bg-blue-600
              rounded-2xl
              py-2
              w-full
              transition
              duration-150
              ease-in
            "
                  >
                    <span className="mr-2 uppercase">Change Password</span>
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
      </div>
    </>

  );
};

export default ChangePasswordComponent;

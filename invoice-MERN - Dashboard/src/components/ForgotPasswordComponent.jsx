import React, { useRef, useState } from "react";
import { ErrorToast, IsEmpty } from "../helper/helper";
import { forgot_password__Request__API } from "../api/Api";
import { Link } from "react-router-dom";

const ForgotPasswordComponent = () => {
  let [loading, setLoading] = useState(false);
  let emailRef = useRef();
  const forgot_passwordRequestAPI__Fun = () => {
    setLoading(true);
    let email = emailRef.value;
    if (IsEmpty(email)) {
      ErrorToast("Email Required!");
      setLoading(false);
    } else {
      forgot_password__Request__API(email).then((result) => {
        setLoading(false);
        if (result === true) {
          window.location.href = `/otp-code/${email}`;
        }
      });
    }
  };
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 ">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w mx-2">
          <div className="self-center font-semibold text-xl sm:text-lg text-slate-700">
            Please Enter your Email Address For Get OTP Code
          </div>
          <div className="mt-4 self-center text-xl sm:text-sm text-slate-500">
            Enter your credentials to access your account
          </div>
          <div className="mt-10">
            <div>
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx={12} cy={12} r={4} />
                      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
                    </svg>
                  </div>
                  <input
                    ref={(input) => (emailRef = input)}
                    id="email"
                    type="email"
                    name="email"
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-blue-400"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2" />
              <div className="flex w-full">
                {
                  loading === true ? (<button disabled
                    onClick={forgot_passwordRequestAPI__Fun}
                    type="submit"
                    className=" flex mt-2 items-center cursor-not-allowed justify-center focus:outline-none text-white text-sm sm:text-base bg-[#a855f7] hover:bg-[#9333ea] rounded-2xl py-2 w-full transition duration-150 ease-in"
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
                  </button>) : (<button
                    onClick={forgot_passwordRequestAPI__Fun}
                    type="submit"
                    className=" flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-[#a855f7] hover:bg-[#9333ea] rounded-2xl py-2 w-full transition duration-150 ease-in"
                  >
                    <span className="mr-2 uppercase">Send OTP</span>
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
            target="_blank"
            className=" inline-flex items-center text-gray-700 font-medium text-xs text-center"
          >
            <span className="ml-2">
              Back to Sign In?
              <Link className="text-xs ml-2 text-blue-500 font-semibold" to="/">
                Sign In
              </Link>
            </span>
          </span>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordComponent;

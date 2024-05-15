import React, { useState } from "react";
import ReactCodeInput from "react-code-input";
import { ErrorToast, IsEmpty } from "../helper/helper";
import { otp__Request__API } from "../api/Api";
import { Link, useParams } from "react-router-dom";


const OTPComponent = () => {
  const { email } = useParams();
  let [loading, setLoading] = useState(false);
  let [OTP, setOTP] = useState(0);
  const otp_RequestAPI__Fun = () => {
    setLoading(true);
    let otp = OTP;
    if (IsEmpty(email)) {
      ErrorToast("Email Required!");
      setLoading(false);
    } else if (IsEmpty(otp)) {
      ErrorToast("OTP Required!");
      setLoading(false);
    } else {
      otp__Request__API(email, otp).then((result) => {
        setLoading(false);
        if (result === true) {
          window.location.href = `/change-password/${email}/${otp}`;
        }
      });
    }
  };
  return (
    <>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div
          className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8  lg:px-10 py-8 rounded-3xl w-50 max-w-md"
        >
          <div className="text-start font-semibold text-xl sm:text-lg text-slate-700">
            Enter OTP Code
          </div>
          <div className="mt-4 text-start text-xl sm:text-sm text-slate-500">
            Please check your email <strong>{email}</strong> & <br />{" "}
            please submit 6 digit code here.
          </div>
          <div className="mt-6">
            <div>
              <div className="flex flex-col mb-5">
                <ReactCodeInput type="text" fields={6} onChange={(e) => setOTP(e)} />
              </div>

              <div className="flex w-full">
                {
                  loading === true ? (<button disabled
                    onClick={otp_RequestAPI__Fun}
                    type="submit"
                    className="flex mt-2 cursor-not-allowed items-center  justify-center focus:outline-none text-white text-sm sm:text-base bg-theme hover:bg-theme/90 rounded-2xl py-2 w-full transition duration-150 ease-in"
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
                  </button>) : (
                    <button
                      onClick={otp_RequestAPI__Fun}
                      type="submit"
                      className="flex mt-2 items-center  justify-center focus:outline-none text-white text-sm sm:text-base bg-theme hover:bg-theme/90 rounded-2xl py-2 w-full transition duration-150 ease-in"
                    >
                      <span className="mr-2 uppercase">Submit OTP</span>
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
                    </button>
                  )
                }

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
      </div>
    </>
  );
};

export default OTPComponent;

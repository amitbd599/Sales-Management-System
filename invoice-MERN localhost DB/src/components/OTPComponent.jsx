import React from "react";
import ReactCodeInput from "react-code-input";

const OTPComponent = () => {
  return (
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
        <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
          Enter OTP Code
        </div>
        <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
          Please check your email <strong>demo@gmail.com</strong> <br /> please
          submit 6 digit code here.
        </div>
        <div className="mt-10">
          <form action="#">
            <div className="flex flex-col mb-5">
              <ReactCodeInput type="text" fields={6} />
            </div>

            <div className="flex w-full">
              <button
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPComponent;

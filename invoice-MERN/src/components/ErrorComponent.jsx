import React from "react";

const ErrorComponent = () => {
  return (
    <section className="py-[60px] ">
      <div className="container">
        <div className="rounded-xl bg-white p-[30px]">
          <div className="text-center">
            <h1 className="text-[62px] text-btn dark:text-white">
              Sorry Page Not Found<span className="text-theme">!</span>
            </h1>
            <p className="text-[14px] text-text">
              The Page You Are Looking For Is Not Available Or Doesn’t Belong To
              This Website!{" "}
            </p>
            <div className="mb-[30px] mt-[30px]">
              <div className="flex justify-center">
                <img
                  src="/image/error.svg"
                  alt=""
                  className="w-[500px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorComponent;
